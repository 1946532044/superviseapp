<template>
  <div>
    <!-- 头部 -->
    <div class="comment-header">
      <div class="score">
        <h3>{{shop.score}}</h3>
        <p>综合评分</p>
        <p class="p">高于周边商家69.2%</p>
      </div>
      <div class="stars">
        <div>
          <span>服务态度</span>
          <van-rate v-model="shop.score" allow-half void-icon="star" void-color="#eee" />
        </div>
        <div>
          <span>服务态度</span>
          <van-rate v-model="shop.score" allow-half void-icon="star" void-color="#eee" />
        </div>
        <div>
          <span>送达时间</span>
          {{shop.deliveryTime}}分钟
        </div>
      </div>
    </div>
    <!-- 评论按钮 -->
    <div class="comment" style="margin-bottom:2px ">
      <div class="allbtn">
        <van-button type="info">全部</van-button>
        <van-button color="#CCECF7">满意</van-button>
        <van-button color="#CCC">不满意</van-button>
      </div>
      <van-divider :style="{borderSize:'2px', borderColor: '#ccc', padding: '0 16px' }"></van-divider>
      <div>
        <van-checkbox v-model="checked" checked-color="#ccc">只能有内容的评价</van-checkbox>
      </div>
    </div>
    <!-- 评论内容 -->
    <div class="comment-content">
      <div v-for="item in comment" :key="item.id">
        <div class="name">
          <img :src="item.avatar" alt />
        <!-- 用户 -->
          <div class="username">
            <div class="top-username">
              <span>{{item.username}}</span>
              <div>{{item.rateTime}}</div>
            </div>
            <span>
              <van-rate
                v-model="item.score"
                allow-half
                void-icon="star"
                size="10"
                void-color="#eee"
              />
              <span>{{item.deliveryTime}}分钟送达</span>
            </span>
            <div class="man-comment">{{item.text}}</div>
            <!-- 标签 -->
            <div> <van-icon name="good-job" size='20' style="margin-right:10px" />  <van-tag  v-for="buy in item.recommend" :key="buy.id" plain>{{buy}}</van-tag></div>
          </div>
        
        </div>
      <van-divider :style="{borderSize:'2px', borderColor: '#ccc' }"></van-divider>

      </div>
    </div>
  </div>
</template>

<script>
import { ratings, seller } from "@/api/api";
export default {
  data() {
    return {
      shop: [],
      //复选框的值
      checked: true,
      //评论的信息
      comment: []
    };
  },
  methods: {



    //时间格式
    date(time) {
      //创造一个时间
      var date = new Date(time);
      //年
      var year = date.getFullYear();
      //月
      var month = date.getMonth() + 1;
      month = month < 10 ? "0" + month : month;
      //日
      var date1 = date.getDate();
      date1 = date1 < 10 ? "0" + date1 : date1;
      //时
      var hour = date.getHours();
      hour = hour < 10 ? "0" + hour : hour;
      //分
      var minute = date.getMinutes();
      minute = minute < 10 ? "0" + minute : minute;
      var second = date.getSeconds();
      second = second < 10 ? (second = "0" + second) : second;
      //秒
      return (
        year +
        "-" +
        month +
        "-" +
        date1 +
        " " +
        hour +
        ":" +
        minute +
        ":" +
        second
      );
    }
  },
  created() {
    //获取数据
    ratings().then(res => {
      console.log(res);
      for (let item of res.data.data) {
        item.rateTime = this.date(item.rateTime);
      }
      this.comment = res.data.data;
      console.log(this.comment);
    });

    seller().then(res => {
      this.shop = res.data.data;
    });
  },
  computed:{
  
  }
};
</script>

<style lang="scss" scoped>
* {
  font-size: 12px;
}
//头部样式
.comment-header {
  background: #ffffff;
  padding: 15px;

  display: flex;
  .score {
    width: 160px;
    text-align: center;
    border-right: 1px solid #cccccc;
    p {
      margin-top: 8px;
    }
  }

  h3 {
    color: orange;
    font-size: 30px;
  }
  .p {
    color: #ccc;
  }
  .stars {
    > div {
      display: flex;
      align-items: center;
    }
    span {
      margin: 5px;
    }
  }
}
//评论按钮样式
.comment {
  padding: 15px;
  background: #ffffff;
  .allbtn {
    button {
      margin-left: 15px;
    }
  }
}
//评价内容
.comment-content {
  padding: 15px;
  background: #fff;
  .name {
    display: flex;
    justify-content: space-between;

    img {
      width: 40px;
      height: 40px;
    }
    .username {
      flex: 1;
      margin-left: 15px;
      .top-username {
        display: flex;
        justify-content: space-between;
      }
      > span {
        display: flex;
        align-content: center;
        > span {
          margin-left: 6px;
          color: #ccc;
          font-size: 10px;
        }
        .man-comment {
          font-size: 16px;
          color: #000;
        }
      
      }
    }
  }
}
</style>