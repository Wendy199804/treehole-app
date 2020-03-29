<template>
	<view class="noname-details">
		<mynavbar :title="title" :lefticon="back" :rightwords="rightwords" @leftEvent="Back" @rightEvent="report"></mynavbar>

		<view class="content">
			<text style="color: #003300;font-weight: 800;">{{thistopic.title}}</text>
			<view class="main-content" v-html="thistopic.contentery"></view>
			<view class="bottom-msg">
				<text style="color: #999999;">匿名过客</text>
				<text style="color: #999999;">{{thistime}}</text>
			</view>
		</view>
		<view class="tip">
			<text>共有{{thisreply.length}}条回复</text>
		</view>
		<!-- <view style="font-size: 12px;text-align: center;color: #999999;margin-bottom: 20rpx;" >
			你无法查看别人发表的评论哦
		</view> -->
		<view class="all-rep">
			<view class="the-reply" v-for="(item,index) in thisreply" :key="index">
				<view class="headimg">
					<image src="../../static/head-portrait.png" class="image"></image>
				</view>
				<view class="rep-info">
					<view class="">
						<text>{{item.replyNickName}}</text>
					</view>
					<view class="" style="margin: 20rpx 0;">
						<text>{{item.reContentery}}</text>
					</view>
					<view class="">
						<text style="color: #999999;font-size: 12px;">{{item.time}}</text>
					</view>
				</view>
			</view>
		</view>
		
		<ygc-comment ref="ygcComment" :placeholder="'发布评论'" @pubComment="pubComment"></ygc-comment>
		
		<view class="reply-func">
			<view class="rep" @click="reply">
				<image src="../../static/reply.png" class="img"></image>
				<text class="text">评论</text>
			</view>
			<view class="write" @click="write">
				给TA写信
			</view>
		</view>
	</view>
</template>

<script>
	import mynavbar from '../../components/navbar.vue'
	import {
		http
	} from '../../utils/index.js'
	import ygcComment from '../../components/ygc-comment.vue'
	import calculateTime from '../../utils/calculateTime.js'

	export default {
		data() {
			return {
				title: '树洞详情',
				back: 'back',
				rightwords: '举报',
				thistopic: '',
				thisreply: '',
				thistime:'',
				topicid:'',
				mynickname:''
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
			/*举报*/
			report() {
				uni.showModal({
				    title: '提示',
				    content: '确认举报这条树洞吗？',
				    success: function (res) {
				        if (res.confirm) {
				            console.log('用户点击确定');
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				})
			},
			/*发表评论*/
			reply(){
				this.$refs.ygcComment.toggleMask('show')
				console.log('评论')
			},
			/*回复*/
			pubComment(value){
				console.log({nickname:this.mynickname,topicid:this.ittopicid,replycontentery:value})
				http.post('/api/InsertReply',{nickname:this.mynickname,topicid:this.topicid,replycontentery:value}).then(res => {
					if(res.data == 'success'){
						uni.showToast({
							title: '评论成功',
							icon: 'none',
							position: 'bottom',
							duration: 1500
						})
						this.$refs.ygcComment.toggleMask()
						this.thisreply.push({
							replyNickName:this.mynickname,
							reContentery:value,
							time:'刚刚'
						})
					}
				},err => {
					console.log(err)
				})
			},
			/*写信*/
			write(){
				console.log('写信')
			}
		},
		onLoad(option) {
			this.topicid=option.topicid
			this.mynickname=option.mynickname
			console.log(option.topicid)
			http.post('/api/TreeDetails', {
				topicid: option.topicid
			}).then(res => {
				console.log(res.data[0])
				this.thistopic = res.data[0]
				let timearr = res.data[0].time.split(' ')
				let timearr1 = timearr[0].split('/').join('-') // yy-mm-dd
				let timearr2 = timearr[1].split(':').splice(0, 2).join(':') //hh:mm
				let time = [timearr1, timearr2].join(' ')
				this.thistime = time
			})
			http.post('/api/ReplyDetails', {
				topicid: option.topicid,
				nickname: option.mynickname
			}).then(res => {
				console.log(res.data)
				res.data.forEach(item => {
					let timearr = item.createdOn.split(' ')
					let time = calculateTime.calculateTime(timearr[0], timearr[1], '/', ':')
					item.time = time
				})
				this.thisreply = res.data
			})
		},
		onShow() {
			uni.showToast({
				title: '你无法查看别人发表的评论哦',
				icon: 'none',
				position: 'bottom',
				duration: 2000
			})
		}


	}
</script>

<style lang="scss">
	.noname-details {
		background-color: #f5f5f5;
		
		.content{
			width: 100%;
			padding: 20rpx;
			box-sizing: border-box;
			background-color: #FFFFFF;
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			justify-content: flex-start;
			font-size: 13px;
			color:#222222;
			.main-content{
				width: 100%;
				margin: 20rpx 0;
			}
			.bottom-msg{
				width: 100%;
				display: flex;
				justify-content: space-between;
				font-size: 12px;
			}
		}
		
		.tip{
			color: #999999;
			font-size: 12px;
			text-align: left;
			padding: 14rpx 20rpx;
		}
		.all-rep{
			background-color: #FFFFFF;
			.the-reply{
				padding: 20rpx;
				box-sizing: border-box;
				width: 100%;
				display: flex;
				justify-content: flex-start;
				align-items: flex-start;
				border-bottom: 1px solid #C0C0C0;
				
				.headimg{
					width: 60rpx;
					height: 60rpx;
					margin-right: 20rpx;
				}
				
				.rep-info{
					font-size: 13px;
					color: #222222;
				}
			}
		}
		.reply-func {
			width: 100%;
			height: 100rpx;
			background-color: #FFFFFF;
			border-top: 1px solid #C0C0C0;
			position: fixed;
			bottom: 0;
			z-index: 99;
			display: flex;
			justify-content: center;
			align-items: center;
				color: #003300;
				.rep{
					border-right: 1px solid #C0C0C0;
				}
			.rep,.write{
				width: 50%;
				font-size: 16px;
				display: flex;
			justify-content: center;
			align-items: center;
			}
			.img{
				width: 20px;
				height: 20px;
			}
			.text{
				margin-top: -3px;
				margin-left: 15rpx;
			}
		}
	}
</style>
