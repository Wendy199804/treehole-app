<template>
	<view class="received-letter">
		<mynavbar :title="title" :lefticon="'back'" @leftEvent="Back"></mynavbar>
		<view class="letters">
			<movable-swiper :dataList="lastDataList" :height="movHeight">
				<template v-slot="{movSlotData}">
					<!-- 这里面放你自己的要显示的东西，图片什么的，下面这是示例 -->
					<view v-if="movSlotData" class="letter-content">
						<view class="letter-main">
							from{{movSlotData.nickName}}
						</view>
						
						<view class="--main">
							<view class="">
								亲爱的陌生人：
							</view>
							{{movSlotData.contentery}}
						</view>
						
						<view class="letter-btn">
							<button type="default" class="btn" hover-class="btn-touch" @click="checkLetter(movSlotData.letterID)">查看</button>
							<button type="default" class="btn" hover-class="btn-touch" @click="removeLetter(movSlotData.letterID)">拒收</button>
						</view>
					</view>
				</template>
			</movable-swiper>
		</view>
		
	</view>
</template>

<script>
	import mynavbar from '../../components/navbar.vue'
	import movableSwiper from '../../components/movable-swiper.vue'
	import {
		http
	} from '../../utils/index.js'

	export default {
		data() {
			return {
				title: '邮筒',
				movHeight: '800rpx', //卡片高度
				//传入的数据示例
				lastDataList: [],
				nickname:''
			}
		},
		components: {
			mynavbar,
			movableSwiper
		},
		methods: {
			/*返回上一页*/
			Back() {
				uni.navigateBack({
					delta: 1
				})
			},
			/**查看信件*/
			checkLetter(letterid){
				console.log("查看信件")
				http.post('/api/LetterGet',{nickname:this.nickname,letterid}).then(res => {
					console.log(res)
					if(res.data == 'success'){
						uni.navigateTo({
							url:`./letterBox?nickname=${this.nickname}`
						})
					}
				})
			},
			/*删除信件*/
			removeLetter(letterid){
				console.log("删除信件")
				http.post('/api/LetterDel',{letterid}).then(res => {
					console.log(res)
				})
			},
		
		},
		onLoad(option) {
			console.log("ok")
			this.nickname = option.nickname
			http.post('/api/LetterList',{nickname:this.nickname}).then(res => {
				console.log(res)
				 res.data.forEach((item,index) => {
				    item.ispulldown = false
				})
				this.lastDataList = res.data
			})
		}
	}
</script>

<style lang="scss">
	.received-letter {
		height: 100vh;
		background: url(../../static/supportbg.jpg) no-repeat;
		background-size: 100% 100%;

		.letters {
			margin-top: 200rpx;
		}
		.letter-content{
			position: relative;
			padding-bottom: 150rpx;
			box-sizing: border-box;
			height: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: flex-start;
			.letter-main{
				box-sizing: border-box;
				height: 80rpx;
				line-height: 80rpx;
				width: 60%;
				margin-top: 40rpx;
				text-align: center;
				border: 1px solid #FF6666;
			}
			.--main{
				font-size: 16px;
				height: 160rpx;
				width: 450rpx;
				margin-top: 40rpx;
				text-overflow: -o-ellipsis-lastline;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				line-clamp: 2;
				-webkit-box-orient: vertical;
				border: 1px solid black;
				padding: 30rpx;
				box-sizing: border-box;
				text-decoration: underline;
			}
			.mask{
				width: 450rpx;
				height: 270rpx;
				background-color: #FFFFFF;
				border: 1px solid red;
				position: absolute;
				top: 158rpx;
				left: 50%;
				transform: translateX(-50%);
				opacity: 1;
				transition: all 0.5s;
			}
			
		}
		.letter-btn{
			width: 100%;
			height: 130rpx;
			display: flex;
			justify-content: space-around;
			align-items: center;
			position: absolute;
			bottom: 10rpx;
			left: 0;
			.btn{
			box-shadow: 0 0 15px #eeeeee;
			// height: 120rpx;
			width: 140rpx;
			border-radius: 50px;
			border: 1px solid #eeeeee;
		}
		
		.btn-touch{
			box-shadow: none;
		}
		}
		
	}
</style>
