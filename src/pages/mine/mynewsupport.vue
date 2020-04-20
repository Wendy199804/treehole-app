<template>
	<view class="mynewsupport">
		<mynavbar :title="title" :lefticon="back" @leftEvent="Back"></mynavbar>
		<view class="ifnull" v-if="supportList.length==0">
			阁下的树洞还没有被支持过呢！但是别灰心哦~
		</view>
		<view class="supportcard" v-if="supportList.length>0">
			<view class="card-item" v-for="(item,index) in supportList" :key="index" @click="toDetails(item.topicID,item.nickName)">
				<view class="supportcard-top">
					<text style="font-size: 16px;"><uni-icons type="paperplane" size="24"></uni-icons> {{item.nickName}}</text>
					<text style="font-size: 12px;color: #999999;">{{item.createdOn}}</text>
				</view>
				<view class="supportcard-mid">
					<text>支持了这条树洞<image src="../../static/supported.png" style="width: 30rpx;height: 30rpx;"></image></text>
				</view>
				<view class="supportcard-bottom">
					<text style="font-size: 14px;font-weight: 800;color: @003300;">@{{mynickname}}:</text>
					<text style="font-size: 12px;">标题：{{item.title}}</text>
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
	import {
		uniCard,uniIcons
	} from '@dcloudio/uni-ui'
	
	export default {
		data(){
			return{
				title:'收获的支持',
				back:'back',
				supportList:[],
				mynickname:''
			}
		},
		components:{
			mynavbar,
			uniCard,
			uniIcons
		},
		methods:{
			Back(){
				uni.navigateBack({
					delta: 1
				})
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
								url: `../../pages/showdetails/details?mynickname=${this.mynickname}&topicid=${topicid}&itnickname=${nickname}`
							})
						}
					})
				}, (err) => {
					console.log(err)
				})
			},
		},
		onLoad(option) {
			this.mynickname = option.nickname
			/*已查看所有我的新支持*/
			http.post('/api/SupportFlagClean',{nickname: option.nickname}).then(res => {
				if(res.data == 'success'){
					console.log('全部已读')
				}
			})
			/*获取所有我的支持*/
			http.post('/api/SupportUserFlag',{nickname:option.nickname}).then(res => {
				console.log(res.data)
				this.supportList = res.data 
			})
		}
	}
</script>

<style lang="scss">
	.mynewsupport{
		
		.supportcard{
			padding: 20rpx;
			box-sizing: border-box;
			color: #222222;
			
			.card-item{
				margin: 20rpx;
				border-radius: 10px;
				box-shadow: 7px 7px 10px #C0C0C0;
				padding: 15rpx;
				box-sizing: border-box;
			}
			.supportcard-top,.supportcard-bottom{
				width: 100%;
				padding: 10rpx 0;
				display: flex;
			}
			.supportcard-top{
				height: 70rpx;
				justify-content: space-between;
				align-items: center;
			}
			.supportcard-bottom{
				height: 100rpx;
				margin-top: 10rpx;
				border-radius: 10px;
				border: 1px dashed #C0C0C0;
				padding: 10rpx 15rpx;
				box-sizing: border-box;
				flex-direction: column;
				justify-content: space-between;
				align-items: flex-start;
			}
			.supportcard-mid{
				font-size: 13px;
			}
		}
	}
</style>
