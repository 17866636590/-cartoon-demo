// 专门处理漫画数据的接口
import request from '../utils/request'
import { format } from '../utils/apiHelp'
/*
获取轮播图的数据
https://mhd.zhuishushenqi.com/comic_v2/getproad?apptype=8&appversion=1.0&channel=web-app&adgroupid=123
*/
export const getBanner = () => {
  return request({
    url: '/api/comic_v2/getproad',
    params: {
      apptype: 8,
      appversion: 1.0,
      ' channel': 'web-app',
      adgroupid: 123
    }
  })
}
// 获取首页推荐数据
// https://mhd.zhuishushenqi.com/comic_v2/customerview?apptype=8&appversion=1.0&channel=web-app&viewtype=1

export const getIndexRecomment = () => {
  return request({
    url: '/api/comic_v2/customerview',
    params: {
      apptype: 8,
      appversion: 1.0,
      channel: 'web-app',
      viewtype: 1
    }
  })
}
// 获取分类的内容
// https://mhd.zhuishushenqi.com/comic_v2/getproad?apptype=8&appversion=1.0&channel=web-app&adgroupid=125
export const getTypes = () => {
  return request({
    url: '/api/comic_v2/getproad',
    params: {
      apptype: 8,
      appversion: 1.0,
      channel: 'web-app',
      adgroupid: 125
    }
  })
}
// 获取分类请求的数据
// https://mhd.zhuishushenqi.com/comic_v2/comicsfilterlist_v2?apptype=8&appversion=1.0&channel=web-app
export const getTypesList = (subject, pageno = 1, pagesize = 20) => {
  return request({
    url: '/api/comic_v2/comicsfilterlist_v2',
    method: 'POST',
    // 查询字符串是params传
    params: {
      apptype: 8,
      appversion: 1.0,
      channel: 'web-app'
    },
    // format的参数通过这个data传
    // 编码
    data: format({
      subject,
      pageno,
      pagesize
    })
  })
}
// 获取排行的数据
// https://mhd.zhuishushenqi.com/comic_v2/comicsrank?apptype=8&appversion=1.0&channel=web-app
export const getRankList = (ranktype, pageno = 1, pagesize = 20) => {
  return request({
    url: '/api/comic_v2/comicsrank',
    method: 'POST',
    // 查询字符串是params传
    params: {
      apptype: 8,
      appversion: 1.0,
      channel: 'web-app'
    },
    // format的参数通过这个data传
    // 编码
    data: format({
      ranktype,
      pageno,
      pagesize
    })
  })
}
// 获取VIP里的数据
// https://mhd.zhuishushenqi.com/comic_v2/comicsfilterlist_v2?apptype=8&appversion=1.0&channel=web-app
export const getVIPList = (special = 892, pageno = 1, pagesize = 15) => {
  return request({
    url: '/api/comic_v2/comicsfilterlist_v2',
    method: 'POST',
    // 查询字符串是params传
    params: {
      apptype: 8,
      appversion: 1.0,
      channel: 'web-app'
    },
    // format的参数通过这个data传
    // 编码
    data: format({
      special,
      pageno,
      pagesize
    })
  })
}
// 获取热门搜索里的数据
// https://mhd.zhuishushenqi.com/comic/hotsearch?apptype=8&appversion=1.0&channel=web-app&appType=8
export const getHotList = () => {
  return request({
    url: '/api/comic/hotsearch',
    method: 'GET',
    // 查询字符串是params传
    params: {
      apptype: 8,
      appversion: 1.0,
      channel: 'web-app'
    }
  })
}
// 搜索关键字页面的接口
// https://mhd.zhuishushenqi.com/comic_v2/searchindex?apptype=8&appversion=1.0&channel=web-app&name=23&type=2
export const searchIndex = (name) => {
  return request({
    url: '/api/comic_v2/searchindex',
    method: 'GET',
    // 查询字符串是params传
    params: {
      apptype: 8,
      appversion: 1.0,
      channel: 'web-app',
      name,
      type: 2
    }
  })
}
// 获取搜索结果页的数据
// https://mhd.zhuishushenqi.com/comic_v2/searchbookauthor?apptype=8&appversion=1.0&channel=web-app&name=%E9%A9%AD%E7%81%B5%E5%B8%88&type=2&pageno=1&pagesize=100
export const searchResult = (name) => {
  return request({
    url: '/api/comic_v2/searchbookauthor',
    method: 'GET',
    // 查询字符串是params传
    params: {
      apptype: 8,
      appversion: 1.0,
      channel: 'web-app',
      name,
      type: 2,
      pageno: 1,
      pagesize: 100
    }
  })
}
