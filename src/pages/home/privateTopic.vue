<template>
	<view class="private-topic">
		<mynavbar :title="title" :lefticon="back" @leftEvent="Back"></mynavbar>
		<view class="swiperbox">
			<specialbanner :banner-list="bannerList" :swiper-config="swiperConfig" @getBannerDetail="getBannerDetail"></specialbanner>
			
		</view>
		<view class="derec-text">
			树洞君(。ˇε ˇ。）
		</view>
		<button type="default" class="decre-btn" @click="publishArticle">创建树洞</button>
	</view>
</template>

<script>
	import mynavbar from '../../components/navbar.vue'
	import {
		http
	} from '../../utils/index.js'
	import {
		Swiper,
		SwiperSlide,
		directive
	} from 'vue-awesome-swiper'
	import 'swiper/css/swiper.css'
	import specialbanner from '../../components/specialBanner.vue'

	export default {
		data() {
			return {
				title: '树洞',
				back: 'back',
		
				bannerList: [],
				swiperConfig: {
					indicatorDots: false,
					indicatorColor: 'rgba(255, 255, 255, .4)',
					indicatorActiveColor: 'rgba(255, 255, 255, 1)',
					autoplay: false,
					interval: 3000,
					duration: 300,
					circular: true,
					previousMargin: '58rpx',
					nextMargin: '58rpx'
				},
				mynickname: '',
			}
		},
		components: {
			mynavbar,
			Swiper,
			SwiperSlide,
			specialbanner
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
					url:`../showdetails/nonamedetails?topicid=${topicid}&mynickname=${this.mynickname}`
				})
			},
			/*发表树洞*/
			publishArticle(){
				console.log('发表树洞')
				uni.navigateTo({
					url:`./postatopic?mynickname=${this.mynickname}`
				})
			},
		},
		onLoad(option) {
			this.mynickname = option.mynickname
			http.get('/api/TreeHoleNotName').then(res => {
				console.log(res)
				this.bannerList = res.data
				console.log(this.bannerList)
			})
		},

	}
</script>

<style lang="scss">
	.private-topic {
		width: 100%;
		height: 100vh;
		background: url(../../static/treebg.png) no-repeat;
		background-size: cover;

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
