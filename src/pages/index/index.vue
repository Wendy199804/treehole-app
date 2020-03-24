<template>
	<view class="index">
		启动动画3
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		onShow() {
			setTimeout(()=>{
			uni.navigateTo({ 
			    url: '../login/index'
			});	
			},1500)
		},
		methods: {

		}
	}
</script>

<style>
	
</style>
