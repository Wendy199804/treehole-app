import Vue from 'vue'
import Vuex from 'vuex'
import {
	http
} from '../utils/index.js'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		a: "11221",
		userinfo:'',//保存登录后的用户信息
		dialoguearr: [],//机器人对话信息
	},
	mutations: {
		/*登录*/
		login(state, params) {
			state.userinfo = params
			console.log(state.userinfo)
		},
	},
	actions: {
		/*登录*/
		login_asyn(context, params) {
			
			http.post('/api/User', params).then(res => {
				console.log(res.data)
				if (res.data.length == 0) { 
					uni.showToast({
						title: '用户名密码有误',
						icon: 'none',
						position: 'bottom',
						duration: 1500
					})
				} else {
					uni.setStorage({
						key: 'user',
						data: res.data[0],
						success: function() {
								uni.reLaunch({ //关闭所有页面去首页
									url: '../home/index'
								})
							context.commit('login',res.data[0])
						}
					})
					
				}
			}).catch(err => {
				console.log(err)
			})
		}
	}
})

export default store
