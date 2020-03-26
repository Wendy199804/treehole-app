<template>
	<view class="treeholeItem">
		<!--上部分-->
		<view class="top">
			<view class="head">
				<image src="../../static/head-portrait.png" class="headimg"></image>
			</view>
			<view class="name">
				<text style="font-size: 15px;font-weight:800;">{{title}}</text>
				<text>{{author}}</text>
			</view>
			
		</view>
		<!--内容部分-->
		<view class="mycontent">
				<!-- {{content}} -->
				的接口方法的v反对v方法v发v发v发v方法v发v发接口方法的v反对法v发v发v发v方法v发v发接口方法的v反对法v发v发v发v方法v发v发接口方法的v反对法v发v发v发v方法v发v发接口方法的v反对v方法v发v发v发v方法接口方法的v反对v方法v发v发v发v方法
		</view>
		<!--下部分-->
		<view class="function">
			<view class="reply">
				<image src="../../static/reply.png" class="replyimg"></image>
				<text class="replynum">{{replynum}}</text>
			</view>
			<view class="support">
				<uni-fav :checked="checked" class="favBtn" circle="true" bg-color="#eeeeee" fg-color="#666666" fg-color-checked="#ffffff"
				bg-color-checked="#EF5656" @click="onClick" :content-text="supporttext"
				></uni-fav>
			</view>
			<view class="time">
				<text>{{time}}</text>
			</view>
		</view>
		
	</view>
</template>

<script>
	import { uniFav } from '@dcloudio/uni-ui'
	
	export default {
		data(){
			return{
				checked:false,  //是否支持
				supporttext:{contentDefault: '支持',contentFav: '已支持'},  //支持文字
				
			}
		},
		props:{
			title:{
				type: String,
			},
			author:{
				type:String,
			},
			time:{
				type: String,
			},
			content:{
				type: String,
			},
			replynum:{
				type: String,
			},
		},
		components:{
			uniFav 
		},
		methods:{
			onClick(){
				console.log("support")
				this.checked=!this.checked
			}
		}
	}
</script>

<style lang="scss">
	.treeholeItem{
		// border-top: 1px solid #cccccc;
		margin-bottom: 30rpx;
		background-color: #FFFFFF;
		
		.headimg{
			width: 100%;
			height: 100%;
		}
		
		.top{
			width: 100%;
			height: 100rpx;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			font-size: 13px;
			
			.head{
				width: 80rpx;
				height: 80rpx;
			}
			.name{
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				align-items: flex-start;
				padding-left:20rpx;
				box-sizing: border-box;
			}
			
			
		}
		
		.mycontent{
			width: 100%;
			height: 252rpxs;
			padding: 10rpx 20rpx 50rpx 20rpx;
			box-sizing: border-box;
			font-size: 14px;
			 text-overflow: -o-ellipsis-lastline;
			  overflow: hidden;
			  text-overflow: ellipsis;
			  display: -webkit-box;
			  -webkit-line-clamp: 5;
			  line-clamp: 5;
			  -webkit-box-orient: vertical;
		}
		
		.function{
			width: 90%;
			height: 72rpx;
			margin: 0 auto;
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-top: 1px solid #cccccc;
			position: relative;
			
			.reply,.support{
				display: flex;
				justify-content: center;
				align-items: center;
			}
			.reply{
				width: 60%;
			}
			.support{
				width: 30%;
			}
			.replyimg{
				width: 35rpx;
				height: 35rpx;
				margin-right: 10rpx;
			}
			.replynum{
				font-size: 12px;
				color: #666666;
				margin-top: -2px;
			}
			
			.time{
				position: absolute;
				right: 10rpx;
				top: -40rpx;
				font-size: 12px;
				color: #666666;
			}
		}
	}
</style>
