
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
.watermark{
	position: absolute;
	bottom: 0;
	right: 20rpx;
	font-size: 12px;
}
.uni-navbar__header, .uni-navbar__content_view{
			width: 100%;
		}
</style>
