import { createStore } from 'vuex'
import video from './module/video'

export default createStore({
  state: {
    isLogin: false,
    name:'测试',
    uid:"125",
    defaultAddress:"http://124.71.44.221:8989"
  },
  getters: {
    getAddress:state=>state.defaultAddress,
    getLogin:state=>state.isLogin,
    getUser:state=>{
      return {
        name:state.name,
        uid:state.uid
      }
    }
  },
  mutations: {
    //改变登录状态
    toggleLoginState(state,payload){
      if(payload.user){
        state.isLogin = payload.state
      state.name = payload.user.name
      state.uid = payload.user.uid
      }
    }
  },
  actions: {
    toggleLoginState(context,payload){
      context.commit("toggleLoginState",payload)
    }
  },
  modules: {
    video
  }
})
