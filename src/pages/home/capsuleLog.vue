<template>
	<view class="capsule-log">
		<mynavbar :title="title" :lefticon="'back'" @leftEvent="Back"></mynavbar>
		<view class="length0bg" v-if="timecapsuleLog.length==0">
			你还没有时间胶囊哦 ~ 赶紧去添加吧 ~
		</view>
		<view class="contain" v-if="timecapsuleLog.length>0">
			<view class="delbtn" @click="delbtn">
				<image src="../../static/delbtn.png" class="image"></image>
			</view>
			<swiper indicator-color="#ffffff" class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
			 :duration="duration" @change="swiperChange">
				<swiper-item class="swiperitem" v-for="item in timecapsuleLog" :key="item.tcapsuleID">
					<view>
						<view class="item-title">给自己的一封信</view>
						<view class="set-time" @click="checkCapsule(item.tcapsuleID,item.ifdeadline)">
							{{item.time}}
						</view>
						<view class="openState" v-if="item.ifdeadline">
							{{item.isOpen}}
						</view>
						<view class="countdown" v-if="!item.ifdeadline">
							<view style="text-align: center;">距离开启日期还有：</view>
							<view style="text-align: center;">
								<text style="font-size: 28px;">{{item.countdown}}</text><text style="font-size: 20px;">天</text>
							</view>
						</view>
						<uni-popup :ref="`pop${item.tcapsuleID}`" type="center" v-if="item.ifdeadline">
							<view class="lettermain" scroll-y="true">
								<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" style="height: 520rpx;" @scrolltoupper="upper"
								 @scrolltolower="lower" @scroll="scroll">
									<view class="title">
										{{item.time2}}的自己：
									</view>
									<view class="main">
										士士大夫日光湖人和骨头火锅土归土画个图士大夫日光湖人和骨头火锅土归土画个图士大夫日光湖人和骨头火锅土归土画个图士大夫日光湖人和骨头火锅土归土画个图士大夫日光湖人和骨头火锅土归土画个图士大夫日光湖人和骨头火锅土归土画个图士大夫日光湖人和骨头火锅土归土画个图大夫日光湖人和骨头火锅土归土画个图
										{{item.contentery}}
									</view>
									<view class="foot">
										<text>{{nickname}}</text>
										<text>{{item.createdOn}}</text>
									</view>
								</scroll-view>
							</view>
						</uni-popup>
					</view>
				</swiper-item>
			</swiper>
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
				title: '时间胶囊',
				indicatorDots: true,
				autoplay: false,
				interval: 2000,
				duration: 500,
				nickname: '',
				date: '',
				timecapsuleLog: [],
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				curSwiper: 0,
			}
		},
		components: {
			mynavbar,
			uniPopup,
		},
		methods: {
			/*返回上一页*/
			Back() {
				uni.navigateBack({
					delta: 1
				})
			},
			/*查看胶囊内容*/
			checkCapsule(tcapsuleid, ifdeadline) {
				let index = this.curSwiper //swiper当前索引
				if (ifdeadline) {
					let popup = `pop${tcapsuleid}`
					this.$refs[popup][0].open()
					console.log("到期")
					http.post('/api/CapOpen', {
						nickname: this.nickname,
						tcapsuleid: tcapsuleid
					}).then(res => {
						if (res.data === 'success') {
							this.timecapsuleLog[index].isOpen = '已打开'
						}
					})
				} else {
					console.log("未到期")
				}
			},
			scroll(e) {
				this.old.scrollTop = e.detail.scrollTop
			},
			upper(e) {},
			lower(e) {},
			/*滑动swiper*/
			swiperChange(event) {
				this.curSwiper = event.detail.current
			},
			/*删除*/
			delbtn() {
				let index = this.curSwiper
				uni.showModal({
					title: '提示',
					content: '确定要删除此胶囊吗',
					success: (res) => {
						if (res.confirm) {
							let tcapsuleid = this.timecapsuleLog[index].tcapsuleID
							http.post('/api/CapDel', {
								nickname: this.nickname,
								tcapsuleid
							}).then(res => {
								if (res.data === 'success') {
									uni.showToast({
										title: '删除成功',
										duration: 1500
									});
									this.timecapsuleLog.splice(index, 1)
								}
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})
			},
		},
		onLoad(option) {
			this.nickname = option.nickname
			let date = new Date()
			let yy = date.getFullYear()
			let mm = date.getMonth() + 1
			let dd = date.getDate() + 1
			this.date = `${yy}-${mm}-${dd}`
			// http.post('/api/CapRemind', {
			// 	nickname: this.nickname,
			// 	time: this.date
			// }).then(res => {
			// 	console.log(res) //
			// })
		},
		onShow() {
			let date = new Date()
			let yy = date.getFullYear()
			let mm = date.getMonth() + 1
			let dd = date.getDate()
			let nowtime = `${yy}${mm}${dd}`
			
			http.post('/api/UserCapList', {
				nickname: this.nickname
			}).then(res => {
				console.log(res)
				res.data.forEach(item => {
					
					let timearr = item.time.split(' ')[0].split('/')
					let curtime = `${timearr[0]}${timearr[1]}${timearr[2]}`
					item.time = `${timearr[0]}.${timearr[1]}.${timearr[2]}`
					item.time2 = `${timearr[0]}年${timearr[1]}月${timearr[2]}日`
					if (curtime - nowtime <= 0){//胶囊时间-现在的时间 //如果胶囊已经到期(<=0)，可以打开，没有到期，只能查看
						item.ifdeadline = true //到期
					}else{
						item.ifdeadline = false
						item.countdown = new Date(yy-mm-dd) - new Date(timearr[0]-timearr[1]-timearr[2])
					}
					
				})
				this.timecapsuleLog = res.data
			})
			// console.log(new Date(2020-4-13)  -  new Date(2020-4-16))//3
		},
	}
</script>

<style lang="scss">
	.capsule-log {
		height: 100vh;
		background: url(../../static/timecapsulebg.jpg) no-repeat;
		background-size: 100% 100%;

		.length0bg {
			text-align: center;
			color: #333333;
		}

		.contain {
			width: 100%;
			// height: calc(100%-65px);
			position: absolute;
			top: 118rpx;
			bottom: 0;

			.delbtn {
				width: 60rpx;
				height: 60rpx;
				position: absolute;
				left: 10rpx;
				top: 10rpx;
				z-index: 100;
			}

			.swiper {
				height: 100%;

				.swiperitem {
					background: url(../../static/timecapsulebg.jpg) no-repeat;
					background-size: 100% 100%;

					.item-title {
						text-align: center;
						color: #FFFFFF;
						text-shadow: 2px 2px 4px #333333;
						font-size: 20px;
						margin-top: 250rpx;
						font-family: 幼圆;
						font-weight: 800;
					}

					.set-time {
						border-radius: 50%;
						width: 200rpx;
						height: 200rpx;
						line-height: 200rpx;
						text-align: center;
						font-size: 14px;
						background-color: #FFFFFF;
						color: #333333;
						margin: 0 auto;
						margin-top: 150rpx;
						text-shadow: 2px 2px 2px rgb(109, 221, 183);
					}

					.openState {
						width: 120rpx;
						height: 60rpx;
						border-radius: 8px;
						text-align: center;
						line-height: 60rpx;
						margin: 0 auto;
						margin-top: 60rpx;
						font-size: 14px;
						background-color: #FFFFFF;
						color: #333333;
						text-shadow: 2px 2px 2px rgb(109, 221, 183);
						border: 1px solid rgb(109, 221, 183);
					}
					
					.countdown{
						font-size: 15px; color: #336666;
						font-weight: 800;
						position: absolute;
						bottom: 120rpx;
						left: 50rpx;
					}
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
