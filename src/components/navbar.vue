<template>
	<view class="navbar">
		<view class="mask"></view>
		<view style="height: 30rpx;width:100%;position: fixed;top: 0;background-color: #FFFFFF;z-index: 999;"></view>
		<view class="main">
			<view class="nav-left" @click="leftEvent">
				<view class="nav-left-icon" v-if="lefticon">
					<uni-icons :type="lefticon" size="24"></uni-icons>
				</view>
				<view class="nav-left-words" v-if="leftwords">
					{{leftwords}}
				</view>
			</view>
			<view class="nav-title">
				<view class="nav-title-words">
					{{title}}
				</view>
			</view>
			<view class="nav-right" @click="rightEvent">
				<view class="nav-right-words" v-if="rightwords">
					{{rightwords}}
				</view>
				<view class="nav-right-icon" v-if="righticon">
					<uni-icons :type="righticon" size="24"></uni-icons>
				</view>
			</view>
		</view>


	</view>
</template>

<script>
	import {
		uniIcons,
	} from '@dcloudio/uni-ui'
	export default {
		data() {
			return {
				// lefticon: 'back',
				// righticon: 'back',
				// leftwords: '123',
				// title: '123',
				// rightwords: '123'
			}
		},
		props: {
			lefticon: {
				type: String,
				required: false
			},
			leftwords: {
				type: String,
				required: false
			},
			title: {
				type: String,
				required: false
			},
			righticon: {
				type: String,
				required: false
			},
			rightwords: {
				type: String,
				required: false
			}
		},
		components: {
			uniIcons,
		},
		methods: {
			leftEvent() {
				this.$emit('leftEvent')
			},
			rightEvent() {
				this.$emit('rightEvent')
			},
		}
	}
</script>

<style lang="scss">
	.navbar{
		background-color: #FFFFFF;
		.mask{
			width: 100%;
			height: 118rpx;
			background-color: #FFFFFF;
		}
		.main {
			width: 100%;
			height: 88rpx;
			border-bottom: 1px solid #c8c7cc;
			display: flex;
			justify-content: space-between;
			align-items: center;
			position: fixed;
			top: 30rpx;
			z-index: 999;
			background-color: #FFFFFF;
		
			.nav-left,
			.nav-title,
			.nav-right {
				height: 100%;
				display: flex;
				align-items: center;
				font-size: 16px;
			}
		
			.nav-left {
				width: 20%;
				justify-content: flex-start;
				margin-left: 10rpx;
			}
		
			.nav-title {
				width: 60%;
				justify-content: center;
			}
		
			.nav-right {
				width: 20%;
				justify-content: flex-end;
				margin-right: 10rpx;
			}
		}
	}
	
</style>
