<template>
	<view class="login">
		<image src="../../static/logo.png" class="main-icon"></image>
		<view class="input-group">
			<input type="text" v-model="username" placeholder="请输入姓名.." class="username-input" placeholder-class="in-pla" />
			<input type="number" v-model="studentid" placeholder="请输入学号.." class="stdid-input" placeholder-class="in-pla" />
			<input password="true" v-model="password" placeholder="请输入密码.." class="psw-input" placeholder-class="in-pla" />
		</view>
		<button type="default" class="loginbtn" @click="login">登录</button>
		<view class="tips">
			<text>没有账号？前往</text>
			<navigator url="./sign" class="a">注册</navigator>
		</view>
		<text class="watermark">From Mao Wennv ®</text>
		<slider-verify :isShow="sliderVerifyFLag" @touchSliderResult="verifyResult" ref="verifyElement"></slider-verify>
	</view>
</template>

<script>
	import {
		http
	} from '../../utils/index.js'
	import {
		uniPopup
	} from '@dcloudio/uni-ui'
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import sliderVerify from '../../components/slider-verify.vue'

	export default {
		data() {
			return {
				username: '',
				studentid: '',
				password: '',
				logintime:'',
				sliderVerifyFLag: false //滑块验证
			}
		},
		components: {
			uniPopup,
			'slider-verify': sliderVerify
		},
		methods: {
			login() {
				if (this.username === '' || this.studentid === '' || this.password === '') {
					uni.showToast({
						title: '请把登录信息填写完整',
						icon: 'none',
						position: 'bottom',
						duration: 1500
					})
				} else {
					this.sliderVerifyFLag = true
					
				}

			},
			 // 滑块验证结果回调函数
			        verifyResult(res) {
			            this.sliderVerifyFLag = false;
			
			            if (res) {  //校验通过
									console.log("校验通过")
									let data = {
										username: this.username,
										password: this.password,
										number: this.studentid,
										enable: '普通用户'
									}
									this.$store.dispatch('login_asyn', data)
									uni.setStorage({
										key: 'logintime',
										data: this.logintime
									})
			            }else{
			                // 校验失败,点击关闭按钮
											console.log("校验失败")
			            }
			        },
		},
		mounted() {


		},
		created() {
			let stup = 86400000 * 3 //三天
			let date = new Date()
			let logintime = date.getTime()
			this.logintime = logintime
			if (uni.getStorageSync('user')) {
				//以前登录过
				console.log('以前登录过')
				if (logintime - uni.getStorageSync('logintime') > stup) {
					//重新登录
					console.log('重新登录')
				} else {
					//无需登录
					console.log('无需登录')
					uni.switchTab({
						url: '../home/index'
					})
				}
			} else {
				//没有登录过
				//要登录
				console.log('第一次登录')
			}
		}

	}
</script>

<style lang="scss">
	.login {
		height: 100vh;
		width: 100vw;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		padding-top: 50rpx;
		box-sizing: border-box;
		background-color: #f5f5f5;
		position: relative;

		.main-icon {
			width: 400rpx;
			height: 400rpx;
		}

		.input-group {

			.stdid-input,
			.username-input,
			.psw-input {
				border-bottom: 1px solid #65320B;
				margin-bottom: 60rpx;
				width: 600rpx
			}
		}

		.loginbtn {
			background-color: #CC9999;
			width: 600rpx
		}

		.tips {
			font-size: 12px;
			margin-top: 30rpx;
			display: flex;
			justify-content: center;

			.a {
				text-decoration: underline;
				font-weight: blod;
			}
		}

		.popup {
			background-color: #FFFFFF;
			padding: 40rpx 60rpx;
			border-radius: 10px;
		}
	}
</style>
