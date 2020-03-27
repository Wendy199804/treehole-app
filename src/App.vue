<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')

		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	.watermark {
		position: absolute;
		bottom: 0;
		right: 20rpx;
		font-size: 12px;
	}
	.module {
		padding: 40rpx 50rpx;
		box-sizing: border-box;
		width: 100%;
		margin-bottom: 30rpx;
		background-color: #FFFFFF;
	}
	.image{
		width: 100%;
		height: 100%;
	}
</style>
