<template>
	<view class="userinfo">
		<mynavbar :title="title" :lefticon="back" @leftEvent="Back"></mynavbar>
		<view class="list-item" style="margin-top: 30rpx;">
			<text style="font-size: 14px;">用户名</text>
			<text style="font-size: 13px;color:#999999;">{{userinfo.username}}</text>
		</view>
		<view class="list-item">
			<text style="font-size: 14px;">发表昵称</text>
			<text style="font-size: 13px;color:#999999;">{{userinfo.nickname}}</text>
		</view>
		<view class="list-item">
			<text style="font-size: 14px;">回复昵称</text>
			<text style="font-size: 13px;color:#999999;">{{userinfo.replynickname}}</text>
		</view>
		<view class="list-item" style="margin-top: 30rpx;">
			<text style="font-size: 14px;">性别</text>
			<text style="font-size: 13px;color:#999999;">{{userinfo.sex}}</text>
		</view>
		<view class="list-item">
			<text style="font-size: 14px;">学号</text>
			<text style="font-size: 13px;color:#999999;">{{userinfo.number}}</text>
		</view>
		<view class="list-item" style="margin-top: 30rpx;">
			<text style="font-size: 14px;">树洞数</text>
			<text style="font-size: 13px;color:#999999;">{{userinfo.topiccount}}</text>
		</view>
		<view class="list-item" style="margin-top: 30rpx;">
			<text style="font-size: 14px;">被举报数</text>
			<text style="font-size: 13px;color:#999999;">{{userinfo.violateNumber}}</text>
		</view>
		<view class="list-item">
			<text style="font-size: 14px;">注册时间</text>
			<text style="font-size: 13px;color:#999999;">{{firstday}}</text>
		</view>
	</view>
</template>

<script>
	import mynavbar from '../../components/navbar.vue'

	export default {
		data() {
			return {
				title: '我的资料',
				back: 'back',
				userinfo: '',
				firstday:'',//注册时间
			}
		},
		components: {
			mynavbar,
		},
		methods: {
			/*返回上一页*/
			Back() {
				uni.navigateBack({
					delta: 1
				})
			},
		},
		created() {
			this.userinfo = uni.getStorageSync('user')
			console.log(this.userinfo)
			let timearr = this.userinfo.registrationtime.split(' ')
			let timearr2 = timearr[0].split('/')
			this.firstday = `${timearr2[0]}年${timearr2[1]}月${timearr2[2]}日`
		},
	}
</script>

<style lang="scss">
	.userinfo {
		height: 100vh;
		background-color: #F5F5F5;
		color: #003300;

		.list-item {
			padding: 30rpx;
			background-color: #FFFFFF;
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
	}
</style>
