<template>
	<view class="mine">
		<mynavbar :title="title"></mynavbar>

		<view class="module me-head-module" @click="clickMyinfo" @touchstart="touchMyinfo" @touchend="touchMyinfoend" :style="[{background: bgcolor}]">
			<view class="headimg">
				<image src="../../static/head-portrait.png" class="image"></image>
			</view>
			<view class="headinfo">
				<text style="font-size: 17px;color: #000000;">{{userinfo.username}}</text>
				<text style="font-size: 13px;color: #999999;">欢迎加入Tree Hole大家庭~~</text>
			</view>
			<image src="../../static/next.png" class="nexticon"></image>
		</view>

		<uni-list style="margin-bottom: 30rpx;">
			<uni-list-item title="收获的支持" @click="clickGetsupport" showExtraIcon="true" 
			:extraIcon="{color: '#003300',size: '22',type: 'heart'}" :show-badge="hasNewSupport" 
			:badge-text="newSupportnum" badgeType="error"></uni-list-item>
		</uni-list>
		<!-- <uni-list style="margin-bottom: 30rpx;">
			<uni-list-item title="收获的支持" showExtraIcon="true" 
			:extraIcon="{color: '#003300',size: '22',type: 'heart'}" :show-badge="true" 
			badge-text="'newSupportnum'" badgeType="error"></uni-list-item>
		</uni-list> -->
		<uni-list>
			<uni-list-item title="送出的支持" @click="clickSetsupport" showExtraIcon="true" :extraIcon="{color: '#003300',size: '22',type: 'star'}"></uni-list-item>
		</uni-list>
		<uni-list>
			<uni-list-item title="发表的回复" @click="clickReply" showExtraIcon="true" :extraIcon="{color: '#003300',size: '22',type: 'chatbubble'}"></uni-list-item>
		</uni-list>
		<uni-list style="margin-top: 30rpx;">
			<uni-list-item title="设置" @click="clickSet" showExtraIcon="true" :extraIcon="{color: '#003300',size: '22',type: 'gear'}"></uni-list-item>
		</uni-list>
	</view>
</template>

<script>
	import mynavbar from '../../components/navbar.vue'
	import {
		uniList,
		uniListItem,
		uniIcons
	} from '@dcloudio/uni-ui'
	import {
		http
	} from '../../utils/index.js'

	export default {
		data() {
			return {
				title: '我的',
				userinfo:'',
				bgcolor:'',
				newSupportnum:'',
				hasNewSupport:false
			}
		},
		components: {
			mynavbar,
			uniList,
			uniListItem,
			uniIcons
		},
		methods: {
			/*点击我的资料*/
			clickMyinfo(){
				uni.navigateTo({
					url:'./userinfo'
				})
			},
			/*触摸我的资料@touchstart*/
			touchMyinfo(){
				this.bgcolor = '#F1F1F1'
			},
			/*触摸我的资料@touchend*/
			touchMyinfoend(){
				this.bgcolor = '#FFFFFF'
			},
			/*点击设置*/
			clickSet() {
				console.log("点击了设置")
				uni.navigateTo({
					url:`./setting?nickname=${this.userinfo.nickname}`
				})
			},
			/*点击送出的支持*/
			clickSetsupport() {
				console.log("点击了送出的支持")
				// console.log(this.userinfo.nickname)
				uni.navigateTo({
					url:`./mysupport?nickname=${this.userinfo.nickname}`
				})
			},
			/*点击我的回复*/
			clickReply() {
				console.log("点击了我的回复")
				uni.navigateTo({
					url:`./myreply?nickname=${this.userinfo.nickname}`
				})
			},
			/*点击得到的支持*/
			clickGetsupport() {
				console.log("点击了得到的支持")
				uni.navigateTo({
					url:`./mynewsupport?nickname=${this.userinfo.nickname}`
				})
			},
		},
		beforeCreate() {
			
		},
		created(){
			  
		},
		onShow() {
			this.userinfo = uni.getStorageSync('user')
			// console.log(this.userinfo)
			/*查看是否有新的支持（对我）*/
			http.post('/api/SupportFlag',{nickname:this.userinfo.nickname}).then(res => {
				console.log(res)
				if(res.data == 0){
					// console.log('没有新的支持')
					this.hasNewSupport = false
				}else {
					// console.log('有新的支持')
					this.hasNewSupport = true
					
				}
				this.newSupportnum = res.data.toString()
			},err => {
				console.log(err)
			})
			
			// http.post('/api/SupportFlagClean',{nickname:this.userinfo.nickname}).then(res => {
			// 	if(res.data == 'success'){
			// 		console.log('已查看')
			// 	}else{
			// 		console.log(res.data)
			// 	}
			// },err => {
			// 	console.log(err)
			// })
		}
	}
</script>

<style lang="scss">
	.mine {
		height: 100vh;
		background-color: #F5F5F5;
		color: #003300;
		
		.uni-badge--success[data-v-50168758]  {
			background-color: #D13438;
			width: auto;
		}

		.me-head-module {
			display: flex;
			justify-content: flex-start;
			align-items: center;
			position: relative;
			padding-left: 30rpx;

			.headimg {
				width: 100rpx;
				height: 100rpx;
			}

			.headinfo {
				height: 100rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				align-items: flex-start;
				margin-left: 30rpx;
			}

			.nexticon {
				width: 30rpx;
				height: 30rpx;
				position: absolute;
				right: 30rpx;
				top: 50%;
				transform: translateY(-50%);
			}
		}


	}
</style>
