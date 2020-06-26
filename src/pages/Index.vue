<template>
  <div id="index">
    <div id="header"></div>
    <div class="header-introduce">
      <div class="header-content">
        <img class="logo" :src="shop.avatar" alt />
        <div class="content">
          <h4>
            <img class="brand" src="../assets/imgs/brand@2x.png" alt />
            <span>{{shop.name}}</span>
          </h4>
          <p>{{shop.description}}/{{shop.deliveryTime}}分钟到达</p>
          <div class="sale-p">
            <span>
              <img class="sale" src="../assets/imgs/decrease_1@2x.png" />
              {{act}}
            </span>
            <!-- <span  class="sale-btn">{{num }} &gt;</span> -->
            <!-- 模态框 -->
            <van-button
              round
              color="rgba(250,250,250,0.5)"
              size="mini"
              :text="num+'个'"
              @click="show = true"
            />
            <van-overlay :show="show" @click="show = false">
              <div class="wrapper">
                <div class="block">
                  <h3>{{shop.name}}</h3>
                  <div>
                    <van-rate v-model="shop.score" allow-half void-icon="star" void-color="#eee" />
                  </div>
                  <van-divider>优惠信息</van-divider>
                  <div>
                    <p class="modul_p" v-for="item in shop.supports" :key="item.id">
                      <img src="../assets/imgs/decrease_1@2x.png" alt />
                      {{item}}
                    </p>
                  </div>
                  <van-divider>商家公告</van-divider>
                  <div v-text="shop.bulletin"></div>
                </div>
              </div>
            </van-overlay>
          </div>
        </div>
      </div>
      <van-notice-bar class="airing" left-icon="volume-o" :text="shop.bulletin" />
    </div>
    <div class="muen">
      <router-link
        v-for="item in muen"
        :key="item.id"
        :to="item.to"
        :class="item.jump"
      >{{item.name}}</router-link>
    </div>

    <div class="main">
      <router-view />
    </div>
    <!-- 购物车 -->
    <div class="good_buy">
      <transition name="slide-fade">
        <div v-if="carlist.length==0?false:shoplist">
          <Closing />
        </div>
      </transition>
    </div>
    <!-- 页脚 -->
    <div class="footer">
      <div class="sub-box">
        <div class="img-box" @click="shoplist = !shoplist">
          <van-icon
            class="icon-car"
            v-show="allmoeny>=20?isfalse:true"
            name="shopping-cart"
            size="30"
          />
          <van-icon
            class="icon-car"
            v-show="allmoeny>=20?true:isfalse"
            color="#4BCC60"
            name="shopping-cart"
            size="30"
          />
        </div>
        <div class="allmoney">￥{{allmoeny}}</div>
        <div class="freight">另需要运费￥4元</div>
        <button
          :disabled="allmoeny>=20?isfalse:true"
          :style="{backgroundColor:(allmoeny>=20?'#4BCC60':''),color:(allmoeny>=20?'#fff':'')}"
          v-text="allmoeny>=20?allmoeny+4+'元':'20元起送'"
          class="sub-btn"
        ></button>
      </div>
    </div>
  </div>
</template>

<script>
import Closing from "./Closing";
//引入商品数据
import { seller, IP } from "@/api/api";
export default {
  components: {
    Closing
  },
  data() {
    return {
      //商铺信息
      shop: [],
      //单个活动
      act: "",
      //开启了多少活动
      num: 0,
      muen: [
        { to: "/", name: "商品", jump: "" },
        { to: "/comment", name: "评论", jump: "" },
        { to: "/shop", name: "店铺", jump: "" }
      ],
      //模态框
      show: false,
      //购物车列表
      shoplist: false,
      //定义保存false
      isfalse: false,
    };
  },
  created() {
    //获取店铺信息
    seller().then(res => {
      this.shop = res.data.data;
      //res.data.data.avatar.
      console.log(res.data.data.avatar, IP);
      this.act = res.data.data.supports[0];
      this.num = res.data.data.supports.length;
    });
  },

  watch: {
    $route: {
      handler(newRouter) {
        console.log(newRouter.path);
        for (let item of this.muen) {
          console.log(item.to);
          if (item.to == newRouter.path) {
            item.jump = "red";
          } else {
            item.jump = "";
          }
        }
      },
      immediate: true

      //  deep: true,
    }
  },
  computed: {
    //总额
    allmoeny() {
      var allmoeny = 0;
      for (let item of this.$store.getters.shopcarList) {
        allmoeny += item.price * item.amount;
      }
      allmoeny = allmoeny.toFixed(2);
      return allmoeny;
    },
    //购物车
    carlist() {
      return this.$store.getters.shopcarList;
    }
  }
};
</script>

<style lang="scss" scoped>
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
  transition: all 0.2s ease;
}
.slide-fade-leave-active {
  transition: all 0.2s ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateY(10px);
}
//购买详情
.good_buy {
  width: 100%;
  position: fixed;
  bottom: 50px;
  max-height: 400px;
  overflow: auto;
  background: #ffffff;
}
//遮板
.wrapper {
  padding: 40px;
  height: 100%;
  h3 {
    margin-bottom: 20px;
  }
  .modul_p {
    display: flex;
    img {
      margin-right: 10px;
    }
  }
}

div {
  text-align: center;
}

#index {
  background-color: #f4f5f7;
  display: flex;
  flex-direction: column;
  height: 100%;

  .header-introduce {
    color: #ffffff;
    position: absolute;
    top: 30px;
    left: 30px;
    display: flex;
    flex-direction: column;

    .airing {
      background-color: transparent;
      color: #ffffff;
      margin-top: 10px;
    }
    .header-content {
      display: flex;
      .logo {
        width: 100px;
        border-radius: 15px;
      }
      .brand {
        width: 40px;
        vertical-align: middle;
        margin-right: 10px;
      }
      .content {
        margin-top: 10px;
        margin-left: 20px;
      }
      p {
        margin-top: 5px;
      }
      .sale-p {
        display: flex;
        justify-content: space-between;
        .sale-btn {
          background: transparent;
          border-radius: 15px;
        }
        align-content: center;
        justify-content: space-around;
      }
      .sale {
        width: 20px;
        vertical-align: middle;
      }
    }
  }
  #header {
    height: 180px;
    background: url(../assets/imgs/header.jpg) no-repeat;
    background-size: 100% 100%;

    -webkit-filter: blur(2px); /* Chrome, Opera */
    -moz-filter: blur(2px);
    -ms-filter: blur(2px);
    filter: blur(2px);
    box-sizing: border-box;
  }
  .main {
    flex: 1;
    overflow-y: scroll;
    height: 100%;
  }
  .footer {
    font-size: 14px;
    height: 50px;
    background: #ccc;
    .sub-box {
      background: #141c27;
      color: #919297;
      display: flex;
      position: relative;
      height: 50px;
      justify-content: space-between;

      box-sizing: border-box;
      align-items: center;
      .img-box {
        position: absolute;
        top: -15px;
        left: 15px;
        box-sizing: border-box;
        padding: 10px;
        background: #141c27;
        border-radius: 50%;
        .icon-car {
          background-color: #2b343d;
          border-radius: 50%;
          padding: 10px;
          color: #808589;
        }
      }
      .allmoney {
        margin-left: 80px;
        color: #ccc;
        box-sizing: border-box;
        width: 75px;
        border-right: #cccccc solid 1px;
      }
      .freight {
        text-indent: 10px;
      }
      .sub-btn {
        width: 100px;
        height: 100%;
        border: 0px;
        outline: none;
        font-weight: bold;
      }
    }
  }
  .muen {
    display: flex;
    background: #ffffff;
    justify-content: space-around;
    font-size: 20px;
    line-height: 40px;
    margin-bottom: 2px;
  }
  .red {
    color: red;
  }
}
</style>