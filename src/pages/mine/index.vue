<template>
	<view class="mine">
		<mynavbar :title="title"></mynavbar>

		<view class="module me-head-module">
			<view class="headimg">
				<image src="../../static/head-portrait.png" class="image"></image>
			</view>
			<view class="headinfo">
				<text style="font-size: 17px;color: #000000;">用户名username</text>
				<text style="font-size: 13px;color: #999999;">欢迎加入Tree Hole大家庭~~</text>
			</view>
			<image src="../../static/next.png" class="nexticon"></image>
		</view>

		<uni-list style="margin-bottom: 30rpx;">
			<uni-list-item title="我得到的支持" @click="clickSet" showExtraIcon="true" :extraIcon="{color: '#003300',size: '22',type: 'heart'}"></uni-list-item>
		</uni-list>
		<uni-list>
			<uni-list-item title="我送出的支持" @click="clickSet" showExtraIcon="true" :extraIcon="{color: '#003300',size: '22',type: 'star'}"></uni-list-item>
		</uni-list>
		<uni-list>
			<uni-list-item title="我的回复" @click="clickSet" showExtraIcon="true" :extraIcon="{color: '#003300',size: '22',type: 'chatbubble'}"></uni-list-item>
		</uni-list>
		<uni-list style="margin-top: 30rpx;">
			<uni-list-item title="设置" @click="clickSet" showExtraIcon="true" :extraIcon="{color: '#003300',size: '22',type: 'gear'}"></uni-list-item>
		</uni-list>
	</view>
</template>

<script>
	import mynavbar from '../../components/navbar.vue'
	import {
		uniList,
		uniListItem,
		uniIcons
	} from '@dcloudio/uni-ui'

	export default {
		data() {
			return {
				title: 'More',

			}
		},
		components: {
			mynavbar,
			uniList,
			uniListItem,
			uniIcons
		},
		methods: {
			/*点击设置*/
			clickSet() {
				console.log("点击了设置")
			},
			/*点击送出的支持*/
			clickSetsupport() {
				console.log("点击了送出的支持")
			},
			/*点击回复*/
			clickReply() {
				console.log("点击了回复")
			},
			/*点击得到的支持*/
			clickGetsupport() {
				console.log("点击了得到的支持")
			},
		}
	}
</script>

<style lang="scss">
	.mine {
		height: 100vh;
		background-color: #F5F5F5;
		color: #333333;

		.me-head-module {
			display: flex;
			justify-content: flex-start;
			align-items: center;
			position: relative;
			padding-left: 30rpx;

			.headimg {
				width: 100rpx;
				height: 100rpx;
			}

			.headinfo {
				height: 100rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				align-items: flex-start;
				margin-left: 30rpx;
			}

			.nexticon {
				width: 30rpx;
				height: 30rpx;
				position: absolute;
				right: 30rpx;
				top: 50%;
				transform: translateY(-50%);
			}
		}


	}
</style>
