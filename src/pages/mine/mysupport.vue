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
				</view>
				<view class="" v-show="current==1">
					<view class="ifnull" v-if="ifNnull">
						阁下还没有支持过任何树洞哦~快去首页看看吧！
					</view>
				</view>
			</view>
			
		</view>

		<!-- <treeholeitem class="content-item" v-for="item in tree_articlelist.publist" :key="item.topicID"
		:title="item.title" :author="item.nickName" :time="item.time" :content="item.contentery" :replynum="item.replyCount"
		 @toDetails="toDetails(item.topicID,item.nickName)"
		></treeholeitem> -->
	</view>
</template>

<script>
	import mynavbar from '../../components/navbar.vue'
	import treeholeitem from '../../components/treeholeItem.vue'
	import {
		http
	} from '../../utils/index.js'
	import tabControl from '../../components/tabControl-tag.vue'

	export default {
		data() {
			return {
				title: '我的支持',
				back: 'back',
				nickname: '',
				ifnull: false, //支持过的公开树洞是否为0
				ifNnull: false, //支持过的匿名树洞是否为0
				items: ['公开树洞', '匿名树洞'],
				current: 0,
			}
		},
		components: {
			mynavbar,
			treeholeitem,
			tabControl
		},
		methods: {
			/*返回上一页*/
			Back() {
				uni.navigateBack({
					delta: 1
				})
			},
			/*查看详情*/
			toDetails() {

			},
			onClickItem(val) {
				this.current = val.currentIndex
			},
			scollSwiper(e) {
				this.current = e.target.current
			},
			

		},
		onLoad(option) {
			console.log(option.nickname)
			http.post('/api/SupportList', {
				nickname: option.nickname
			}).then(res => {
				console.log(res)
				if (res.data.length == 0) {
					this.ifnull = true
				} else {
					this.ifnull = false
				}
			})
			
			http.post('/api/SupportListNotName', {
				nickname: option.nickname
			}).then(res => {
				console.log(res)
				if (res.data.length == 0) {
					this.ifNnull = true
				} else {
					this.ifNnull = false
				}
			})
			
		},
		created() {


		},
	}
</script>

<style lang="scss">
	.mysupport {

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
	}
</style>
