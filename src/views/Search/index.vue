<template>
    <div class="page-search">
      <header class="search-header">
        <div class="header-back" @click="$router.back()"></div>
        <div class="header-search" >
          <span class="icon-search"></span>
          <input
          class="search-input font-24"
            type="search"
            v-model="searchVal"
            placeholder="漫画名丨作者 ^_^" />
        </div>
        <div class="header-btn font-30" @click="saveSearch(searchVal)">搜索</div>
      </header>

      <div class="search-main">
        <template  v-if="!searchVal">
            <!-- 热门搜索 begin -->
            <section class="search-recommend" >
              <div class="title font-26">
                <span class="title-title">大家都在搜</span>
                <span class="title-btn" @click="getHotList">
                  <span class="icon-refresh" ></span>刷新
                </span>
              </div>

              <div class="recommend-content font-28">
                <span class="recommend-item"
                 v-for="item in hotWordsList"
                  :key="item.id"
                  @click="saveSearch(item.keyword)"
                  >{{item.keyword}}</span>
              </div>
            </section>
            <!-- 热门搜索 end -->

            <!-- 最近搜索 begin -->
            <section class="search-history" v-show="historySearchList.length>0">
              <div class="title font-26">
                <span class="title-title">最近搜索</span>
                <span class="title-btn">
                  <span class="icon-del" @click="deleteSearch"></span>
                </span>
              </div>
              <div class="history-content font-28">
                <span class="history-item"  v-for="item in historySearchList" :key="item" @click="saveSearch(item)">
                  <span class="icon-time"></span>
                  {{item}}
                </span>
              </div>
            </section>
          <!-- 最近搜索 end -->
      </template>
      <template  v-else>
            <!-- 搜索结果面板 begin -->
            <section class="search-content">
              <p class="item font-28" v-for="item in searchIndexList" :key="item" @click="saveSearch(item)">{{item}}</p>
            </section>
      </template>
      <!-- 搜索结果面板 end -->
    </div>
  </div>
</template>

<script>
import { getHotList, searchIndex } from '@/api/cartoon'

export default {
  name: 'Search',
  data () {
    return {
      searchVal: '',
      hotWordsList: [],
      // 历史搜索列表
      historySearchList: this.getSearch(),
      searchIndexList: []
    }
  },
  methods: {
    getHotList () {
      getHotList().then(res => {
        if (res.code === 200) {
          // console.log(res)
          this.hotWordsList = res.info.hotWordsList
        } else {
          console.log(res.code_msg)
        }
      })
    },
    // 点击标题,进行本地储存,保存记录
    // 只能存储字符串 'search':json字符串 最好最外层是数组
    saveSearch (keyword) {
      if (!keyword) {
        return
      }
      // 1.取出之前存储过得内容
      // search是键名
      const tmp = window.localStorage.getItem('search') ? JSON.parse(window.localStorage.getItem('search')) : []
      // 2.判断之前是否存储过 index indexOf findIndex include(直接判断元素是否在数组中存在)
      if (tmp.includes(keyword)) {
        this.$router.push('/search-result?name=' + keyword)
        return
      }
      // 3.否则将keyword存储到数据中
      tmp.push(keyword)
      // 4.将数组转成json字符串,存储回去
      window.localStorage.setItem('search', JSON.stringify(tmp))
      // 5.跳转的查询结果页
      // $router $routes $route区别   $route 当前路由的路由信息 name params query meta
      this.$router.push('/search-result?name=' + keyword)
    },
    // 专门取出最近搜索的数据
    getSearch () {
      const tmp = window.localStorage.getItem('search')
      if (!tmp) {
        return []
      } else {
        return JSON.parse(tmp)
      }
    },
    deleteSearch () {
      // 1.当前数据清除
      this.historySearchList = []
      // 2.将本地存储清除
      window.localStorage.removeItem('search')
    },
    searchIndex (name) {
      searchIndex(name).then(res => {
        if (res.code === 200) {
          // console.log(res.info)
          this.searchIndexList = res.info
        } else {
          console.log(res.code_msg)
        }
      }).catch(err => {
        console.log(err)
        alert('网络异常,请稍后')
      })
    }
  },
  // 监听searchVal数据的变化,就会执行对应的回调函数
  watch: {
    searchVal (newVal, oldVal) {
      // 当前输入框不为空的时候,进行发送数据
      if (newVal) {
        this.searchIndex(newVal)
      }
    }
  },
  created () {
    this.getHotList()
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/mixin.scss";

.page-search {
  display: flex;
  flex-direction: column;
  height: 100%;

  .search-header {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 44px;
    background: #e7370c;
    position: relative;
    border-bottom: 1px solid #dbd9dc;
    .header-back {
      position: absolute;
      top: 50%;
      left: 12px;
      margin-top: -7px;
      width: 24px;
      height: 14px;
      background: url("~@/assets/icon/header-back-white.png") no-repeat;
      background-size: 100%;
    }
    .header-btn {
      color: #fff;
      font-weight: 500;
      position: absolute;
      top: 50%;
      right: 12px;
      transform: translateY(-50%);
    }
    .header-search {
      display: flex;
      align-items: center;
      width: 70%;
      border-radius: 3px;
      position: relative;
      .icon-search {
        width: 14px;
        height: 14px;
        background: url("~@/assets/icon/icon-search.png") no-repeat;
        background-size: 100%;
        position: absolute;
        top: 50%;
        left: 10px;
        transform: translateY(-50%);
      }
      .search-input {
        box-sizing: border-box;
        display: flex;
        align-items: center;
        width: 100%;
        height: 30px;
        padding-right: 10px;
        padding-left: 30px;
        border-radius: 3px;
        outline: none;
        border: none;
      }
    }
  }

  .search-main {
    flex: 1;
    overflow-y: auto;
  }

  .search-recommend,
  .search-history {
    box-sizing: border-box;
    padding: 15px 0;
    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 10px 10px;
      border-bottom: 1px solid #e9e9e9;
      .title-title {
        color: #8b8b8b;
      }
      .title-btn {
        display: flex;
        align-items: center;
        color: #8b8b8b;
        .icon-refresh {
          width: 13px;
          height: 12px;
          margin-right: 4px;
          background: url("~@/assets/icon/icon-refresh.png") no-repeat;
          background-size: 100%;
        }
        .icon-del {
          width: 13px;
          height: 14px;
          background: url("~@/assets/icon/icon-del.png") no-repeat;
          background-size: 100%;
        }
      }
    }
    .recommend-content {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      padding: 0 10px;
      margin-top: 15px;
      .recommend-item {
        @include border-bottom;
        display: flex;
        box-sizing: border-box;
        justify-content: center;
        align-items: center;
        height: 32px;
        padding: 0 10px;
        margin-right: 10px;
        margin-bottom: 10px;
        font-weight: 500;
      }
    }
    .history-content {
      padding: 0 10px;
      .history-item {
        box-sizing: border-box;
        display: flex;
        align-items: center;
        width: 100%;
        height: 40px;
        border-bottom: 1px solid #e9e9e9;
        .icon-time {
          width: 13px;
          height: 13px;
          margin-right: 6px;
          background: url("~@/assets/icon/icon-time.png") no-repeat;
          background-size: 100%;
        }
      }
    }
  }

  .search-content {
    box-sizing: border-box;
    margin: 0 auto;
    padding: 0 10px;
    .item {
      box-sizing: border-box;
      display: flex;
      align-items: center;
      height: 40px;
      padding-left: 10px;
      font-weight: 600;
      border-bottom: 1px solid #ddd;
    }
  }
}
</style>
