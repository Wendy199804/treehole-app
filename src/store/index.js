import Vue from 'vue'
import Vuex from 'vuex'
import {http} from '../utils/index.js'

Vue.use(Vuex)

const store = new Vuex.Store({  
    state: {  
         a:"11221"
    },  
    mutations: {  
        login(state,params){
					console.log(params)
				}
    } ,
		actions:{
			/*登录*/
			login_asyn(content,params){
				http.post('/api/User',params).then(res => {
					console.log(res)
					if(res.data.length !==0) {
						uni.showToast({
							title: '登录成功',
							icon: 'none',
							position: 'bottom',
							duration: 1500
						})
					}
				}).catch(err => {
					console.log(err)
				})
			}
		}
}) 

export default store