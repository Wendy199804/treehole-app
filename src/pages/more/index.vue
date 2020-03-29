<template>
	<view class="more">
		<mynavbar :title="title"></mynavbar>
		<!--轮播图-->
		<uni-swiper-dot :info="swiperinfo" :current="currentswiper" field="content" 
		:mode="modeswiper" style="margin-bottom: 30rpx;">
			<swiper class="swiper-box" @change="change">
				<swiper-item v-for="(item ,index) in swiperinfo" :key="index">
					<view class="swiper-item">
						<image :src="item.src" mode=""></image>
					</view>
				</swiper-item>
			</swiper>
		</uni-swiper-dot>
		
		<view class="module article-module">
			<text style="font-size: 14px;">我的树洞</text>
			<uni-segmented-control :current="currenttab" :values="tabitems" @clickItem="onClickItem" style-type="text"
			 active-color="#003300" class="tabnav"></uni-segmented-control>
			<view class="content">
				<view v-show="currenttab === 0">
					<treeholeitem class="content-item" v-for="item in tree_articlelist.publist" :key="item.topicID" 
					:title="item.title" :author="item.nickName" :time="item.time" :content="item.contentery" :replynum="item.replyCount"
					 @toDetails="toDetails(item.topicID,item.nickName)"
					></treeholeitem>
				</view>
				<view v-show="currenttab === 1">
					<treeholeitem class="content-item" v-for="item in tree_articlelist.anonymouslist" :key="item.topicID"
					:title="item.title" :author="item.nickName" :time="item.time" :content="item.contentery" :replynum="item.replyCount"
					 @toDetails="toDetails(item.topicID,item.nickName)"
					></treeholeitem>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import mynavbar from '../../components/navbar.vue'
	import treeholeitem from '../../components/treeholeItem.vue'
	import {
		uniSwiperDot,uniSegmentedControl
	} from '@dcloudio/uni-ui'
	import {
		http
	} from '../../utils/index.js'

	export default {
		data() {
			return {
				title: '心事',
				swiperinfo: [{
					src: '../../static.swiper1.jpg'
				}, {
					src: '../../static.swiper1.jpg'
				}, {
					src: '../../static.swiper1.jpg'
				}],
				currentswiper: 0,
				modeswiper: 'round',
				tabitems: ['公开', '匿名'],
				currenttab: 0,//当前选中的tab
				tree_articlelist:{
					publist:[],//公开的树洞
					anonymouslist:[],//匿名的树洞
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
			toDetails(topicid,nickname){
				http.post('/api/TreeDetails',{topicid}).then(res => {
					console.log(res.data[0])
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
		},
		created(){
			let userinfo = uni.getStorageSync('user')
			this.nickname = userinfo.nickname
			/*获取树洞列表*/
			http.post('/api/UserTreeName',{nickname:this.nickname}).then(res => {
				console.log(res.data)
				this.tree_articlelist.publist=res.data
			},(err)=>{
				console.log(err)
			})
			http.post('/api/UserTreeNotName',{nickname:this.nickname}).then(res => {
				console.log(res.data)
				this.tree_articlelist.anonymouslist=res.data
			},(err)=>{
				console.log(err)
			})
		},
	}
</script>

<style lang="scss">
	.more{
		background-color: #F5F5F5;
		color: #333333;
		.module {
			padding: 40rpx 50rpx;
			box-sizing: border-box;
			width: 100%;
			margin-bottom: 30rpx;
			background-color: #FFFFFF;
		}
		
		.article-module {
			.content-item{
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
