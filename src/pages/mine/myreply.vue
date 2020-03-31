<template>
	<view class="myreply">
		<mynavbar :title="title" :lefticon="back" @leftEvent="Back"></mynavbar>
		<view class="" v-if="myreplyList.length == 0" style="text-align: center;color: #999999;font-size: 12px;">
			阁下还没有对任何树洞进行评论哦~
		</view>

		<view class="content" v-if="myreplyList.length>0">

			<view class="repitem" v-for="(item,index) in myreplyList" :key="index">
				<view class="left">
					<view class="repobj">
						<text style="color: #993333;">@{{item.nickName}}</text><text>: {{item.title}}</text>
						<view class="repobj-content">
							内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
						</view>
						<view class="repobj-time">
							<text>{{item.time}}</text>
						</view>
					</view>
				</view>

				<view class="right">
					<view class="myrep">
						<text>回复</text><text style="color: #336633;">@{{item.nickName}}</text><text>: {{item.reContentery}}</text>
						<view class="myrep-time">
							<text>{{item.createdOn}}</text>
						</view>
					</view>
				</view>


			</view>

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
				title: '我的回复',
				back: 'back',
				myreplyList: [],
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
		},
		onLoad(option) {
			http.post('/api/UserReply', {
				nickname: option.nickname
			}).then(res => {
				console.log(res) //我回复过的树洞
				this.myreplyList = res.data
			})
		}
	}
</script>

<style lang="scss">
	.myreply {
		background-color: #f5f5f5;

		.repitem {
			width: 100%;
			font-size: 13px;
			color: #222222;
			padding: 20rpx;
			box-sizing: border-box;
			border-top: 1px solid #C0C0C0;
			border-bottom: 1px solid #C0C0C0;
			margin-top: 20rpx;
			background-color: #FFFFFF;

			.right {
				margin-top: 10rpx;
				display: flex;
				justify-content: flex-end;
				align-items: center;
			}

			.left {
				display: flex;
				justify-content: flex-start;
				align-items: center;
			}

			.myrep,
			.repobj {
				max-width: 60%;
				border-radius: 30px;
				padding: 20rpx 40rpx;
				color: #222222;
			}

			.myrep {
				background-color: #CC9999;
			}

			.repobj {
				background-color: #CCCC99;
			}
			
			.repobj-content{
				height: 67.2rpx;
				font-weight: 800;
				text-overflow: -o-ellipsis-lastline;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				line-clamp: 2;
				-webkit-box-orient: vertical;
			}

			.myrep-time,
			.repobj-time {
				font-size: 12px;
			}
			.myrep-time{
				text-align: right;
			}
		}
	}
</style>
