<template>
	<view class="private-topic">
		<mynavbar :title="title" :lefticon="back" @leftEvent="Back"></mynavbar>
		<view class="swiperbox">
			<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
				<swiper-item v-for="(item, index) in bannerList" :key="index">
					<view class="image-container">
						<view class="slide-image" @click="getBannerDetail(item.topicID)">
							<text class="title">{{item.title}}</text>
							<view class="desc" v-html="item.contentery"></view>
							<view class="support">
								
								 <!-- <uni-icons type="heart-filled" size="30" color="#EF5656" v-if="item.flag" @click.native.stop="support(item.topicID,index)"></uni-icons> -->
								 <uni-icons :type="item.flag ? 'heart-filled': 'heart' " size="30" color="#EF5656"  @click.native.stop="support(item.topicID,index)"></uni-icons>
							</view>
						</view>
					</view>
				</swiper-item>
			</swiper>

		</view>
		<view class="derec-text">
			树洞君(。ˇε ˇ。）
		</view>
		<button type="default" class="decre-btn" @click="publishArticle">发布树洞</button>
	</view>
</template>

<script>
	import mynavbar from '../../components/navbar.vue'
	import {
		http
	} from '../../utils/index.js'
	import {
		uniIcons 
	} from '@dcloudio/uni-ui'
	import specialbanner from '../../components/specialBanner.vue'

	export default {
		data() {
			return {
				title: '树洞',
				back: 'back',
				bannerList: [],
				indicatorDots: false,
				autoplay: false,
				interval: 2000,
				duration: 500,
				mynickname: '',
				supporttext: {
					contentDefault: '支持',
					contentFav: '已支持'
				}, //支持文字
			}
		},
		components: {
			mynavbar,
			// uniFav
			uniIcons 
		},
		methods: {
			/*返回上一页*/
			Back() {
				uni.navigateBack({
					delta: 1
				})
			},
			/*点击获取topicid*/
			getBannerDetail(topicid) {
				console.log(topicid)
				uni.navigateTo({
					url: `../showdetails/nonamedetails?topicid=${topicid}&mynickname=${this.mynickname}`
				})
			},
			/*发表树洞*/
			publishArticle() {
				console.log('发表树洞')
				uni.navigateTo({
					url: `./postatopic?mynickname=${this.mynickname}`
				})
			},

			support(topicid, index) {
				// this.checked = !this.checked
				console.log(this.bannerList)
				this.bannerList[index].flag = !this.bannerList[index].flag
				http.post('/api/Support', {
					topicid,
					nickname: this.mynickname
				}).then(res => {
					console.log(res)
					uni.showToast({
						title: res.data,
						icon: 'none',
						position: 'bottom',
						duration: 1500
					})
				}, err => {
					uni.showToast({
						title: err.data,
						icon: 'none',
						position: 'bottom',
						duration: 1500
					})
				})
			},
		},
		onLoad(option) {
			this.mynickname = option.mynickname
		},
		onShow() {
			http.get('/api/TreeHoleNotName').then(res1 => {
				http.post('/api/SupportListNotName', {
					nickname: this.mynickname
				}).then(res2 => {
					if (res2.data.length !== 0) {
						let newarr1 = res1.data.map(item1 => {
							item1.flag = res2.data.some(item2 => item1.topicID === item2.topicID)
							return item1
						})
						this.bannerList = newarr1
					} else {
						this.bannerList = res1.data
					}
				})
			})
		}
	}
</script>

<style lang="scss">
	.private-topic {
		width: 100%;
		height: 100vh;
		background: url(../../static/treebg.png) no-repeat;
		background-size: cover;

		.swiper {
			width: 100%;
			height: 620rpx;
		}

		.image-container {
			box-sizing: border-box;
			width: 100%;
			height: 620rpx;
			display: flex;
			justify-content: center;
			align-items: center;

			.slide-image {
				width: 500rpx;
				height: 520rpx;
				z-index: 200;
				background-color: #FFFFFF;
				border-radius: 10px;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: flex-start;
				padding-top: 20rpx;
				box-sizing: border-box;

			}
		}

		.title {
			height: 42rpx;
			line-height: 42rpx;
			color: #222222;
			font-family: 'PingFangTC-Regular';
			text-align: center;
			font-size: 14px;
			position: relative;

			&::before {
				content: '';
				display: block;
				width: 5px;
				height: 5px;
				position: absolute;
				top: 50%;
				left: -30rpx;
				transform: translateY(-50%);
				background-color: #CC9999;
				border-radius: 50%;
			}

			&::after {
				content: '';
				display: block;
				width: 5px;
				height: 5px;
				position: absolute;
				top: 50%;
				right: -30rpx;
				transform: translateY(-50%);
				background-color: #CC9999;
				border-radius: 50%;
			}
		}

		.desc {
			margin-top: 4rpx;
			width: 100%;
			height: 388rpx;
			color: #222222;
			font-family: 'PingFangTC-Regular';
			text-align: left;
			font-size: 13px;
			padding: 20rpx;
			box-sizing: border-box;
			text-overflow: -o-ellipsis-lastline;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 11;
			line-clamp: 11;
			-webkit-box-orient: vertical;
		}

		.support {
			text-align: right;
			display: flex;
			justify-content: flex-end;
			
		}

		.swiperbox {
			margin-top: 50rpx;
		}

		.derec-text {
			text-align: center;
			color: #993333;
			margin-top: 100rpx;
			font-size: 13px;
			position: relative;

			&::before,
			&::after {
				content: '';
				display: block;
				width: 100rpx;
				height: 1px;
				background-color: #993333;
				position: absolute;
				top: 50%;
				transform: translateY(-50%);
			}

			&::before {
				left: 144rpx;
			}

			&::after {
				right: 144rpx;
			}
		}

		.decre-btn {
			width: 350rpx;
			height: 80rpx;
			color: #FFFFFF;
			background-color: #993333;
			font-size: 13px;
			line-height: 85rpx;
			margin-top: 70rpx;
		}
	}
</style>
