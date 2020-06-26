<template>
  <div class="goods">

    <div class="commodity">
      <div id="muen-left-box" class="left-muen">
        <div>
          <van-sidebar v-model="activeKey">
            <van-sidebar-item
              :title="item.name"
              v-for="item of goodsList_all"
              :key="item.id"
              @click="click_id(item.name)"
            />
          </van-sidebar>
        </div>
      </div>

      <div id="muen-right-box" class="right-content">
        <div>
          <div v-for="item of goodsList_all" :key="item.id" :id="item.name">
            <p>{{item.name}}</p>
            <div v-for="num of item.foods" :key="num.id">
              <van-card
                :price="num.price"
                :desc="num.goodsDesc"
                :title="num.name"
                :thumb="num.imgUrl"
                class="card-right"
              >
                <template #tags>
                  <van-tag plain type="danger">销售{{num.sellCount}}</van-tag>
                  <van-tag plain type="danger">好评度{{num.rating}}%</van-tag>
                </template>
                <template #footer>
                  <van-stepper
                    v-model="num.amount"
                    theme="round"
                    button-size="22"
                    disable-input
                    min="0"
                    v-if="(num.amount)"
                    @plus="clicknumber(1,num.id)"
                    @minus="clicknumber(-1,num.id)"
                  />
                  <button
                    class="van-stepper__plus btn_add"
                    v-if="!num.amount"
                    @click="clicknumber(1,num.id)"
                  ></button>
                </template>
              </van-card>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div v-if="">
       <van-loading type="spinner" color="#1989fa" />
    </div> -->
  </div>
</template>

<script>
import { goods_list } from "@/api/api";
//引入bettscroll
import BScroll from "better-scroll";

export default {
  data() {
    return {
      //默认选中
      activeKey: 0
    };
  },
  created() {
    //获取商品
    goods_list().then(res => {
  
      for (let item of res.data.goodsList) {
        for (let number of item.foods) {
          number.amount = 0;
        }
      }
          console.log(res);
      //初始化商品数组
     this.$store.commit('newsgoods',res.data.goodsList) 
    });
  },
  //方法
  methods: {
    //商品数量点击的值
    clicknumber(num,id){
      console.log({num,id})
      this.$store.commit('goodsnum',{num,id})
      console.log(num)
      //当数据变化的时候把大于0的加入购物车
      this.carlist
      
    },
    //点击左边 右边联动
    click_id(name) {
      this.BSright.scrollToElement(document.getElementById(name), 500);
      console.log(this.BSright);
    }
    //有滑动  联动左
  },

  //节点加载完成
  mounted() {
    //左边的菜单
    var BSleft = new BScroll("#muen-left-box", {
      click: true
    });
    //右边菜单
    this.BSright = new BScroll("#muen-right-box", {
      probeType: 3
    });
    console.log(BSleft);
    // function onScroll(obj){
    //   console.log(obj)
    // }
    this.BSright.on("scroll", obj => {
      //监听滑动
      var _y=Math.abs(obj.y)
      // console.log(Math.abs(_y));
      //  console.log(this.addHeigth)
      for (let item of this. addHeigth){
          if(_y>=item.min && _y<item.max){
            this.activeKey=item.i
          }
      }
    });
  },
  //计算属性
  computed: {
    addHeigth() {
      //获取每个节点的高度
      //定义一个空数每个节点的高度
      var arrboxHeight = [];
      for (let i = 0; i < this.goodsList_all.length; i++) {
        arrboxHeight.push(
          document.getElementById(this.goodsList_all[i].name).offsetHeight
        );
      }
      //再次循环arrboxHeight的累加
      var allboxHeight = [];
      //定义一个数保存  用于累加
      var allnum = 0;
      for (let i = 0; i < arrboxHeight.length; i++) {
        allboxHeight.push({
          i,
          min: allnum,
          max: allnum + arrboxHeight[i] + allnum
        });
        //把数加上去
        allnum += arrboxHeight[i];
      }
     
      return allboxHeight
    },
    //商品列表
    goodsList_all(){
      return this.$store.state.goodslist
    },
    //购物车的列表
     carlist(){
    return   this.$store.getters.shopcarList
    }
  }
};
</script>

<style lang="scss" scoped>
.goods {
  flex: 1;
  overflow-y: scroll;
  height: 100%;
  .commodity {
    display: flex;
    height: 100%;
    // 左边菜单
    .left-muen {
      width: 100px;
      height: 100%;
      font-size: 12px;
      overflow-y: scroll;
    }
    .right-content {
      flex: 1;
      overflow-y: scroll;
      div > p {
        color: #ccc;
        line-height: 30px;
        border-left: 2px solid #cccccc;
        box-sizing: border-box;
        padding-left: 20px;
      }
      .card-right {
        background-color: #ffffff;
        margin-top: 0px;
        .btn_add {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          color: #fbc2c8;
          background-color: #ee0a24;
          border: 0;
          font-size: 20px;
          outline: none;
        }
      }
    }
  }
}
</style>