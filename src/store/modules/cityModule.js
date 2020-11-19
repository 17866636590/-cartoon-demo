// 拆分出来城市相关 仓库子模块
// 从本地存储中取数据出来
const city = window.sessionStorage.getItem('city')
const state = {
  curCity: city ? JSON.parse(city) : null // 当前选择的城市,默认为空
}
const mutations = {
  // 设置当前城市
  // state 就是上面的state payload 是  this.$store.commit("SET_CURCITY",payload)
  SET_CURCITY (state, payload) {
    state.curCity = payload
    // 做一下本地的存储
    window.sessionStorage.setItem('city', JSON.stringify(state.curCity))
  }
}
const getters = {
  curCityName (state) {
    return state.curCity ? state.curCity.name : ''
  }
}
export default {
  // 命名空间
  namespaced: true, // 注意在字模块中添加命名空间
  state,
  mutations,
  getters
}
