<template>
	<view class="mynewsupport">
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
				title:'收获的支持',
				back:'back',
				
			}
		},
		components:{
			mynavbar,
		},
		methods:{
			Back(){
				uni.navigateBack({
					delta: 1
				})
			},
		},
		onLoad(option) {
			/*已查看所有我的新支持*/
			http.post('/api/SupportFlagClean',{nickname: option.nickname}).then(res => {
				if(res.data == 'success'){
					console.log('全部已读')
				}
			})
		}
	}
</script>

<style>
</style>
