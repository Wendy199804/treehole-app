<template>
	<view class="post-article">
		<mynavbar :title="title" :lefticon="back" @leftEvent="Back"></mynavbar>
		<view class="edit-article">
			<input type="text" placeholder="标题(最多10个字符)" class="edit-input" maxlength="10" v-model="edit_title" />
			<view class="container">
				<editor id="editor" class="ql-container" placeholder="告诉我你的想法吧..." @ready="onEditorReady" @blur="blur"></editor>
				<!-- <button type="warn" @tap="undo">撤销</button> -->
			</view>

			<view class="edit-classes">
				<pickerAddress @change="change" style="padding: 20rpx;">选择发布类型 <image src="../../static/click.png" style="width: 40rpx;height:40rpx;vertical-align:middle"></image>
				</pickerAddress>
				<text>{{txt}}</text>
			</view>
			<view class="edit-btn">
				<button class="btn" type="default" @click="postArticle">发布树洞</button>
			</view>

		</view>
	</view>
</template>

<script>
	import mynavbar from '../../components/navbar.vue'
	import {
		uniPopup,
	} from '@dcloudio/uni-ui'
	import pickerAddress from '../../components/wangding-pickerAddress.vue'
	import {
		http
	} from '../../utils/index.js'

	export default {
		data() {
			return {
				title: '创建树洞',
				back: 'back',
				mynickname: '',
				placeholder: '开始输入...',
				classname: '', //类别
				isname: '', //是否匿名
				edit_title: '', //标题
				content: '', //内容
				txt: ''
			}
		},
		components: {
			mynavbar,
			pickerAddress,
		},
		methods: {
			/*返回上一页*/
			Back() {
				uni.navigateBack({
					delta: 1
				})
			},
			onEditorReady() {
				uni.createSelectorQuery().select('#editor').context((res) => {
					this.editorCtx = res.context
				}).exec()
			},
			undo() {
				this.editorCtx.undo()
			},
			/*富文本失焦事件*/
			blur(detail) {
				this.content = detail.detail.html //输入内容
			},
			/*选择类别*/
			change(data) {
				let arr = data.data
				this.txt = `${arr[0]} - ${arr[2]}`
				this.classname = arr[2]
				if (arr[0] == '公开') {
					this.isname = '正常发布'
				} else if (arr[0] == '匿名') {
					this.isname = '匿名发布'
				}
				console.log(data.data)
			},
			/*创建树洞*/
			postArticle() {
				if (this.edit_title == '') {
					this.edit_title = '无题'
				}
				if (this.content.replace(/[\r\n]/g,"") == '' ) {
					console.log(this.content)
					uni.showToast({
						title: '内容不能为空',
						icon: 'none',
						position: 'bottom',
						duration: 1500
					})
				} else if (this.classname == '' || this.isname == '') {
					uni.showToast({
						title: '请选择发布类型',
						icon: 'none',
						position: 'bottom',
						duration: 1500
					})
				} else {
					let params = {
						classname: this.classname,
						nickname: this.mynickname,
						title: this.edit_title,
						contentery: this.content,
						isname: this.isname
					}
					console.log(params)
					http.post('/api/InsertTree', params).then(res => {
						console.log(res)
						if (res.data == 'success') {
							uni.showToast({
								title: '发布成功！',
								icon: 'none',
								position: 'bottom',
								duration: 1500
							})
							setTimeout(() => {
								uni.redirectTo({
									url: `./privateTopic?mynickname=${this.mynickname}`
								})
							}, 1500)
						} else {
							uni.showToast({
								title: '发布失败！',
								icon: 'none',
								position: 'bottom',
								duration: 1500
							})
						}
					})
				}
			},
		},
		onLoad(option) {
			this.mynickname = option.mynickname
		}
	}
</script>

<style lang="scss">
	.post-article {
		background-color: #f5f5f5;
		height: 100vh;

		.edit-article {
			font-size: 16px;
		}

		.edit-input {
			height: 80rpx;
			margin-top: 20rpx;
			border-bottom: 1px solid #eeeeee;
			padding: 20rpx;
			box-sizing: border-box;
			background-color: #FFFFFF;
		}

		.ql-container {
			padding: 20rpx;
			box-sizing: border-box;
		}

		.container {
			margin-bottom: 20rpx;
			background-color: #FFFFFF;
		}

		.edit-classes {
			background-color: #FFFFFF;
			padding-right: 20rpx;
			font-size: 16px;
			margin-bottom: 20rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
		}

		.edit-btn {
			width: 100%;
			position: fixed;
			bottom: 50rpx;

			.btn {
				width: 100%;
				font-size: 18px;
				background-color: #FFFFFF;
				color: #993333;
			}
		}

		.ql-container {
			height: 500rpx;
		}
	}
</style>
