<template>
	<view class="more">
		<mynavbar :title="title"></mynavbar>
		<!--轮播图-->
		<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
			<swiper-item>
				<view class="swiper-item">
					<image src="../../static/app2.png" class="image"></image>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item">
					<image src="../../static/app3.png" class="image"></image>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item">
					<image src="../../static/app4.png" class="image"></image>
				</view>
			</swiper-item>
		</swiper>

		<view class="module article-module">
			<text style="font-size: 14px;">我的树洞</text>
			<uni-segmented-control :current="currenttab" :values="tabitems" @clickItem="onClickItem" style-type="text"
			 active-color="#003300" class="tabnav"></uni-segmented-control>

			<view class="content">
				<view v-show="currenttab === 0">
					<view class="" style="background-color: #FFFFFF;text-align: center;font-size: 14px;" v-if="tree_articlelist.publist.length == 0">
						这里还没有内容哦 ~
					</view>
					<treeholeitem class="content-item" v-for="item in tree_articlelist.publist" :key="item.topicID" :title="item.title"
					 :author="item.nickName" :time="item.time" :content="item.contentery" :replynum="item.replyCount" @toDetails="toDetails(item.topicID,item.nickName)"
					 :checked="item.flag" @success="item.flag=!item.flag"></treeholeitem>
				</view>
				<view v-show="currenttab === 1">
					<view class="" style="background-color: #FFFFFF;text-align: center;font-size: 14px;" v-if="tree_articlelist.anonymouslist.length == 0">
						这里还没有内容哦 ~
					</view>
					<treeholeitem class="content-item" v-for="item in tree_articlelist.anonymouslist" :key="item.topicID" :title="item.title"
					 :author="item.nickName" :time="item.time" :content="item.contentery" :replynum="item.replyCount" @toDetails="toDetails(item.topicID,item.nickName)"
					 :checked="item.flag" @success="item.flag=!item.flag"></treeholeitem>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import mynavbar from '../../components/navbar.vue'
	import treeholeitem from '../../components/treeholeItem.vue'
	import {
		uniSwiperDot,
		uniSegmentedControl
	} from '@dcloudio/uni-ui'
	import {
		http
	} from '../../utils/index.js'

	export default {
		data() {
			return {
				title: '心事',
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				currentswiper: 0,
				modeswiper: 'round',
				tabitems: ['公开', '匿名'],
				currenttab: 0, //当前选中的tab
				tree_articlelist: {
					publist: [], //公开的树洞
					anonymouslist: [], //匿名的树洞
				}
			}
		},
		components: {
			mynavbar,
			uniSwiperDot,
			treeholeitem,
			uniSegmentedControl
		},
		methods: {
			/*切换轮播图*/
			change(e) {
				this.currentswiper = e.detail.current;
			},
			/*切换选项卡*/
			onClickItem(e) {
				if (this.currenttab !== e.currentIndex) {
					this.currenttab = e.currentIndex;
				}
				console.log(e)
			},
			/*查看详情*/
			toDetails(topicid, nickname) {
				http.post('/api/TreeDetails', {
					topicid
				}).then(res => {
					console.log(res.data[0])
					uni.setStorage({
						key: 'topicdetail',
						data: res.data[0],
						success: () => {
							uni.navigateTo({
								url: `../../pages/showdetails/details?mynickname=${this.nickname}&topicid=${topicid}&itnickname=${nickname}`
							})
						}
					})
				}, (err) => {
					console.log(err)
				})
			},
			changeIndicatorDots(e) {
				this.indicatorDots = !this.indicatorDots
			},
			changeAutoplay(e) {
				this.autoplay = !this.autoplay
			},
			intervalChange(e) {
				this.interval = e.target.value
			},
			durationChange(e) {
				this.duration = e.target.value
			}
		},
		created() {
			let userinfo = uni.getStorageSync('user')
			this.nickname = userinfo.nickname

			http.post('/api/UserTreeName', {
				nickname: this.nickname
			}).then(res1 => {
				http.post('/api/SupportList', {
					nickname: this.nickname
				}).then(res2 => {
					if (res2.data.length !== 0) {
						let newarr1 = res1.data.map(item1 => {
							item1.flag = res2.data.some(item2 => item1.topicID === item2.topicID)
							return item1
						})
						this.tree_articlelist.publist = newarr1
					} else {
						this.tree_articlelist.publist = res1.data
					}
					console.log(this.tree_articlelist.publist)
				})
			})

			http.post('/api/UserTreeNotName', {
				nickname: this.nickname
			}).then(res1 => {
				http.post('/api/SupportList', {
					nickname: this.nickname
				}).then(res2 => {
					if (res2.data.length !== 0) {
						let newarr1 = res1.data.map(item1 => {
							item1.flag = res2.data.some(item2 => item1.topicID === item2.topicID)
							return item1
						})
						this.tree_articlelist.anonymouslist = newarr1
					} else {
						this.tree_articlelist.anonymouslist = res1.data
					}
					console.log(this.tree_articlelist.anonymouslist)
				})
			})
		},
	}
</script>

<style lang="scss">
	.more {
		background-color: #F5F5F5;
		color: #333333;

		.swiper {
			width: 100%;
			height: 350rpx;

			.swiper-item {
				width: 100%;
				height: 350rpx;
			}
		}

		.module {
			padding: 40rpx 50rpx;
			box-sizing: border-box;
			width: 100%;
			margin-bottom: 30rpx;
			background-color: #FFFFFF;
		}

		.article-module {
			.content-item {
				box-shadow: 0 0 10px #C0C0C0;
				border-radius: 10px;
			}

			.tabnav {
				margin-top: 10rpx;
				font-size: 12px;
			}

			.content {
				margin-top: 20rpx;
				background-color: #F5F5F5;
			}
		}
	}
</style>
