<template>
	<view class="setting">
		<mynavbar :title="title" :lefticon="back" @leftEvent="Back"></mynavbar>
		<uni-list style="margin-bottom: 30rpx;margin-top: 30rpx;">
			<uni-list-item title="修改密码" @click="changeSecret"></uni-list-item>
		</uni-list>
		<uni-list style="margin-bottom: 30rpx;">
			<uni-list-item title="退出登录" @click="exit"></uni-list-item>
		</uni-list>
		<uni-popup ref="popup" type="center">
			<view class="changeSecret">
				<input type="password" v-model="oldpsw" placeholder="请输入原密码.." class="changeSecret-input" />
				<input type="password" v-model="newpsw" placeholder="请输入新密码.." class="changeSecret-input" />
				<input type="password" v-model="checkpsw" placeholder="请确认密码.." class="changeSecret-input" />
				<button type="default" @click="confirm" style="width: 60%;background-color: #993333;font-weight: 800;color: #FFFFFF;">确定</button>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import mynavbar from '../../components/navbar.vue'
	import {
		uniList,
		uniListItem,
		uniIcons,
		uniPopup
	} from '@dcloudio/uni-ui'
	import {
		http
	} from '../../utils/index.js'


	export default {
		data() {
			return {
				title: '设置',
				back: 'back',
				oldpsw: '',
				newpsw: '',
				checkpsw: '',
				nickname: ''
			}
		},
		components: {
			mynavbar,
			uniList,
			uniListItem,
			uniIcons,
			uniPopup
		},
		methods: {
			/*返回上一页*/
			Back() {
				uni.navigateBack({
					delta: 1
				})
			},
			/*修改密码*/
			changeSecret() {
				this.$refs.popup.open()
			},
			/*退出*/
			exit() {
				uni.showModal({
					title: '提示',
					content: '确定退出登录吗？',
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
							 uni.removeStorageSync('logintime');
							 uni.removeStorageSync('user');
							 uni.reLaunch({
							     url: '../login/index'
							 });
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})
			},
			/*点击确认密码*/
			confirm() {
				if (this.oldpsw === '' || this.newpsw === '' || this.checkpsw === '') {
					uni.showToast({
						title: '请填写完整',
						icon: 'none',
						position: 'bottom',
						duration: 1500
					})
				} else {
					if (this.newpsw !== this.checkpsw) {
						uni.showToast({
							title: '两次密码不同',
							icon: 'none',
							position: 'bottom',
							duration: 1500
						})
					} else {
						uni.showModal({
							title: '提示',
							content: '修改密码是不可逆操作，确定修改吗？',
							success: function(res) {
								if (res.confirm) {
									http.post('api/ResetPass', {
										nickname: this.nickname,
										assword: this.oldpsw,
										conpassword: this.newpsw
									}).then(res => {
										if (res.data === 'success') {
											uni.showToast({
												title: `修改成功！你的新密码是：${this.newpsw}`,
												icon: 'none',
												position: 'bottom',
												duration: 2000
											})
										} else {
											uni.showToast({
												title: `未知错误，修改失败`,
												icon: 'none',
												position: 'bottom',
												duration: 2000
											})
										}
									})
								} else if (res.cancel) {
									console.log('用户点击取消');
								}
							}
						})
					}

				}

			},
		},
		onLoad(option) {
			this.nickname = option.nickname
		}
	}
</script>

<style lang="scss">
	.setting {
		background-color: #f5f5f5;
		height: 100vh;

		.changeSecret {
			width: 550rpx;
			background-color: #FFFFFF;
			padding: 50rpx 30rpx;
			border-radius: 5px;

		}

		.changeSecret-input {
			width: 100%;
			height: 60rpx;
			padding-left: 20rpx;
			border: 1px solid #C0C0C0;
			margin-bottom: 40rpx;
			box-sizing: border-box;
			border-radius: 10px;
		}
	}
</style>
