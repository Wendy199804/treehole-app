<template>
	<view class="index">
		<view class="next" @click="next">
			跳过
		</view>
		<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
			<swiper-item>
				<view class="swiper-item ">
					<image src="../../static/index1.jpg" class="image"></image>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item ">
					<image src="../../static/index2.jpg" class="image"></image>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item ">
					<image src="../../static/index3.jpg" class="image"></image>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500
			}
		},
		onLoad() {

		},
		onShow() {
			setTimeout(() => {
				uni.navigateTo({
					url: '../login/index'
				})
			}, 6000)
		},
		methods: {
			changeIndicatorDots(e) {
				this.indicatorDots = !this.indicatorDots
			},
			changeAutoplay(e) {
				this.autoplay = !this.autoplay
			},
			intervalChange(e) {
				this.interval = e.target.value
			},
			durationChange(e) {
				this.duration = e.target.value
			},
			next() {
				uni.navigateTo({
					url: '../login/index'
				})
			}
		}
	}
</script>

<style lang="scss">
	.index {
		.next {
			border: 1px solid #CCCCCC;
			border-radius: 15px;
			width: 120rpx;
			height: 55rpx;
			line-height: 55rpx;
			text-align: center;
			font-size: 16px;
			position: absolute;
			top: 30rpx;
			right: 30rpx;
			z-index: 300;
			background-color: rgba(225, 225, 225, 0.6);
		}

		.swiper {
			height: 100vh;
			width: 100vw;
		}

		.swiper-item {
			height: 100vh;
			width: 100vw;
		}
	}
</style>
