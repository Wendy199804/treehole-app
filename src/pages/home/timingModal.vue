<template>
	<view class="timing-modal">
		<mynavbar :title="title" :lefticon="'back'" @leftEvent="Back"></mynavbar>
		<view class="contain">
			<view class="gifview">
				<text class="gifview-text">{{timelog}}’</text>
			</view>
			<view class="tip">
				猜我在等信，还是在发呆
			</view>
			<view class="list">
				<view class="list-item" v-for="item in list" :key="item.order" @click="toWrite(item.userID)">
					<view class="orderimg">
						<image :src="item.orderimg" class="image"></image>
					</view>
					<view class="item-main">
						<view class="item-head">
							<image src="../../static/head-portrait.png" class="image"></image>
						</view>
						<view class="list-item-main">
							<text style="font-size: 14px;">{{item.nickname}}</text>
							<text style="font-size: 12px;color: #999999;">{{item.msg}}</text>
						</view>
						<text style="font-size: 14px;margin-top: 2rpx;">{{item.time}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import mynavbar from '../../components/navbar.vue'
	import {
		http
	} from '../../utils/index.js'
	import jinp from "../../static/jinp.png"
	import yinp from "../../static/yinp.png"
	import tongp from "../../static/tongp.png"
	import forth from "../../static/forth.png"
	import fifth from "../../static/fifth.png"

	export default {
		data() {
			return {
				title: '水族箱',
				timelog: '0',
				timer: '',
				list: ''
			}
		},
		components: {
			mynavbar
		},
		methods: {
			/*返回上一页*/
			Back() {
				uni.navigateBack({
					delta: 1
				})
			},
			toWrite(userID) {
				uni.navigateTo({
					url: `./writeLetter?nickname=${this.nickname}&tosomeone=${userID}`
				})
			},
			

		},
		onLoad(option) {
			this.nickname = option.nickname
			this.timer = setInterval(() => {
				this.timelog ++ 
				console.log(this.timelog)
			},1000)
			http.get('/api/AquariumList').then(res => {
				console.log(res)
				
				this.list = res.data.map(item => {
					if (item.aquserID == 1) {
						item.orderimg = jinp
						item.msg = '当你遇到一生挚爱时，鱼是停止的'
						
					} else if (item.aquserID == 2) {
						item.orderimg = yinp
						item.msg = '发呆不在我的计划中，只是刚好发生'
					} else if (item.aquserID == 3) {
						item.orderimg = tongp
						item.msg = '你看，那个人好像一条鱼诶'
					} else if (item.aquserID == 4) {
						item.orderimg = forth
						item.msg = '时过境迁，发呆依旧'
					} else if (item.aquserID == 5) {
						item.orderimg = fifth
						item.msg = '如果你依然坚持，那么我也一样'
					}

					item.nickname = `*${item.nickName.substring(1,item.nickName.length)}`
					item.time = `${item.time}’`
					return item
				})
				console.log(this.list)
			})
		},
		onHide() {
			console.log('隐藏')
		},
		onUnload() {
			console.log('卸载')
			clearInterval(this.timer)
			http.post('/api/AquserUpdate',{nickname:this.nickname,time:this.timelog}).then(res => {
				console.log(res)
			})
		},
	}
</script>

<style lang="scss">
	.timing-modal {

		.contain {

			.gifview {
				width: 100%;
				height: 414rpx;
				background: url(../../static/timingbg.gif) no-repeat;
				background-size: 100% 100%;
				position: relative;

				.gifview-text {
					position: absolute;
					bottom: 10rpx;
					right: 0rpx;
					// display: block;
					// width: 20rpx;
					// height: 20rpx;
					color: #FFFFFF;
				}
			}

			.tip {
				padding: 20rpx;
				font-size: 14px;
				background-color: #FFFFFF;
				border-bottom: 1px solid #eeeeee;
			}
		}
		
		.list{
			
			.list-item{
				width: 100%;
				padding: 20rpx;
				box-sizing: border-box;
				display: flex;
				justify-content: space-between;
				align-items: center;
				border-bottom: 1px sold #eeeeee;
				.orderimg{
					width: 60rpx;
					height: 60rpx;
				}
				.item-main{
					width: 95%;
					margin-left: 10rpx;
					display: flex;
					justify-content: space-between;
					align-items: flex-start;
					.item-head{
						width: 80rpx;
						height: 80rpx;
						display: flex;
						justify-content: space-around;
						align-items: flex-start;
					}
					.list-item-main{
						width: 80%;
						height: 100%;
						margin-left: 10rpx;
						display: flex;
						flex-direction: column;
						justify-content: space-around;
						align-items: flex-start;
					}
				}
			}
		}

	}
</style>
