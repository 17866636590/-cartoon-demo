<template>
   <div class="page-home">
      <router-link to='/city' class="font-28">{{'当前选中的城市为:'+$store.getters['city/curCityName']}}</router-link>
    <index-header></index-header>
    <!-- 下载数据是异步，而实例化是直接在组件中，不在一个文件里，没有关联 ，v-if="bannerList.length>0"，有数据的时候加载他-->
    <div class="index-main">
      <Swiper class="my-swiper" v-if="bannerList.length>0" :autoplay='2000'>
      <Swiper-item v-for="item in bannerList" :key="item.id">
        <img v-lazy="item.imageurl" alt />
      </Swiper-item>
    </Swiper>
    <!-- 导航 -->
     <index-nav></index-nav>
     <!-- 生成漫画数据 -->
     <index-recommend v-for="item in  recommentList" :key="item.specialid" :info="item"></index-recommend>
      <div class="my-icp">
        <a
          class="record"
          href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=31011202006214"
          target="_blank"
        >
          <img class="img" v-lazy="`https://wechatapp.zhuishushenqi.com/mhd/201711/gongan.jpg`" />
          <div>沪公网安备 31011202006214号</div>
        </a>
        <div class="licence">
          增值电信业务经营许可证沪B2-20170022
          <br />网络文化经营许可证沪网文（2016）3206-227号
          <br />出版物经营许可证新出发沪批字第U7659号
        </div>
      </div>
    </div>
    </div>
</template>

<script>

// 引入抽离出来的swiper插件
// import Swiper from '@/components/Swiper/Swiper'

// 写上index时,就不用写那么复杂的路径了,因为直接加载该目录下的头文件
import { Swiper, SwiperItem } from '@/components/Swiper'

import { getBanner, getIndexRecomment } from '@/api/cartoon'

// 引入抽离的组件
import indexHeader from './components/indexHeader'
import indexNav from './components/indexNav'
import indexRecommend from './components/indexRecommend'
export default {
  name: 'Home',
  data () {
    /*
    数据能存放的地方
    考虑的地方
    data,在当前组件里用
    props,外部传入数据
    computed,依赖前面两个计算出来的
    state,跨组件使用
    getter,通过依赖state计算出来的
    */
    return {
      bannerList: [],
      recommentList: []
    }
  },
  // 自定义组件要先调用一下才可以使用
  components: {
    Swiper,
    SwiperItem,
    indexHeader,
    indexNav,
    indexRecommend
  },
  methods: {
    changeHandler (payload) {
      console.log('我自己index:', payload)
    },
    getBanner () {
      getBanner().then(res => {
      // console.log(res)
      /*
      漫画岛的每一个接口 都有code的字段
      如果字段是200的话,这个接口OK
      */
        if (res.code === 200) {
          this.bannerList = res.info
        } else {
        // 不OK,就报错
        // 在这里先alert进行报错,后续 我们可以用van 组件库的组件
          alert(res.code_msg)
        }
      }).catch((err) => {
        alert('网络异常,请稍后', err)
      })
    },
    getIndexRecomment () {
      getIndexRecomment().then(res => {
        // console.log(res)
        if (res.code === 200) {
          this.recommentList = res.info
          // console.log(this.recommentList)
        } else {
        // 不OK,就报错
        // 在这里先alert进行报错,后续 我们可以用van 组件库的组件
          alert(res.code_msg)
        }
      }).catch((err) => {
        alert('网络异常,请稍后', err)
      })
    }
  },
  mounted () {
    // console.log(this.$refs.xxx)
    // console.log(this.$refs.xxx.$el)
  },
  created () {
    // 下载轮播图的数据
    this.getBanner()
    // 获取首页推荐漫画的数据
    this.getIndexRecomment()
  }
}
</script>

<style lang='scss' scoped>
@import "~@/assets/styles/mixin.scss";
.index-main{
  flex: 1;
  overflow-y: auto;
}
    .page-home{
      .my-swiper{
        img{
          width: 100%;
        }
      }
        display: flex;
        flex-direction:column ;
        height: 100%;
}

</style>

<style lang="scss">
.swiper-container {
  width: 100%;
  height: 180px;
  img {
    width: 100%;
  }
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
}

.my-icp {
  padding: 5px 0;
  font-size: 12px;
  .record {
    display: flex;
    align-items: center;
    justify-content: center;
    .img {
      width: 15px;
      height: 15px;
      margin-right: 4px;
    }
  }
  .licence {
    margin-top: 4px;
    text-align: center;
  }
}

.go-top {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 45px;
  height: 45px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  text-align: center;
  position: fixed;
  z-index: 999;
  bottom: 50px;
  right: 5px;
  color: #fff;
  .icon-arrow-up {
    width: 16px;
    height: 10px;
    margin-bottom: 4px;
    background: url("../../assets/icon/icon-arrow-up.png") no-repeat;
    background-size: 100%;
  }
}
</style>
