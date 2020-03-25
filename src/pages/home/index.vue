<template>
	<view class="home">
	  <mynavbar :title="title"></mynavbar>
		<view class="write-module module">
			<view class="write-item">
				<view class="write-item-icon" style="background-color: #CC9999;">
					<image src="../../static/write.png" class="icon"></image>
				</view>
				<text>写信</text>
			</view>
			<view class="write-item">
				<view class="write-item-icon" style="background-color: #99CCFF;">
					<image src="../../static/mailbox.png" class="icon"></image>
				</view>
				<text>邮筒</text>
			</view>
			<view class="write-item">
				<view class="write-item-icon" style="background-color: #CCCC99;">
					<image src="../../static/mail.png" class="icon"></image>
				</view>
				<text>信箱</text>
			</view>
		</view>
		<view class="application-module module">
			<view class="application-module-item">
				<image src="../../static/tree.png" class="icon"></image>
				<text>树洞</text>
			</view>
			<view class="application-module-item">
				<image src="../../static/tree.png" class="icon"></image>
				<text>树洞</text>
			</view>
			<view class="application-module-item">
				<image src="../../static/tree.png" class="icon"></image>
				<text>树洞</text>
			</view>
			<view class="application-module-item">
				<image src="../../static/tree.png" class="icon"></image>
				<text>树洞</text>
			</view>
			<view class="application-module-item">
				<image src="../../static/tree.png" class="icon"></image>
				<text>树洞</text>
			</view>
		</view>
	</view>
</template>

<script>
	
	import mynavbar from '../../components/navbar.vue'
	import mystatusbar from '../../components/navbar.vue'
	
	export default{
	data(){
		return{
			title:'Tree Hole',
			
		}
	},
	components:{
		mynavbar,
		mystatusbar
	}
	}
</script>

<style lang="scss">
	.home{
		background-color: #F5F5F5;
		border: 1px solid red;
		.module{
			padding: 40rpx 50rpx;
			box-sizing: border-box;
			width: 100%;
			margin-bottom: 30rpx;
			background-color: #FFFFFF;
		}
		.write-module{
			color: #333333;
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 14px;
			border: 1px solid red;
			
			.write-item{
				width: 20%;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				align-items: center;
			}
			.write-item-icon{
				width: 110rpx;
				height: 110rpx;
				border-radius: 50%;
				display: flex;
				justify-content: center;
				align-items: center;
				margin-bottom: 20rpx;
				.icon{
					width: 60rpx;
					height: 60rpx;
				}
			}
		}
		.application-module{
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			font-size: 14px;
			.application-module-item{
				width: 25%;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				align-items: center;
				.icon{
					width: 70rpx;
					height: 70rpx;
				}
			}
		}
		
	}
</style>
