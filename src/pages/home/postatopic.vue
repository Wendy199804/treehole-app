<template>
	<view class="post-article">
		<mynavbar :title="title" :lefticon="back" @leftEvent="Back"></mynavbar>
		<view class="edit-article">
			<input type="text" placeholder="标题" class="edit-input"/>
			<view class="container">
				<editor id="editor" class="ql-container" :placeholder="placeholder" @ready="onEditorReady" @blur="blur"></editor>
				<button type="warn" @tap="undo">撤销</button>
			</view>
		</view>
	</view>
</template>

<script>
	import mynavbar from '../../components/navbar.vue'

	export default {
		data() {
			return {
				title: '创建树洞',
				back: 'back',
				mynickname: '',
				placeholder: '开始输入...'
			}
		},
		components: {
			mynavbar,

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
			blur(detail) {
				console.log(detail.detail.html)
				let value = detail.detail.html //输入内容
			}
		},
		onLoad(option) {
			this.mynickname = option.mynickname

		}
	}
</script>

<style lang="scss">
	.post-article {}
</style>
