<template>
  <div class = 'page-city'>
    <p class="font-28">{{'当前选中的城市为:'+$store.getters['city/curCityName']}}</p>
    <normal-header :title = "`城市-${curCityName}`" :showRight = 'false'></normal-header>
    <div class = 'city-main'>
      <div class = 'left' ref = 'scrollLeft'>
       <div>
          <div
            class = 'city-index-section'
            v-for = 'item in cityList'
            :key = "item.py"
            :ref="`section-${item.py}`"
            >
            <p>{{item.py}}</p>
            <ul>
             <li v-for="city in item.list"
              :key="city.cityId"
              @click="changeCity(city)"
              >{{city.name}}</li>
            </ul>
          </div>
       </div>
      </div>
      <div class = 'right'>
        <ul>
          <li v-for = 'item in indexs' :key = 'item' @click="handleClick(item)">{{item}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import NormalHeader from '../../components/NormalHeader'
import { getCityList } from '../../api/city'
import { mapGetters, mapMutations } from 'vuex'
import BScroll from 'better-scroll'
export default {
  name: 'City',
  data () {
    return {
      cities: []
    }
  },
  /*
  [
      {py:'A',list:[{阿里巴巴},{啊啊啊}]},
       {py:'B',list:[{北京},{...}]}
  ]
  */
  computed: {
    ...mapGetters('city', ['curCityName']),
    cityList () {
      // 最终查询收集
      const result = []
      // 遍历
      this.cities.forEach(item => {
        const py = item.pinyin.substr(0, 1).toUpperCase()
        // 判断py是否已经在result中存在,如果存在这个py,找到result中的下标
        const index = result.findIndex(items => items.py === py)
        if (index > -1) {
          // 存在
          result[index].list.push(item)
        } else {
          // 不存在
          result.push({
            py,
            list: [item]
          })
        }
      })
      return result.sort((a, b) => a.py.charCodeAt() - b.py.charCodeAt())
    },
    // 只获取拼音
    indexs () {
      return this.cityList.map(item => item.py)
    }
  },
  components: {
    NormalHeader
  },
  methods: {
    ...mapMutations('city', ['SET_CURCITY']),
    getCityList () {
      getCityList().then(res => {
        // console.log(res)
        this.cities = res.data.data.cities
      }).catch(err => {
        console.log(err)
        alert('网络异常,请稍后重试')
      })
    },
    handleClick (py) {
      /*
        ref标记
        1.ref标记真实 dom节点,拿到的是该节点的DOM元素
        2.ref标记自定义组件,拿到的是这个自定义组件的实例对象 var vm=new Vue({el:"#app"})  vm.$el
        要拿到这个组件的根节点  this.$refs.xxx.$el  真实dom
        3.ref标记在v-for的组件里  ,那么会将标记的真实dom放在一个数组里
        */
      //   console.log(this.$refs.scrollLeft)//这是整个左侧大的距上部的距离
      const target = this.$refs[`section-${py}`][0]// 这是每一个字母距上部的距离
      // 修改左侧滚动元素scolltop的值
      // this.$refs.scrollLeft.scrollTop = target.offsetTop

      // 用scrollTo时,传入负值
      this.bscroll.scrollTo(0, -target.offsetTop, 500)
    },
    changeCity (city) {
      this.SET_CURCITY(city)
      // 设置完vuex后,再跳回原来想去的页面
      const redirect = this.$route.query.redirect || '/'
      this.$router.replace(redirect)
    }
  },
  created () {
    this.getCityList()
  },
  mounted () {
    // bscroll会将原生的点击事件禁用
    /*eslint-disable */
    this.bscroll=new BScroll(this.$refs.scrollLeft,{
      click:true
    })
   /* eslint-enable */
  }
}
</script>
<style lang='scss' scoped>
@import '@/assets/styles/mixin.scss';
.page-city{
  display: flex;
  flex-direction: column;
  height: 100%;
  .city-main {
    flex: 1;
    overflow: hidden;
    display: flex;
  }
  .left{
    flex: 1;
    // overflow-y: auto;
    height: 100%;
    position: relative;
    .city-index-section{
      @include border-bottom;
      padding-left: 15px;
      p{
        @include border-bottom;
        height: 36px;
        line-height: 36px;
        font-size: 16px;
      }
      li{
        @include border-bottom;
        height: 30px;
        line-height: 30px;
        padding-left: 20px;
        font-size: 16px;
      }
    }
  }
  .right{
    width: 20px;
    height: 100%;
    display: flex;
    align-items: center;
    li{
      width: 20px;
      height: 20px;
      line-height: 20px;
      text-align: center;
      font-size: 14px;
    }
  }
}
</style>
