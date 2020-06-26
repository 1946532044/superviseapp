import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
var store = new Vuex.Store({
    state: {
        goodslist: [],
        
    },
    mutations: {
        //初始化商品列表
        newsgoods(state, arr) {
            state.goodslist = arr
        },
        //找到对应的商品并加一
        goodsnum(state, obj) {
            for (let item of state.goodslist) {
                for (let child of item.foods) {
                    if (child.id == obj.id) {
                        child.amount += obj.num
                        return
                    }
                }
            }

        },
         //全部清0
         goodclear(state) {
            for (let item of state.goodslist) {
                for (let child of item.foods) {
                    child.amount=0
                }
            }

        },

    },
    getters: {
        //渲染购物车的
        shopcarList(state) {
           var shopcar_goods_list= []
            for (let item of state.goodslist) {
                for (let child of item.foods) {
                    if (child.amount > 0) {
                        shopcar_goods_list.push(child)
                    }
                }
            }
            return shopcar_goods_list
        }
    }

})

export default store