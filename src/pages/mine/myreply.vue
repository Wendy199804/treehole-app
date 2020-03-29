<template>
	<view class="myreply">
		<mynavbar :title="title" :lefticon="back" @leftEvent="Back"></mynavbar>
		
	</view>
</template>

<script>
	import mynavbar from '../../components/navbar.vue'
	import {
		http
	} from '../../utils/index.js'
	
	export default {
		data(){
			return{
				title:'我的回复',
				back:'back',
				
			}
		},
		components:{
			mynavbar
		},
		methods:{
			/*返回上一页*/
			Back() {
				uni.navigateBack({
					delta: 1
				})
			},
		},
		onLoad(option) {
			http.post('/api/UserReply',{nickname:option.nickname}).then(res => {
				console.log(res)//我回复过的树洞
			})
		}
	}
</script>

<style>
</style>
