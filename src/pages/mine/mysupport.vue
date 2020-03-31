<template>
	<view class="mysupport">
		<mynavbar :title="title" :lefticon="back" @leftEvent="Back"></mynavbar>

		<view class="page">
			<tabControl :current="current" :values="items" bgc="#fff" :fixed="true" :scrollFlag='true' :isEqually='true'
			 @clickItem="onClickItem"></tabControl>
			<!-- 使用 swiper 配合 滑动切换 -->
			<swiper class="swiper" style="height: 100%;" @change='scollSwiper' :current='current'>
				<swiper-item v-for="(item,index) in items" :key='index'>
					<!-- 使用 scroll-view 来滚动内容区域 -->
					<scroll-view scroll-y="true" style="height: 100%;">{{ item }}</scroll-view>
				</swiper-item>
			</swiper>
			<view class="content">
				<view class="" v-show="current==0">
					<view class="ifnull" v-if="ifnull">
						阁下还没有支持过任何树洞哦~快去首页看看吧！
					</view>
					<view class="swipercard" v-if="!ifnull">
						<view class="" v-for="item in supportList" :key="item.topicID" @click="toDetails(item.topicID,item.nickName)">
							<uni-card :title="item.title" mode="title" :is-shadow="true" thumbnail="../../static/head-portrait.png"
							 :extra="item.time" :note="item.nickName">
								<view class="" v-html="item.contentery"></view>
							</uni-card>
						</view>
					</view>
				</view>
				<view class="" v-show="current==1">
					<view class="ifnull" v-if="ifNnull">
						阁下还没有支持过任何树洞哦~快去首页看看吧！
					</view>
					<view class="swipercard" v-if="!ifnull">
						<view class="" v-for="item in supportnonameList" :key="item.topicID" @click="toDetails(item.topicID,item.nickName)">
							<uni-card :title="item.title" mode="title" :is-shadow="true" thumbnail="../../static/head-portrait.png"
							 :extra="item.time" :note="item.nickName">
								<view class="" v-html="item.contentery"></view>
							</uni-card>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import mynavbar from '../../components/navbar.vue'
	import treeholeitem from '../../components/treeholeItem.vue'
	import {
		http
	} from '../../utils/index.js'
	import tabControl from '../../components/tabControl-tag.vue'
	import {
		uniCard
	} from '@dcloudio/uni-ui'

	export default {
		data() {
			return {
				title: '我的支持',
				back: 'back',
				nickname: '',
				ifnull: false, //支持过的公开树洞是否为0
				ifNnull: false, //支持过的匿名树洞是否为0
				items: ['公开树洞', '匿名树洞'],
				current: 0, //当前tab
				supportList: [],
				supportnonameList: [],
			}
		},
		components: {
			mynavbar,
			treeholeitem,
			tabControl,
			uniCard
		},
		methods: {
			/*返回上一页*/
			Back() {
				uni.navigateBack({
					delta: 1
				})
			},
			/*查看详情*/
			toDetails(topicid,nickname) {
				http.post('/api/TreeDetails',{topicid}).then(res => {
					// console.log(res.data[0])
					uni.setStorage({
						key:'topicdetail',
						data:res.data[0],
						success: () => {
							uni.navigateTo({
							    url: `../../pages/showdetails/details?mynickname=${this.nickname}&topicid=${topicid}&itnickname=${nickname}`
							})
						}
					})
				},(err) => {
					console.log(err)
				})
			},
			onClickItem(val) {
				this.current = val.currentIndex
			},
			scollSwiper(e) {
				this.current = e.target.current
			},


		},
		onLoad(option) {
			// console.log(option.nickname)
			this.nickname = option.nickname
			http.post('/api/SupportList', {
				nickname: option.nickname
			}).then(res => {
				// console.log(res) //支持的公开树洞
				this.supportList = res.data
				if (res.data.length == 0) {
					this.ifnull = true
				} else {
					this.ifnull = false
				}
			})

			http.post('/api/SupportListNotName', {
				nickname: option.nickname
			}).then(res => {
				// console.log(res)
				this.supportnonameList = res.data
				if (res.data.length == 0) {
					this.ifNnull = true
				} else {
					this.ifNnull = false
				}
			})

		},

	}
</script>

<style lang="scss">
	.mysupport {

		// height: 100vh;
		// background: url(../../static/supportbg.jpg) no-repeat;
		// background-size: cover;
		// padding-top:118rpx;
		.ifnull {
			width: 100%;
			text-align: center;
			margin-top: 50rpx;
			font-size: 12px;
			color: #999999;
		}

		.page {
			padding-top: 98rpx;
			height: 100%;
		}

		.content {

			.mov-area-all {
				top: 80rpx;
			}

			.cardmain {
				width: 700rpx;
				height: 360rpx;
				display: flex;
				flex-direction: column;
				align-items: flex-start;
				justify-content: center;
				font-size: 13px;
				padding: 50rpx;
				box-sizing: border-box;
				color: #222222;
			}

			.cardhead {
				height: 20%;
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-weight: 800;
			}

			.cardcontent {
				height: 60%;
				width: 100%;
				padding: 25rpx 0;
				box-sizing: border-box;
				text-overflow: -o-ellipsis-lastline;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 3;
				line-clamp: 3;
				-webkit-box-orient: vertical;
				border-top: 1px solid #C0C0C0;
			}

			.cardfoot {
				height: 20%;
				width: 100%;
				font-size: 12px;
				color: #999999;
			}
		}
	}
</style>
