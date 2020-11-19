<template>
  <div class="page-classify">
     <router-link to='/city' class="font-28">{{'当前选中的城市为:'+$store.getters['city/curCityName']}}</router-link>
    <normal-header title="分类"></normal-header>
    <div class="classify-main">
      <header-type :types="types"  @click='onChange'></header-type>
      <cartoon-list :list="list"></cartoon-list>
    </div>
  </div>
</template>

<script>
import NormalHeader from '../../components/NormalHeader'
import HeaderType from '../../components/HeaderType'
import CartoonList from '../../components/CartoonList'
import { getTypes, getTypesList } from '../../api/cartoon'
import { unformat } from '../../utils/apiHelp'

export default {
  name: 'Classify',
  components: {
    NormalHeader,
    HeaderType,
    CartoonList
  },
  data () {
    return {
      types: [],
      cartoonList: []
    }
  },
  computed: {
    list () {
      return this.cartoonList.map(item => {
        return {
          id: item.bigbook_id,
          name: item.bigbook_name,
          author: item.bigbook_author,
          coverurl: item.bigcoverurl,
          view: item.bigbookview
        }
      })
    }
  },
  methods: {
    onChange (payload) {
      // console.log(payload)//当前分类的所有数据,但是只想要payload里的data里的targetargument
      this.getTypesList(payload.data.targetargument)// 调用this.getTypeList()并把targetargument传进去,并执行下面的
    },
    getTypes () {
      return getTypes().then(res => {
        // console.log(res)
        if (res.code === 200) {
          this.types = res.info
        } else {
          alert(res.code_msg)
        }
      })
    },
    getTypesList (subject) {
      getTypesList(subject).then(res => {
        // console.log(res)
        // JSON.parse解码变成json格式字符串
        // unformat解密
        // console.log(JSON.parse(unformat(res.info)))
        if (res.code === 200) {
          this.cartoonList = JSON.parse(unformat(res.info)).comicsList
        } else {
          console.log(res.code_msg)
        }
      })
    }
  },
  async created () {
    // A和B 两个请求中,B 的数据必须等A 下载完毕以后,才能够得到第一个热血的分类,才能去下载
    // async await
    await this.getTypes()
    // console.log(this.types)
    this.getTypesList(this.types[0].targetargument)
  }
}
</script>

<style lang="scss" scoped>
.page-classify {
  display: flex;
  flex-direction: column;
  height: 100%;

  .classify-main {
    flex: 1;
    overflow-y: auto;
  }
}
</style>
