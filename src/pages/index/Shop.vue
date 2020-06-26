<template>
  <div>
    <div class="title">
      <div class="title-shop">
        <div>
          <h3 style="margin-bottom:10px">{{shop.name}}</h3>
          <van-rate v-model="shop.score" allow-half />
          <span>({{shop.deliveryPrice}})</span>
          <span style="margin-left:15px">月售{{shop.sellCount}}单</span>
        </div>
        <div>
          <van-icon name="like" @click="clickcolor" :color="color" size="30" />
          <p v-if="color=='#F01414'">已收藏</p>
          <p v-if="color=='#ccc'">请收藏</p>
        </div>
      </div>
      <van-divider :style="{borderSize:'2px', borderColor: '#F5F6F7', padding: '0 16px' }"></van-divider>
      <div class="formation">
        <div>
          起送价
          <br />
          <b>{{shop.minPrice}}</b>元
        </div>
        <div>
          商家配送
          <br />
          <b>{{4}}</b>元
        </div>
        <div>
          平均配送时间
          <br />
          <b>{{shop.deliveryTime}}</b>分钟
        </div>
      </div>
    </div>
    <div class="shop-content">
      <!-- 公告和活动 -->
      <div class="activity">
        <h3>公告与活动</h3>
        <van-divider :style="{borderSize:'2px', borderColor: '#F5F6F7', padding: '0 16px' }"></van-divider>
        <p v-text="shop.bulletin"></p>
      </div> 
        <van-cell icon="../../assets/imgs/decrease_1@2x.png" v-for="item in shop.supports" :key="item.id" :title="item" />
    </div>
    <!-- 商家图片 -->
    <div class="pic">
      <h3>商家实景</h3>
      <div>
        <img v-for=" item in shop.pics" :key="item" :src="item" alt />
      </div>
    </div>
    <div class="shop-bottom">
      <h3>商场信息</h3>
        <van-divider :style="{borderSize:'2px', borderColor: '#F5F6F7', padding: '0 16px' }"></van-divider>
        <van-list >
        <van-cell v-for="item in list" :key="item.id" :title="item" />
      </van-list>
    </div>
    
  </div>
</template>


<script>
import { seller } from "@/api/api";
export default {
  data() {
    return {
      //商铺信息
      shop: [],
      //保存颜色
      color: "#F01414",
      list:['该商家支持开发票,请下单的时填写好发票抬头','品类:其他菜系、包子粥店',
      '地址:背景昌平区回龙观西大街龙观置业大厦底商B座102单元1340','营业时间:10:00-20.30']
    };
  },
  methods: {
    //点击收藏
    clickcolor() {
      this.color = this.color == "#F01414" ? "#ccc" : "#F01414";
    }
  },
  created() {
    //发送数据
    seller().then(res => {
      this.shop = res.data.data;
      
    });
  },
  computed:{
  
  }
};
</script>

<style lang="scss" scoped>
//头部
.title {
    background: #ffffff;
    padding-bottom: 15px;
  font-size: 12px;
  margin-bottom: 30px;
  .title-shop {
    padding: 15px;
    display: flex;
    justify-content: space-between;
  }
  span {
    display: inline-block;
    position: relative;
    top: -5px;
    margin-left: 5px;
  }
  .formation {
    display: flex;
    div {
      flex: 1;
      justify-content: space-around;
      text-align: center;
      color: #cccccc;
      border-right: 1px solid #F5F6F7;
      &:last-child {
        border-right: 0px;
      }
      b {
        font-size: 35px;
        color: #111;
        font-weight: normal;
      }
    }
  }
}
//活动
.shop-content {
  background: #ffffff;
  padding: 15px;
  .activity {
    p {
      color: #ea0f13;
    }
  }
}
//图片
.pic {
     background: #ffffff;
     margin: 15px 0;
     padding: 15px;
     h3{
         margin-bottom: 15px;
     }
  > div {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
  img {
    width: 100px;
    margin-left: 10px;
  }
}
//商场信息
.shop-bottom{
    background: #ffffff;
    padding: 15px;
}
</style>