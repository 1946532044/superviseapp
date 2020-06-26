import axios from 'axios'
//export const IP='http://172.16.4.251:5000'
export const IP='http://127.0.0.1:5000'

axios.defaults.baseURL=IP
//商品详情
export const goods_list=()=>axios.get('/goods/goods_list',{params:{}})
//店铺信息
export  const seller=()=>axios.get('/shop/seller')
//评论
export  const ratings=()=>axios.get('/shop/ratings')
