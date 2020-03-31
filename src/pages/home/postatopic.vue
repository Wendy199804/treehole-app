<template>
	<view class="post-article">
		<mynavbar :title="title" :lefticon="back" @leftEvent="Back"></mynavbar>
		<view class="edit-article">
			<input type="text" placeholder="标题(最多10个字符)" class="edit-input" maxlength="10" v-model="edit_title"/>
			<view class="container">
				<editor id="editor" class="ql-container" placeholder="告诉我你的想法吧..." @ready="onEditorReady" @blur="blur"></editor>
				<!-- <button type="warn" @tap="undo">撤销</button> -->
			</view>

			<view class="content">
				<pickerAddress @change="change">选择发布类型</pickerAddress>
			</view>
			<view class="">
				<button type="default" @click="postArticle">发布</button>
			</view>

		</view>
	</view>
</template>

<script>
	import mynavbar from '../../components/navbar.vue'
	import {
		uniPopup
	} from '@dcloudio/uni-ui'
	import pickerAddress from '../../components/wangding-pickerAddress.vue'

	export default {
		data() {
			return {
				title: '创建树洞',
				back: 'back',
				mynickname: '',
				placeholder: '开始输入...',
				classname:'',//类别
				isname:'',//是否匿名
				edit_title:'',//标题
				content:'',//内容
			}
		},
		components: {
			mynavbar,
			pickerAddress
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
				console.log(detail.detail.html)
				// let value = detail.detail.html //输入内容
				this.content = detail.detail.html
			},
			/*选择类别*/
			change(data) {
				let arr = data.data
				this.classname = arr[0]
				this.isname = arr[2]
				console.log(data.data)
			},
			/*创建树洞*/
			postArticle(){
				let params={
					classname:this.classname,
					nickname:this.mynickname,
					title:this.edit_title,
					contentery:this.content,
					isname:this.isname
				}
			}
		},
		onLoad(option) {
			this.mynickname = option.mynickname

		}
	}
</script>

<style lang="scss">
	.post-article {
		background-color: #f5f5f5;

		.edit-input {
			height: 80rpx;
			border-bottom: 1px solid #C0C0C0;
			padding: 20rpx;
			box-sizing: border-box;
		}

		.ql-container {
			padding: 20rpx;
			box-sizing: border-box;
		}

		.container {
			margin-bottom: 20rpx;
			background-color: #FFFFFF;
		}
	}
</style>
