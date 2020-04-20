<template>
	<view class="time-capsule">
		<mynavbar :title="title" :lefticon="'back'" @leftEvent="Back"></mynavbar>
		<view class="contain">
			<view class="contain-title">
				写给自己的一封信
			</view>
			<view>
				<view class="test">
					<button type="primary" @click="onShowDatePicker('date')" class="timebtn">选择开启日期</button>
				</view>
				<mx-date-picker :show="showPicker" :type="type" :value="value" :show-tips="true" :showHoliday="true" @confirm="onSelected"
				 @cancel="onSelected" format="yyyy-mm-dd" />
			</view>
			<view class="capsulelog" @click="capsuleLog">
				已创建的胶囊
			</view>
		</view>
	</view>
</template>

<script>
	import mynavbar from '../../components/navbar.vue'
	import MxDatePicker from '../../components/mx-datepicker.vue'
	import {
		uniPopup
	} from '@dcloudio/uni-ui'

	export default {
		data() {
			return {
				title: '时间胶囊',
				showPicker: false,
				date: '2020-01-01',
				type: 'date',
				value: '',
				true: true,
				nickname: ''
			}
		},
		components: {
			mynavbar,
			MxDatePicker,
			uniPopup
		},
		methods: {
			/*返回上一页*/
			Back() {
				uni.navigateBack({
					delta: 1
				})
			},
			onShowDatePicker(type) { //显示
				this.type = type
				this.showPicker = true
				this.value = this[type]
				console.log("show")
			},
			onSelected(e) { //选择
				this.showPicker = false
				if (e) {
					this[this.type] = e.value
					//选择的值
					// console.log('value => ' + e.value)
					//原始的Date对象
					// console.log('date => ' + e.date)
					uni.showModal({
						title: '提示',
						content: `设定开始时间为${e.value}`,
						success: (res) => {
							console.log(this.nickname)
							if (res.confirm) {
								console.log('用户点击确定')
								uni.navigateTo({
									url: `./writeLetter?nickname=${this.nickname}&time=${e.value}`
								})
							} else if (res.cancel) {
								console.log('用户点击取消')
							}
						}
					});
				}
				console.log("chooese")
			},
			capsuleLog() {
				uni.navigateTo({
					url: `./capsuleLog?nickname=${this.nickname}`
				})
			},
		},
		onLoad(option) {
			this.nickname = option.nickname
			console.log(this.nickname)
			let date = new Date()
			let yy = date.getFullYear()
			let mm = date.getMonth() + 1
			let dd = date.getDate() + 1
			this.date = `${yy}-${mm}-${dd}`
		}
	}
</script>

<style lang="scss">
	.time-capsule {
		height: 100vh;
		background: url(../../static/timecapsulebg.jpg) no-repeat;
		background-size: 100% 100%;

		.test {
			text-align: center;
			padding: 10px 0;
		}

		.contain {
			.contain-title {
				text-align: center;
				font-family: 隶书;
				font-size: 30px;
				margin-top: 200rpx;
				text-shadow: 2px 2px 3px #FFFFFF;
			}

			.timebtn {
				font-size: 14px;
				border-radius: 5px;
				background-color: #FFFFFF;
				color: #003366;
				font-weight: 800;
				width: 460rpx;
				box-shadow: 3px 3px 10px #eeeeee;
				position: absolute;
				bottom: 250rpx;
				left: 50%;
				transform: translateX(-50%);
			}

			.capsulelog {
				color: #003366;
				font-size: 14px;
				text-align: center;
				position: relative;
				position: absolute;
				bottom: 180rpx;
				left: 50%;
				transform: translateX(-50%);

				&::before ,&::after{
					content: '';
					display: block;
					width: 60rpx;
					height: 1px;
					background-color: #003366;
					position: absolute;
					top: 50%;
					transform: translateY(-50%);
				}
				&::before{
					left: 200rpx;
				}
				&::after {
					right: 200rpx;
				}
			}
		}

	}
</style>
