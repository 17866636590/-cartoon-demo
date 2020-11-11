<template>
   <div class="page-home">
    <header class="index-header">
      <a href="mine.html?cpid=0">
        <div class="header-user">
          <div class="user-btn"></div>
        </div>
      </a>
      <div class="header-logo"></div>
      <a href="search.html?cpid=0">
        <div class="header-search"></div>
      </a>
    </header>
    <!-- <Swiper :autoplay="2000" :loop="true" @change="changeHandler">
      <Swiper-item>1</Swiper-item>
      <Swiper-item>2</Swiper-item>
      <Swiper-item>3</Swiper-item>
    </Swiper> -->
    <Swiper ref='xxx'>
      <Swiper-item>1</Swiper-item>
      <Swiper-item>2</Swiper-item>
      <Swiper-item>3</Swiper-item>
    </Swiper>
    <!-- <Swiper >
      <Swiper-item>1</Swiper-item>
      <Swiper-item>2</Swiper-item>
      <Swiper-item>3</Swiper-item>
    </Swiper> -->
   </div>
</template>

<script>

// 引入抽离出来的swiper插件
// import Swiper from '@/components/Swiper/Swiper'

// 写上index时,就不用写那么复杂的路径了,因为直接加载该目录下的头文件
import { Swiper, SwiperItem } from '@/components/Swiper'

import { getBanner } from '@/api/cartoon'
export default {
  name: 'Home',
  // 自定义组件要先调用一下才可以使用
  components: {
    Swiper,
    SwiperItem
  },
  methods: {
    changeHandler (payload) {
      console.log('我自己index:', payload)
    }
  },
  mounted () {
    // console.log(this.$refs.xxx)
    // console.log(this.$refs.xxx.$el)
  },
  // created () {
  //   fetch('https://mhd.zhuishushenqi.com/comic_v2/getproad?apptype=8&appversion=1.0&channel=web-app&adgroupid=123')
  //     .then(res => res.json())
  //     .then(res => {
  //       console.log(res)
  //     })
  // }

  // 处理不能跨域的网站https://api.asilu.com/today/
  // created () {
  //   fetch('http://localhost:8080/migu/today/ ')
  //     .then(res => res.json())
  //     .then(res => {
  //       console.log(res)
  //     })
  // }

  created () {
    getBanner().then(res => {
      console.log(res)
    })
  }
}
</script>

<style lang='scss' scoped>
@import "~@/assets/styles/mixin.scss";
    .page-home{
        display: flex;
        flex-direction:column ;
        height: 100%;
        .index-header{
          position: relative;
          /* border-bottom: 1px solid #ededed;
           &::after{
             content: "";
             position: absolute;
             width: 100%;
             height: 1px;
             left: 0;
             bottom: 0;
             background: #ededed;
            transform: scaleY(0.5);
           }*/
           @include border-bottom;
            display: flex;
            height: 44px;
            //三者等分平铺
            justify-content: space-between;
            align-items: center;
            padding: 0 20px;
            box-sizing: border-box;
            .user-btn{
                width: 25px;
                height: 25px;
                background: url(~@/assets/icon/user-btn.png);
                background-size: 100%;
            }
            .header-logo{
                width: 92px;
                height: 28px;
                background: url(~@/assets/logo.png) no-repeat;
                background-size: 100%;
            }
            .header-search{
                 width: 25px;
                height: 25px;
                background: url(~@/assets/icon/header-search.png);
                background-size: 100%;
            }
        }

    }
</style>
