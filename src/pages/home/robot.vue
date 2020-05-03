<template>
	<view class="robot">
		<mynavbar :title="title" :lefticon="'back'" @leftEvent="Back"></mynavbar>
		<scroll-view :scroll-top="scrollTop" scroll-y="true" @scrolltoupper="upper" @scrolltolower="lower" @scroll="scroll" 
		style="background-color: #f5f5f5;padding-bottom: 100rpx;height:100vh;transition: height 0.3s;padding-top: 59px;box-sizing: border-box;" class="scrollview">
			
			<view class="conversation" v-for="(item,index) in dialoguearr" :key="index">
				<view class="send" v-if="item.mysend">
					<text class="sendtime">
						{{item.mysendtime}}
					</text>
					<view class="sendcontent">
						<view class="sendtriangle"></view>
						{{item.mysend}}
					</view>
				</view>
				<view class="received" v-if="item.myreceived">
					<text class="rectime">
						{{item.myrectime}}
					</text>
					<view class="reccontent">
						<view class="rectriangle"></view>
						{{item.myreceived}}
					</view>
				</view>

			</view>
		</scroll-view>
		<view class="reply">
			<input type="text" placeholder="请输入..." disabled="disabled" @click="post" class="replyinput"/>
			<button type="default" disabled="disabled" class="sendbtn">发送</button>
		</view>
		<ygc-comment ref="ygcComment" :placeholder="'请输入...'" :btnword="'发送'" @pubComment="send" ></ygc-comment>
	</view>
</template>

<script>
	import mynavbar from '../../components/navbar.vue'
	import {
		http
	} from '../../utils/index.js'
	import ygcComment from '../../components/ygc-comment.vue'

	export default {
		data() {
			return {
				title: '专属机器人',
				nickname: '',
				sendvalue: '',
				dialoguearr: [],
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				inputvalue:'',
			}
		},
		components: {
			mynavbar,
			ygcComment
		},
		methods: {
			/*返回上一页*/
			Back() {
				uni.navigateBack({
					delta: 1
				})
			},
			send(value) {
				console.log(value)
				this.$refs.ygcComment.toggleMask('close')
				let date = new Date()
				let yy1 = date.getFullYear()
				let mm1 = (date.getMonth() + 1).toString()
				let dd1 = (date.getDate()).toString()
				let hour1 = (date.getHours()).toString()
				let munite1 = (date.getMinutes()).toString()
				let second1 = (date.getSeconds()).toString()
				console.log(typeof yy1)
				mm1=mm1.padStart(2,'0')
				dd1=dd1.padStart(2,'0')
				hour1 = hour1.padStart(2,'0')
				munite1 = munite1.padStart(2,'0')
				second1 = second1.padStart(2,'0')
				let nowsendtime = `${yy1}-${mm1}-${dd1} ${hour1}:${munite1}:${second1}`
				this.dialoguearr.push({
					mysendtime: nowsendtime,
					mysend: value,
				})
				console.log(value)
				this.scrollTop = this.scrollTop + 100
				setTimeout(()=> {
					uni.request({
						url: `http://www.tuling123.com/openapi/api?key=ea5857afeaa1434f8fccb51991e12eff&info=${value}`,
						success: (res) => {
							let yy = date.getFullYear()
							let mm = (date.getMonth() + 1).toString()
							let dd = (date.getDate()).toString()
							let hour = (date.getHours()).toString()
							let munite = (date.getMinutes()).toString()
							let second = (date.getSeconds()).toString()
							mm=mm.padStart(2,'0')
							dd=dd.padStart(2,'0')
							hour = hour.padStart(2,'0')
							munite = munite.padStart(2,'0')
							second = second.padStart(2,'0')
							let nowrectime = `${yy}-${mm}-${dd} ${hour}:${munite}:${second}`
							console.log(res.data.text)
							this.dialoguearr.push({
								myrectime: nowrectime,
								myreceived: res.data.text
							})
							console.log(this.dialoguearr)
							this.scrollTop = this.scrollTop + 100
							// console.log(this.scrollTop)
						}
					})
				},1000)
			},
			upper: function(e) {
				console.log(e)
			},
			lower: function(e) {
				console.log(e)
				
			},
			scroll: function(e) {
				console.log(e)
				this.old.scrollTop = e.detail.scrollTop
			},
			post(){
				this.$refs.ygcComment.toggleMask('show')
			}
		},
		onLoad(option) {
			this.nickname = option.nickname
			console.log(this.nickname)
			let date = new Date()


			uni.request({
				url: `http://www.tuling123.com/openapi/api?key=ea5857afeaa1434f8fccb51991e12eff&info=${this.inputvalue}`,
				success: (res) => {
					let yy = date.getFullYear()
					let mm = (date.getMonth() + 1).toString()
					let dd = (date.getDate()).toString()
					let hour = (date.getHours()).toString()
					let munite = (date.getMinutes()).toString()
					let second = (date.getSeconds()).toString()
					mm=mm.padStart(2,'0')
					dd=dd.padStart(2,'0')
					hour = hour.padStart(2,'0')
					munite = munite.padStart(2,'0')
					second = second.padStart(2,'0')
					let nowrectime = `${yy}-${mm}-${dd} ${hour}:${munite}:${second}`
					console.log(res.data.text)
					this.dialoguearr.push({
						mysendtime: '',
						mysend: '',
						myrectime: nowrectime,
						myreceived: res.data.text
					})

				}
			})
		},
		onShow() {
			
		}

	}
</script>

<style lang="scss">
	$height : 100rpx;
	.robot {
		background-color: #f5f5f5;
		// background-color: red;
		height: 100vh;
		font-size: 14px;
		
		.scrollview{
			height : calc(100vh- $height)
		}

		.conversation{
			padding-top: 20rpx;
		}
		.send,
		.received {
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
		}

		.received {
			margin-bottom: 20rpx;

			.rectime {
				background: rgba(3, 3, 3, 0.2);
				color: #FFFFFF;
				border-radius: 3px;
				text-align: center;
				font-size: 12px;
				width: 260rpx;
				align-self: center;
			}

			.reccontent {
				padding: 15rpx 25rpx;
				border-radius: 10px;
				background-color: #009926;
				max-width: 320rpx;
				align-self: flex-start;
				text-align:justify;
				word-wrap: break-word;
				margin-top: 20rpx;
				margin-left:40rpx ;
				position: relative;
				.rectriangle{
					position: absolute;
					top: 10px;
					left: -28rpx;
					border-top: 15rpx solid transparent;
					border-bottom: 15rpx solid transparent;
					border-right: 15rpx solid #009926;
					border-left: 15rpx solid transparent;
				}
			}
		}

		.send {
			margin-bottom: 20rpx;

			.sendtime {
				background: rgba(3, 3, 3, 0.2);
				color: #FFFFFF;
				border-radius: 5px;
				text-align: center;
				font-size: 12px;
				width: 260rpx;
				align-self: center;
			}

			.sendcontent {
				padding: 15rpx 25rpx;
				border-radius: 10px;
				background-color: #ffffff;
				max-width: 320rpx;
				align-self: flex-end;
				margin-top: 20rpx;
				text-align:justify;
				 word-wrap: break-word;
				margin-right:40rpx ;
				position: relative;
				.sendtriangle{
					position: absolute;
					top: 10px;
					right: -28rpx;
					border-top: 15rpx solid transparent;
					border-bottom: 15rpx solid transparent;
					border-right: 15rpx solid transparent;
					border-left: 15rpx solid #ffffff;
				}
			}
		}
		
		.reply{
			height: $height;
			width: 100vw;
			background-color: #f5f5f5;
			border-top: 1px solid #CCCCCC;
			position: fixed;
			bottom: 0;
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 14px;
			
			.replyinput{
				width: 70%;
				height: 80rpx;
				background-color: #FFFFFF;
				border-radius: 10px;
				margin-left: 25rpx;
				padding: 0 20rpx;
				box-sizing: border-box;
				border: 1px solid #EEEEEE;
			}
			
			.sendbtn{
				width: 20%;
				height: 80rpx;
				line-height: 80rpx;
				background-color: #9aa0a3;
				color: #FFFFFF;
				border: 1px solid #EEEEEE;
			}
			
		}
	}
</style>
