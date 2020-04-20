<template>
	<view class="home">
		<mynavbar :title="title"></mynavbar>
		<view class="write-module module">
			<view class="write-item" @click="writeLetter">
				<view class="write-item-icon" style="background-color: #CC9999;">
					<image src="../../static/write.png" class="icon"></image>
				</view>
				<text>写信</text>
			</view>
			<view class="write-item" @click="receivedLetter">
				<view class="write-item-icon" style="background-color: #99CCFF;">
					<image src="../../static/mailbox.png" class="icon"></image>
				</view>
				<text>邮筒</text>
			</view>
			<view class="write-item" @click="checkletterbox">
				<view class="write-item-icon" style="background-color: #CCCC99;">
					<image src="../../static/mail.png" class="icon"></image>
				</view>
				<text>信箱</text>
			</view>
		</view>
		<view class="application-module module">
			<view class="application-module-item" @click="postTreehole">
				<image src="../../static/tree.png" class="icon"></image>
				<text>树洞</text>
			</view>
			<view class="application-module-item" @click="timingModal">
				<image src="../../static/fishtank.png" class="icon"></image>
				<text>水族箱</text>
			</view>
			<view class="application-module-item" @click="timecapsule">
				<image src="../../static/timecapsule.png" class="icon"></image>
				<text>时间胶囊</text>
			</view>
			<view class="application-module-item" @click="search">
				<image src="../../static/search.png" class="icon"></image>
				<text>搜索</text>
			</view>
			<view class="application-module-item" style="margin-top: 40rpx;" @click="robot">
				<image src="../../static/robot.png" class="icon"></image>
				<text>解闷</text>
			</view>
		</view>

		<view class="public-article-module module">
			<text class="module-name">公开的树洞</text>
			<uni-segmented-control :current="currenttab" :values="tabitems" @clickItem="onClickItem" style-type="text"
			 active-color="#003300" class="tabnav"></uni-segmented-control>
			<view class="content">
				<view v-show="currenttab === 0">
					<treeholeitem class="content-item" v-for="item in tree_articlelist.moodlist" :key="item.topicID" @toDetails="toDetails(item.topicID,item.nickName)"
					 :title="item.title" :author="item.nickName" :time="item.time" :content="item.contentery" :replynum="item.replyCount"
					 :topicid="item.topicID" :checked="item.flag" @success="item.flag=!item.flag"></treeholeitem>
				</view>
				<view v-show="currenttab === 1">
					<treeholeitem class="content-item" v-for="item in tree_articlelist.troublelist" :key="item.topicID" @toDetails="toDetails(item.topicID,item.nickName)"
					 :title="item.title" :author="item.nickName" :time="item.time" :content="item.contentery" :replynum="item.replyCount"
					 :topicid="item.topicID" :checked="item.flag" @success="item.flag=!item.flag"></treeholeitem>
				</view>
				<view v-show="currenttab === 2">
					<treeholeitem class="content-item" v-for="item in tree_articlelist.teasinglist" :key="item.topicID" @toDetails="toDetails(item.topicID,item.nickName)"
					 :title="item.title" :author="item.nickName" :time="item.time" :content="item.contentery" :replynum="item.replyCount"
					 :topicid="item.topicID" :checked="item.flag" @success="item.flag=!item.flag"></treeholeitem>
				</view>
				<view v-show="currenttab === 3">
					<treeholeitem class="content-item" v-for="item in tree_articlelist.secretlist" :key="item.topicID" @toDetails="toDetails(item.topicID,item.nickName)"
					 :title="item.title" :author="item.nickName" :time="item.time" :content="item.contentery" :replynum="item.replyCount"
					 :topicid="item.topicID" :checked="item.flag" @success="item.flag=!item.flag"></treeholeitem>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import mynavbar from '../../components/navbar.vue'
	import treeholeitem from '../../components/treeholeItem.vue'
	import {
		uniSegmentedControl
	} from '@dcloudio/uni-ui'
	import {
		http
	} from '../../utils/index.js'

	export default {
		data() {
			return {
				title: 'Tree Hole',
				tabitems: ['心情', '烦恼', '吐槽', '秘密'],
				currenttab: 0, //当前选中的tab
				tree_articlelist: {
					moodlist: [], //心情 
					troublelist: [], //烦恼
					teasinglist: [], //吐槽
					secretlist: [], //秘密
				},
				nickname: '', //当前nickname
			}
		},
		components: {
			mynavbar,
			treeholeitem,
			uniSegmentedControl
		},
		methods: {
			/*写信*/
			writeLetter(){
				uni.navigateTo({
					url:`./writeLetter?nickname=${this.nickname}`,
					animationType: 'pop-in',
					animationDuration: 200
				})
			},
			/*查看未读的信件-邮筒*/
			receivedLetter(){
				uni.navigateTo({
					url:`./receivedLetter?nickname=${this.nickname}`,
					animationType: 'pop-in',
					animationDuration: 200
				})
			},
			/*查看信箱*/
			checkletterbox(){
				console.log("查看信箱")
				uni.navigateTo({
					url:`./letterBox?nickname=${this.nickname}`
				})
			},
			/*水族箱*/
			timingModal(){
				uni.navigateTo({
					url:`./timingModal?nickname=${this.nickname}`
				})
			},
			/*时间胶囊*/
			timecapsule(){
				uni.navigateTo({
					url:`./timeCapsule?nickname=${this.nickname}`
				})
			},
			/*搜索*/
			search(){
				uni.navigateTo({
					url:`./search?nickname=${this.nickname}`
				})
			},
			/*机器人 */
			robot(){
				uni.navigateTo({
					url:`./robot?nickname=${this.nickname}`
				})
			},
			/*切换选项卡*/
			onClickItem(e) {
				if (this.currenttab !== e.currentIndex) {
					this.currenttab = e.currentIndex;
				}
				console.log(e)
				if (e.currentIndex == 0) {
					this.getClassification(1, 'moodlist')
				} else if (e.currentIndex == 1) {
					this.getClassification(2, 'troublelist')
				} else if (e.currentIndex == 2) {
					this.getClassification(3, 'teasinglist')
				} else if (e.currentIndex == 3) {
					this.getClassification(4, 'secretlist')
				}
			},
			/*获取分类的树洞*/
			getClassification(num, classes) {
				http.post('/api/TreeClass', {
					class: num
				}).then(res1 => {
					http.post('/api/SupportList', {
						nickname: this.nickname
					}).then(res2 => {
						if (res2.data.length !== 0) {
							let newarr1 = res1.data.map(item1 => {
								item1.flag = res2.data.some(item2 => item1.topicID === item2.topicID) 
									return item1
							})
							this.tree_articlelist[classes] = newarr1
						}else{
							this.tree_articlelist[classes] = res1.data
						}
						console.log(this.tree_articlelist[classes])
					})
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
								url: `../../pages/showdetails/details?mynickname=${this.nickname}&topicid=${topicid}&itnickname=${nickname}`
							})
						}
					})
				}, (err) => {
					console.log(err)
				})
			},
			/*查看树洞*/
			postTreehole() {
				console.log('查看树洞')
				uni.navigateTo({
					url: `./privateTopic?mynickname=${this.nickname}`
				})
			}
		},
		beforeCreate() {
			let date = new Date()
			let logintime = date.getTime()
			uni.setStorage({
				key: 'logintime',
				data: logintime
			})
		},
		created() {
			let userinfo = uni.getStorageSync('user')
			this.nickname = userinfo.nickname
			//预加载
			http.post('/api/TreeClass', {
				class: 1
			}).then(res1 => {
				http.post('/api/SupportList', {
					nickname: this.nickname
				}).then(res2 => {
					if (res2.data.length !== 0) {
						let newarr1 = res1.data.map(item1 => {
							item1.flag = res2.data.some(item2 => item1.topicID === item2.topicID) 
								return item1
						})
						this.tree_articlelist.moodlist = newarr1
					}else{
						this.tree_articlelist.moodlist = res1.data
					}
					console.log(this.tree_articlelist.moodlist)
				})
			})
			//
			uni.showToast({
				title: `${this.nickname}，欢迎回来！`,
				icon: 'none',
				position: 'bottom',
				duration: 1500
			})
			//
			let date = new Date()
			let yy = date.getFullYear()
			let mm = date.getMonth() + 1
			let dd = date.getDate() + 1
			let nowdate = `${yy}-${mm}-${dd}`
			http.post('/api/CapRemind', {
				nickname: this.nickname,
				time: nowdate
			}).then(res => {
				console.log(res) //
				if(res.data.length>0){
					uni.showModal({
					    title: '提示',
					    content: '你有时间胶囊可以开启哦',
					    success: function (res) {
					        if (res.confirm) {
					            console.log('用户点击确定');
					        } else if (res.cancel) {
					            console.log('用户点击取消');
					        }
					    }
					});
				}
			})
		},
	}
</script>

<style lang="scss">
	.home {
		background-color: #F5F5F5;

		.module {
			padding: 40rpx 50rpx;
			box-sizing: border-box;
			width: 100%;
			margin-bottom: 30rpx;
			background-color: #FFFFFF;
		}

		.write-module {
			color: #333333;
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 14px;

			.write-item {
				width: 20%;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				align-items: center;
			}

			.write-item-icon {
				width: 110rpx;
				height: 110rpx;
				border-radius: 50%;
				display: flex;
				justify-content: center;
				align-items: center;
				margin-bottom: 20rpx;

				.icon {
					width: 60rpx;
					height: 60rpx;
				}
			}
		}

		.application-module {
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			font-size: 14px;

			.application-module-item {
				width: 25%;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				align-items: center;

				.icon {
					width: 60rpx;
					height: 60rpx;
					margin-bottom: 15rpx;
				}
			}
		}

		.public-article-module {
			.content-item {
				box-shadow: 0 0 10px #C0C0C0;
				border-radius: 10px;
			}

			.module-name {
				font-size: 14px;
			}

			.tabnav {
				margin-top: 10rpx;
				font-size: 12px;
			}

			.content {
				margin-top: 20rpx;
				background-color: #F5F5F5;
			}
		}
	}
</style>
