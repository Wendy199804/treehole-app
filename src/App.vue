<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			// #ifdef H5
			uni.getSystemInfo({
				success(e) {
					if (e.windowWidth > 720 && !window.top.isPC && !/iOS|Android/i.test(e.system)) {
						window.location.href = 'http://www.maown.net';
					}
				}
			})

			// #endif
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		watch: {
			// 使用watch 监听$router的变化
			$route(to, from) {
				// 如果to索引大于from索引,判断为前进状态,反之则为后退状态 
				if (to.meta.index > from.meta.index) {
					// 设置动画名称
					this.transitionName = 'slide-left';
				} else {
					this.transitionName = 'slide-right';
				}
			}
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

	.image {
		width: 100%;
		height: 100%;
	}

	.slide-right-enter-active,
	.slide-right-leave-active,
	.slide-left-enter-active,
	.slide-left-leave-active {
		will-change: transform;
		transition: all 500ms;
		position: absolute; //这里的定位使用relative可以解决切换时页面残影
	}

	.slide-right-enter {
		opacity: 0;
		transform: translate3d(-100%, 0, 0);
	}

	.slide-right-leave-active {
		opacity: 0;
		transform: translate3d(100%, 0, 0);
	}

	.slide-left-enter {
		opacity: 0;
		transform: translate3d(100%, 0, 0);
	}

	.slide-left-leave-active {
		opacity: 0;
		transform: translate3d(-100%, 0, 0);
	}
</style>
