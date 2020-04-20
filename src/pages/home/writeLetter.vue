<template>
	<view class="writeletter">
		<mynavbar :title="title" :lefticon="back" @leftEvent="Back" :righticon="'upload'" @rightEvent="send(url)"></mynavbar>
		<view class="letter-head">
			亲爱的陌生人：
		</view>
		<view class="letter-content">
			<editor id="editor" class="ql-container" placeholder="不知道写什么好？用一段有趣的开头吸引对方吧~比如讲个冷笑话,或者打个谜语给他猜~" @ready="onEditorReady"
			 @blur="blur"></editor>
		</view>
		<view class="letter-footer">
			<text>{{nickname}}</text>
			<text>{{today}}</text>
		</view>

	</view>
</template>

<script>
	import mynavbar from '../../components/navbar.vue'
	import {
		http
	} from '../../utils/index.js'

	export default {
		data() {
			return {
				title: '给TA写信',
				back: 'back',
				content: '',
				nickname: '',
				today: '',
				tosomeone:'',
				time:'',
				url:'/api/InsertLetter'
			}
		},
		components: {
			mynavbar
		},
		methods: {
			/*返回上一页*/
			Back() {
				uni.navigateBack({
					delta: 1
				})
			},
			onEditorReady() {
				uni.createSelectorQuery().select('#editor').context((res) => {
					this.editorCtx = res.context
				}).exec()
			},
			/*富文本失焦事件*/
			blur(detail) {
				this.content = detail.detail.text //输入内容
			},
			/*发出信件*/
			send(url) {
				let params = ''
				if (this.content.replace(/[\r\n]/g, "") == '') {
					uni.showToast({
						title: '忘了写内容了吗？',
						icon: 'none',
						position: 'bottom',
						duration: 2000
					})
				} else {
					uni.showModal({
						title: '提示',
						content: '确定编辑完信件了吗？',
						success: (result) => {
							if (result.confirm) {
								if(url == '/api/InsertLetter'){
									params = {
										nickname: this.nickname,
										contentery: this.content
									}
									console.log("普通信件")
								}else if(url == '/api/InsertAqtext'){
									params = {
										nickname: this.nickname,
										contentery: this.content,
										beuserid:this.tosomeone
									}
									console.log("水族箱")
								}else if(url == '/api/InsertCap'){
									params = {
										nickname: this.nickname,
										contentery: this.content,
										time:this.time
									}
									console.log(params)
								}
								http.post(url, params).then(res => {
									console.log(res)
									if (res.data == 'success') {
										uni.showToast({
											title: '你的信件已成功寄出~',
											icon: 'none',
											position: 'bottom',
											duration: 1000
										})
										setTimeout(() => {
											uni.navigateBack({
												delta: 1
											})
										}, 1000)
									} else {
										uni.showToast({
											title: '出了点差错',
											icon: 'none',
											position: 'bottom',
											duration: 2000
										})
									}
								}, err => {
									uni.showToast({
										title: '出了点差错',
										icon: 'none',
										position: 'bottom',
										duration: 2000
									})
								})
							} else if (result.cancel) {
								console.log('用户点击取消')
							}
						}
					})
				}

			},
		},
		onLoad(option) {
			this.nickname = option.nickname
			let date = new Date()
			let today = `${date.getFullYear()}.${date.getMonth()+1}.${date.getDate()}`
			this.today = today
			if(option.tosomeone){
				this.tosomeone = option.tosomeone//写给tosomeone-水族箱
				this.url = '/api/InsertAqtext'
			}
			if(option.time){
				// this.tosomeone = option.nickname//写给自己
				this.time = option.time//规定了时间-时间胶囊
				this.url = '/api/InsertCap'
			  // this.today = option.time
			}
			console.log(option)
			
		}
	}
</script>

<style lang="scss">
	.writeletter {
		height: 100vh;
		font-size: 16px;
		background: url(../../static/letterbg.jpg) no-repeat;
		background-size: 100% 100%;

		.letter-head {
			padding: 20rpx;
		}

		.letter-content {

			.ql-container {
				padding: 20rpx;
				height: 600rpx;
				font-family: 隶书;
				font-size: 18px;
			}
		}

		.letter-footer {
			height: 100rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			align-items: flex-end;
			padding: 20rpx;
			letter-spacing: 1px;
		}
	}
</style>
