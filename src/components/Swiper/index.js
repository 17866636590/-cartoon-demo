// 引入抽离出的Swiper插件
import Swiper from './Swiper.vue'
import SwiperItem from './SwiperItem.vue'

// 暴露  es6的
/*
export default {} =>import xxx from ''
export {} => import {} from ''
如果上述两个都写了
import {} => from ''
*/
export {
  Swiper,
  SwiperItem
}
