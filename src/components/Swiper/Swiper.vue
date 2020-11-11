<template>
  <div class="swiper-container" ref="swiper">
    <div class="swiper-wrapper">
        <slot></slot>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>
</div>
</template>

<script>
// 引入 Swiper 核心js文件 和Swiper样式
import Swiper from 'swiper/swiper-bundle.js'
import 'swiper/swiper-bundle.css'

export default {
  name: 'Swiper',
  // 属性
  props: {
    autoplay: {
      type: Number,
      default: 0
    },
    loop: {
      type: Boolean,
      default: true
    }
  },
  mounted () {
    //   解决复用后分页器不动的问题,就是类名冲突了
    // 解决方案一
    var that = this
    // 解决方案二
    console.log(this.$el)
    // 解决方案三
    console.log(this.$refs.swiper)
    /*eslint-disable */
      new Swiper(this.$refs.swiper,{
        loop:this.loop,//是否进行循环
        autoplay:this.autoplay ? {
        delay: this.autoplay,
        stopOnLastSlide: false,
        disableOnInteraction: true,
        }:false,
        pagination: {
        el: '.swiper-pagination',
        },
        on:{
            slideChangeTransitionEnd:function(){
                // console.log(this.activeIndex)//1,2,3,4  this值new Swiper对象
                // console.log(this.realIndex)  //0,1,2
                //触发自定义事件
                // this.$emit 想要的this是new vue对象
                //所以上面用that=this;
                that.$emit('change',this.realIndex)
            }
        }
      })  //在mounted(找节点)   实例化这个对象
       /* eslint-enable */
  }
}
</script>

<style lang="scss" scoped>
  .swiper-container{
            width: 100%;
            height: 180px;
        }
</style>
<style lang="scss">
//另外编写一个style去掉scope
        .swiper-pagination-bullet {
          opacity: 1;
          vertical-align: middle;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: hsla(0, 0%, 100%, 0.7);
        }

        .swiper-pagination-bullet-active {
          width: 20px;
          height: 10px;
          background: url("../../assets/icon/dot.png") no-repeat;
          background-size: 100%;
        }
</style>
