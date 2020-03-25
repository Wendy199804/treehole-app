<template>
	<view class="mine">
		<mynavbar :title="title"></mynavbar>
		mine
	</view>
</template>

<script>
	import mynavbar from '../../components/navbar.vue'
	
	export default{
	data(){
		return{
			title:'More',
			
		}
	},
	components:{
		mynavbar
	}
	}
</script>

<style>
</style>
