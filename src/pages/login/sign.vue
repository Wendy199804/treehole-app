<template>
	<view class="sign">
		<!-- <uni-nav-bar left-icon="back" title="注册 Tree Hole 账号" fixed="true" class="nav" @clickLeft="back"></uni-nav-bar> -->
		<mynavbar :title=title :lefticon="lefticon" @leftEvent="leftEvent"></mynavbar>
		<uni-popup ref="popup" type="center">
			<view class="popup">
				<text class="title">⚠注册需知</text>
				<text class="item">🔺姓名、发表昵称、回复昵称，都是最大长度为8个字符，且内容仅限中文、数字、英文大小写字母，不允许出现任何符号</text>
				<text class="item">🔺姓名为你的用户名，仅用于登录，可与他人重复</text>
				<text class="item">🔺发表昵称指的是在本APP中特定的、仅用于写信与发表树洞的他人可见昵称，不得与其他人重复。如果注册失败可能是因为昵称重复</text>
				<text class="item">🔺回复昵称指的是在本APP中特定的、仅用于评论他人树洞的昵称，可与他人重复</text>
				<text class="item">🔺学号为全数字，不得与他人重复</text>
			</view>
		</uni-popup>
		<view class="input-group">
			<image src="../../static/logo.png" class="logo"></image>
			<uni-icons type="help-filled" size="30" class="help" color="#CC9999" @click="help"></uni-icons>
			<view class="inpt">
				<view class="label">请输入姓名</view>
				<input type="text" placeholder="...最大长度8" maxlength="8" v-model="username" @blur="validation(username,'姓名只能由中文/英文/数字组成','text','username')" />
			</view>
			<view class="inpt">
				<view class="label">发表昵称</view>
				<input type="text" placeholder="...最大长度8" maxlength="8" v-model="nickname" @blur="validation(nickname,'发表昵称只能由中文/英文/数字组成','text','nickname')" />
			</view>
			<view class="inpt">
				<view class="label">回复昵称</view>
				<input type="text" placeholder="...最大长度8" maxlength="8" v-model="replyname" @blur="validation(replyname,'回复昵称只能由中文/英文/数字组成','text','replyname')" />
			</view>
			<view class="inpt">
				<view class="label">请输入学号</view>
				<input type="number" placeholder="..." v-model="studentid" @blur="validation(replyname,'学号只能由数字组成','number')" />
			</view>
			<view class="inpt" style="margin-top:40rpx">
				<uni-combox label="请选择性别" :candidates="candidates" placeholder="..." v-model="sex"></uni-combox>
			</view>
			<view class="inpt">
				<view class="label">请输入密码</view>
				<input type="password" placeholder="...最大长度18" maxlength="18" v-model="password" @blur="validation(password,'密码太长','password')" />
			</view>
			<view class="inpt">
				<view class="label">请确认密码</view>
				<input type="password" placeholder="...最大长度18" maxlength="18" v-model="password2" @blur="checkPsw" />
			</view>
			<button type="default" class="signbtn" @click="sign">注册</button>
		</view>
		
	</view>
</template>

<script>
	import {
		uniNavBar,
		uniCombox,
		uniIcons,
		uniPopup
	} from '@dcloudio/uni-ui'
	import {http} from '../../utils/index.js'
	import mynavbar from '../../components/navbar.vue'

	export default {
		data() {
			return {
				candidates: ['女', '男','不详'],
				username: '',
				nickname: '',
				replyname: '',
				studentid: '',
				sex: '',
				password: '',
				password2: '',
				usernamecheck: false,
				nicknamecheck: false,
				replynamecheck: false,
				studentidcheck: false,
				passwordcheck: false,
				sexcheck:false,
				title:"注册 Tree Hole 账号",
				lefticon:"back"
			}
		},
		components: {
			uniNavBar,
			uniCombox,
			uniIcons,
			uniPopup,
			mynavbar
		},
		methods: {
			/*返回*/
			leftEvent(){
				uni.navigateBack({
					delta: 1
				})
			},
			/*昵称/学号/密码-验证*/
			validation(obj, tip, type, content) {
				let username_reg = /^[\u4E00-\u9FA50-9a-zA-Z]*$/
				let num_reg = /^[0-9]*$/
				if (type == "text") {
					if (!username_reg.test(obj)) {
						uni.showToast({
							title: tip,
							icon: 'none',
							position: 'bottom',
							duration: 2000
						})
					} else {
						if (content == 'username') {
							this.usernamecheck = true
						} else if (content == 'nickname') {
							this.nicknamecheck = true
						} else if (content == 'replyname') {
							this.replynamecheck = true
						}
					}
				} else if (type == "number") {
					if (!num_reg.test(obj)) {
						uni.showToast({
							title: tip,
							icon: 'none',
							position: 'bottom',
							duration: 2000
						})
					} else {
						this.studentidcheck = true
					}
				} else if (type == "password") {
					if (obj.length > 18) {
						uni.showToast({
							title: tip,
							icon: 'none',
							position: 'bottom',
							duration: 2000
						})
					}
				}
			},
			/*确认密码*/
			checkPsw() {
				if (this.password !== this.password2) {
					uni.showToast({
						title: '密码不一致',
						icon: 'none',
						position: 'bottom',
						duration: 2000
					})
				} else {
					this.passwordcheck = true
				}
			},
			/*注册*/
			sign() {
				if (this.username == '' || this.nickname == '' || this.replyname == '' || this.studentid == '' || this.password ==
					'' || this.password2 == '') {
					uni.showToast({
						title: '请填写完整',
						icon: 'none',
						position: 'bottom',
						duration: 2000
					})
				} else {
					if (this.usernamecheck && this.nicknamecheck && this.replynamecheck && this.studentidcheck && this.passwordcheck) {
						if(this.sex=='女'||this.sex=='男'||this.sex=='不详'){
							//合法
							let params = {
								username:this.username,
								nickname:this.nickname,
								replynickname:this.replyname,
								number:this.studentid,
								password:this.password,
								sex:this.sex
							}
							http.post('/api/insertUser',params).then(res => {
								if(res.data == 'success'){
									uni.showToast({
										title: '注册成功，请前往登录',
										icon: 'none',
										position: 'bottom',
										duration: 1500
									})
									setTimeout(()=>{
										uni.reLaunch({
										    url: './index'
										});
									},1500)
								}
							})
						}else{
							uni.showToast({
								title: '无法识别你的性别',
								icon: 'none',
								position: 'bottom',
								duration: 2000
							})
						}
					} else {
						uni.showToast({
							title: '注册信息不合法，请仔细阅读注册规则',
							icon: 'none',
							position: 'bottom',
							duration: 2000
						})
					}
				}
			},
			/*帮助*/
			help() {
				this.$refs.popup.open()
			},
		},
	}
</script>

<style lang="scss">
	.sign {
		.logo {
			width: 150rpx;
			height: 150rpx;
		}

		.input-group {
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			align-items: center;
			padding-top: 20rpx;
			position: relative;

			.label {
				color: #999999;
				font-size: 16px;
				width: 180rpx;
			}

			.inpt {
				width: 600rpx;
				margin-top: 60rpx;
				display: flex;
				justify-content: flex-start;
			}

			.signbtn {
				width: 600rpx;
				background-color: #CCCC99;
				border-radius: 10px;
				margin-top: 60rpx;
			}

			.help {
				position: absolute;
				top: 20rpx;
				left: 20rpx;

			}
		}
		.popup {
			width: 500rpx;
			padding: 40rpx 60rpx;
			border-radius: 20rpx;
			background-color: #FFFFFF;
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			justify-content: flex-start;
		
			.title {
				font-size: 20px;
			}
		
			.item {
				font-size: 13px;
				margin-top: 30rpx;
			}
		}
		.nav{
			width: 100vw;
		}
		uni-view.uni-navbar__content.uni-navbar--fixed.uni-navbar--border,.uni-navbar--fixed[data-v-4e85c420],.uni-navbar__content[data-v-4e85c420] {
			width: 100%;
		}
		
	}
</style>
