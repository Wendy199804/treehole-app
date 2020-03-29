<template>
	<view class="treeholeItem" @click="toDetails">
		<!--上部分-->
		<view class="top">
			<view class="head">
				<image src="../../static/head-portrait.png" class="headimg"></image>
			</view>
			<view class="name">
				<text style="font-size: 15px;font-weight:800;">{{title}}</text>
				<text>创作者 - {{author}}</text>
			</view>
<view class="time">
				<text>{{newtime}}</text>
			</view>
		</view>
		<!--内容部分-->
		<view class="mycontent" v-html="content"></view>
		<!--下部分-->
		<view class="function">
			<view class="reply">
				<image src="../../static/reply.png" class="replyimg"></image>
				<text class="replynum">{{replynum}}</text>
			</view>
			<view class="support">
				<uni-fav :checked="checked" class="favBtn" circle="true" bg-color="#eeeeee" fg-color="#666666" fg-color-checked="#ffffff"
				 bg-color-checked="#EF5656" @click.native.stop="support" :content-text="supporttext"></uni-fav>
			</view>
			
		</view>

	</view>
</template>

<script>
	import {
		uniFav
	} from '@dcloudio/uni-ui'
	import calculateTime from '../utils/calculateTime.js'
	import {
		http
	} from '../utils/index.js'
	
	export default {
		data() {
			return {
				checked: false, //是否支持
				supporttext: {
					contentDefault: '支持',
					contentFav: '已支持'
				}, //支持文字
				newtime:'',//格式化的日期
				nickname:'',//当前用户的nickname
			}
		},
		props: {
			title: {
				type: String,
			},
			author: {
				type: String,
			},
			time: {
				type: String,
			},
			content: {
				type: String,
			},
			replynum: {
				type: String,
			},
			topicid: {
				type: String,
			},
		},
		components: {
			uniFav
		},
		methods: {
			/*点击支持*/
			support() {
				this.checked = !this.checked
				let a = {topicid:this.topicid,nickname:this.nickname}
				http.post('/api/Support',{topicid:this.topicid,nickname:this.nickname}).then(res => {
					console.log(res)
						uni.showToast({
							title: res.data,
							icon: 'none',
							position: 'bottom',
							duration: 1500
						})
				},err => {
					uni.showToast({
						title: err.data,
						icon: 'none',
						position: 'bottom',
						duration: 1500
					})
				})
			},
			/*打开详情*/
			toDetails(){
				this.$emit('toDetails')
				
			},
		},
		created(){
			let newtime = this.time.split(' ')
			this.newtime=calculateTime.calculateTime(newtime[0],newtime[1],'/',':')
			this.nickname = uni.getStorageSync('user').nickname
		},
		
	}
</script>

<style lang="scss">
	.treeholeItem {
		margin-bottom: 30rpx;
		background-color: #FFFFFF;

		.headimg {
			width: 100%;
			height: 100%;
		}

		.top {
			width: 100%;
			height: 100rpx;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			font-size: 13px;
			position: relative;

			.head {
				width: 80rpx;
				height: 80rpx;
			}

			.name {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				align-items: flex-start;
				padding-left: 20rpx;
				box-sizing: border-box;
			}
			.time {
				position: absolute;
				right: 10rpx;
				top: 25rpx;
				font-size: 12px;
				color: #666666;
			}
		}

		.mycontent {
			width: 100%;
			max-height: 208rpx;
			padding: 10rpx 30rpx 0rpx 30rpx;
			box-sizing: border-box;
			margin-bottom: 10rpx;
			font-size: 14px;
			text-overflow: -o-ellipsis-lastline;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 5;
			line-clamp: 5;
			-webkit-box-orient: vertical;
		}

		.function {
			width: 90%;
			height: 72rpx;
			margin: 0 auto;
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-top: 1px solid #cccccc;

			.reply,
			.support {
				display: flex;
				justify-content: center;
				align-items: center;
			}

			.reply {
				width: 60%;
			}

			.support {
				width: 30%;
			}

			.replyimg {
				width: 30rpx;
				height: 30rpx;
				margin-right: 10rpx;
			}

			.replynum {
				font-size: 12px;
				color: #666666;
				margin-top: -3px;
			}

			
		}
	}
</style>
