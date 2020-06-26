<template>
  <div>
    <div class="titlebg"></div>
    <div class="title">
      <h5>已选择</h5>
      <button @click="empty">清空</button>
    </div>
    <div>
      <div v-for="item in carlist" :key="item.id" class="num">
        <img :src="item.imgUrl" alt />
        <div class="rigth-content">
          <h4>{{item.name}}</h4>

          <span>￥{{item.price*item.amount}}</span>
        </div>
        <div>
          <van-stepper
            v-model="item.amount"
            theme="round"
            button-size="22"
            disable-input
            min="0"
            v-if="(item.amount)"
        
          />
          <button
            class="van-stepper__plus btn_add"
            v-if="!item.amount"
            @click="clicknumber(1,item.id)"
          ></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    empty(){
      this.clearshop
    }
  },
  computed: {
    //购物车
    carlist() {
      return this.$store.getters.shopcarList;
    },
    clearshop(){
      return this.$store.commit('goodclear')
    }
  }
};
</script>

<style lang="scss" scoped>
.titlebg {
  background: forestgreen;
  height: 20px;
}
.title {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  button{
    background: #ffffff;
    border: 1px solid #ccc;
    outline: none;
    
  }
}
.num {
  display: flex;
  margin: 20px;
  border-bottom: 1px solid #ccc;
  justify-content: space-between;
  padding: 5px;
  img {
    width: 40px;
  }
  span {
    color: red;
    text-align: left;
    margin-left: 10px;
  }
  .rigth-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-content: left;
  }
}
</style>
