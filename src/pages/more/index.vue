<template>
	<view class="more">
		<mynavbar :title="title"></mynavbar>
		more
	</view>
</template>

<script>
	import mynavbar from '../../components/navbar.vue'
	
	export default{
	data(){
		return{
			title:'我的',
			
		}
	},
	components:{
		mynavbar
	}
	}
</script>

<style>
</style>
