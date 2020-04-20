<template>
	<view class="details">
		<mynavbar :title="title" :lefticon="back" :rightwords="rightwords" @leftEvent="Back" @rightEvent="report"></mynavbar>
		<view class="mid">
			<view class="main-details">
				<view class="top">
					<view class="headimg">
						<image src="../../static/head-portrait.png" class="image"></image>
					</view>
					<view class="info">
						<text class="info-name">{{detailinfo.nickName}}</text>
						<text class="info-time">{{detailinfo.time}}</text>
					</view>
					<!-- <uni-fav :checked="checked" class="supportbtn" circle="true" bg-color="#EEEEEE" bg-color-checked="#EF5656"
					 :content-text='contenttext' @click="onClick"></uni-fav> -->
				</view>

				<view class="content">
					<text class="content-title">标题：{{detailinfo.title}}</text>
					<text class="content-contentery" v-html="detailinfo.contentery"></text>
				</view>
			</view>

			<view class="reply">
				<text style="font-size: 15px;">评论 {{detailinfo.replyCount}}</text>
				<view style="font-size: 12px;text-align: center;color: #999999;" >
					你无法查看别人发表的评论哦
				</view>
				<view class="all-reply" v-if="allreply.length>0">
					<view class="reply-item" v-for="(item,index) in allreply" :key="index">
						<view class="headimg">
							<image src="../../static/head-portrait.png" class="image"></image>
						</view>
						<view class="reply-content">
							<text style="font-size: 12px;color: #999999;">{{item.replyNickName}}</text>
							<text style="font-size: 14px;color: #000000;">{{item.reContentery}}</text>
							<text class="time">{{item.time}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<ygc-comment ref="ygcComment" :placeholder="'发布评论'" :btnword="'发布'" @pubComment="pubComment"></ygc-comment>
		
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
		uniFav,uniPopup 
	} from '@dcloudio/uni-ui'
	import {
		http
	} from '../../utils/index.js'
	import calculateTime from '../../utils/calculateTime.js'
	import ygcComment from '../../components/ygc-comment.vue'

	export default {
		data() {
			return {
				title: '正文详情',
				back: 'back',
				rightwords:'举报',
				detailinfo: '',
				checked: false, //是否支持
				contenttext: {
					contentDefault: '支持',
					contentFav: '已支持'
				},
				allreply: '', //当前所有评论
				mynickname:'',//我的回复昵称
				ittopicid:'',//当前树洞ID
				self:false,//是否是本人查看
			}
		},
		components: {
			mynavbar,
			uniFav,
			uniPopup ,
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
			report(){
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
			/*切换支持*/
			onClick() {
				this.checked = !this.checked
			},
			/*发表评论*/
			reply(){
				this.$refs.ygcComment.toggleMask('show')
				console.log('评论')
			},
			pubComment(value){
				http.post('/api/InsertReply',{nickname:this.mynickname,topicid:this.ittopicid,replycontentery:value}).then(res => {
					if(res.data == 'success'){
						uni.showToast({
							title: '评论成功',
							icon: 'none',
							position: 'bottom',
							duration: 1500
						})
						this.$refs.ygcComment.toggleMask()
						this.allreply.push({
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
			this.ittopicid = option.topicid
			this.mynickname = option.mynickname
			console.log(option.mynickname)
			http.post('/api/ReplyDetails', {
				nickname: option.mynickname,
				topicid: option.topicid
			}).then(res => {
				console.log(res.data) //我发表的评论
				this.allreply = res.data
				res.data.forEach(item => {
					let timearr = item.createdOn.split(' ')
					let time = calculateTime.calculateTime(timearr[0], timearr[1], '/', ':')
					item.time = time
				})
			},err => {
				console.log(err)
			})
		},
		created() {
			this.detailinfo = uni.getStorageSync('topicdetail')
			console.log(this.detailinfo)
			console.log(2)
		},
	}
</script>

<style lang="scss">
	.details {
		background-color: #F5F5F5;
		height: 100vh;

		.main-details {
			margin: 20rpx 0;
			padding: 20rpx;
			box-sizing: border-box;
			background-color: #FFFFFF;
			box-sizing: border-box;
		}

		.top {
			width: 100%;
			height: 100rpx;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			position: relative;

			.headimg {
				width: 100rpx;
				height: 100rpx;
			}

			.info {
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				align-items: flex-start;
				margin-left: 15rpx;

				.info-name {
					color: #003300;
					font-size: 15px;
					font-weight: 800;
				}

				.info-time {
					color: #999999;
					font-size: 12px;
				}
			}

			.supportbtn {
				position: absolute;
				top: 50%;
				right: 20rpx;
				transform: translateY(-50%);
			}
		}

		.content {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			justify-content: flex-start;

			.content-title {
				font-size: 18px;
				color: #003300;
				margin-top: 20rpx;
			}

			.content-contentery {
				font-size: 13px;
				color: #000000;
				margin-top: 20rpx;
			}
		}

		.reply {
			width: 100%;
			background-color: #FFFFFF;
			font-size: 15px;
			padding: 20rpx;
			box-sizing: border-box;

			.all-reply {
				border-top: 1px solid #cccccc;
				width: 100%;
				margin-top: 20rpx;
				border-bottom: 1px solid #cccccc;
				padding-bottom: 20rpx;
			}

			.reply-item {
				width: 100%;
				display: flex;
				justify-content: flex-start;
				align-items: flex-start;
				margin-top: 20rpx;
				position: relative;

				.headimg {
					width: 60rpx;
					height: 60rpx;
				}

				.reply-content {
					padding-left: 15rpx;
					margin-left: 15rpx;
					box-sizing: border-box;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					align-items: flex-start;
					border-left: 2px solid #C0C0C0;

					.time {
						position: absolute;
						right: 0rpx;
						bottom: 0rpx;
						font-size: 12px;
						color: #999999;
					}
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

		.mid {
			margin-bottom: 100rpx;
			
		}
		
		.publish-reply{
			height: 500rpx;
			width: 100%;
			border: 1px solid red;
			background-color: #FFFFFF;
			.reply-input{
				border-radius: 10px;
				background-color: #F5F5F5;
				padding: 30rpx;
				box-sizing: border-box;
				height: 100%;
			}
		}
	}
</style>
