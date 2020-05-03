<template>
	<view class="letterbox">
		<mynavbar :title="title" :lefticon="'back'" @leftEvent="Back"></mynavbar>
		<view class="" v-if="letterlist.length == 0" style="text-align: center;margin-top: 30rpx;font-size: 14px;">
			别想了！没人给你写信 ~
		</view>
		<view class="swiper">
			<view class="uni-padding-wrap">
				<view class="page-section swiper">
					<view class="page-section-spacing">
						<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
							<swiper-item v-for="(item,index) in letterlist" :key="item.letterID">
								<view class="itemwrap" @click="checkContent(item.nickName,item.letterID)">
									<view class="swiper-item uni-bg-red">
										<view class="span">已接收</view>
										<view class="from">信件来自: <text style="margin-left: 20rpx;">{{item.nickName}}</text></view>
										<view class="address">地址:幸福大街99号</view>
										<view class="to">寄给: {{nickname}}</view>
										<view class="itemcontent">
										</view>
									</view>
								</view>
								<uni-popup :ref="`pop${item.letterID}`" type="center" >
									<view class="lettermain" scroll-y="true">
										<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" style="height: 520rpx;" @scrolltoupper="upper" @scrolltolower="lower" @scroll="scroll">
											<view class="title">
												亲爱的陌生人：
											</view>
											<view class="main">
												{{item.contentery}}
											</view>
											<view class="foot">
												<text>{{item.nickName}}</text>
												<text>{{item.createdOn}}</text>
											</view>

										</scroll-view>
									</view>
								</uni-popup>
								<view class="circle-num">{{index+1}}</view>
							</swiper-item>

						</swiper>
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
	import {
		uniPopup
	} from '@dcloudio/uni-ui'

	export default {
		data() {
			return {
				title: '给你的信',
				isfromHome: false,
				nickname: '',
				indicatorDots: false,
				autoplay: false,
				interval: 5000,
				duration: 500,
				letterlist: '',
				scrollTop: 0,
				old: {
					scrollTop: 0
				}
			}
		},
		components: {
			mynavbar,
			uniPopup
		},
		methods: {
			/*返回上一页*/
			Back() {
				uni.navigateBack({
					delta: 1
				})
			},
			/*查看具体内容*/
			checkContent(name, letterid) {
				let popup = `pop${letterid}`
				this.$refs[popup][0].open()
			},
			upper(e) {
			},
			lower(e) {
			},
			scroll(e) {
				this.old.scrollTop = e.detail.scrollTop
			},

		},
		onLoad(option) {
			this.nickname = option.nickname
		},
		onShow() {
			if (!this.isfromHome) {
				http.post('/api/UserLetter', {
					nickname: this.nickname
				}).then(res => {
					console.log(res)
					this.letterlist = res.data
				})
			}
		},
	}
</script>

<style lang="scss">
	.letterbox {
		height: 100vh;
		background-color: #eeeeee;
		// padding-top: 100rpx;
		
		.swiper {
			height: 100vh;

			.uni-padding-wrap {
				height: 100%;
			}

			.itemwrap {
				height: 650rpx;
				margin-top: 320rpx;
			}

				.circle-num{
					width: 100rpx;
					height: 100rpx;
					line-height: 100rpx;
					text-align: center;
					border-radius: 50%;
					border: 1px solid #eeeeee;
					background-color: #FFFFFF;
				}
				
			.swiper-item {
				height: 99%;
				border-top: 5px solid #CC9966;
				// border-bottom: 5px solid #FFCCCC;
				box-sizing: border-box;
				position: relative;
				font-family: 隶书;
				font-size: 20px;

				.span {
					position: absolute;
					top: 0;
					right: 20rpx;
					height: 160rpx;
					width: 50rpx;
					background-color: #CC9966;
					writing-mode: lr-tb;
					// font-size: 16px;
					padding-left: 6rpx;
					padding-top: 10rpx;
					box-sizing: border-box;
				}

				.from {
					position: absolute;
					top: 188rpx;
					left: 65rpx;
					// font-size: 15px;
				}

				.address {
					position: absolute;
					top: 310rpx;
					left: 65rpx;
					// font-size: 15px;
				}

				.to {
					position: absolute;
					bottom: 120rpx;
					right: 80rpx;
					// font-size: 15px;
				}

				.itemcontent {
					margin-top: 100rpx;
					height: 450rpx;
					background: url(../../static/boxbg.jpg) no-repeat;
					background-size: 100% 100%;
				}

			}

			.lettermain {
				width: 560rpx;
				height: 800rpx;
				padding: 30rpx;
				box-sizing: border-box;
				font-size: 16px;
				border-radius: 10px;
				background: url(../../static/letterbg.jpg) no-repeat;
				background-size: 100% 100%;
				overflow: hidden;
				font-size: 22px;
				font-weight: blod;
				font-family: 隶书;

				.foot {
					display: flex;
					flex-direction: column;
					align-items: flex-end;
					justify-content: space-between;
					height: 80rpx;
				}
			}
		}

	}
</style>
