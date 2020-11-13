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
