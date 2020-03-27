<template>
	<view class="details">
		<mynavbar :title="title" :lefticon="back" @leftEvent="Back"></mynavbar>
		
	</view>
</template>

<script>
	import mynavbar from '../../components/navbar.vue'
	
	export default {
		data(){
			return{
				title:'正文',
				back:'back'
			}
		},
		components:{
			mynavbar
		},
		methods:{
			/*返回上一页*/
			Back(){
				uni.navigateBack({
				    delta: 2
				})
			},
		}
	}
</script>

<style>
</style>
