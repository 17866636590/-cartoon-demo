// 专门处理城市相关接口
// 注意:城市相关的接口,是找卖座网拿过来的,不能使用request.js里封装的axios
// 可以直接使用axios实例
// 直接引入 axios实例

// 获取卖座网城市的数据
// https://m.maizuo.com/gateway?k=8626713
import axios from 'axios'

export const getCityList = () => {
  return axios({
    url: '/maizuo/gateway?k=8626713',
    headers: {
      'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"1604463379950789795217412"}',
      'X-Host': 'mall.film-ticket.city.list'
    }
  })
}
