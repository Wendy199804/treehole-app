<template>
	<view class="content">
		<mynavbar :title="title" :lefticon="'back'" @leftEvent="Back"></mynavbar>
		<view class="search-box">
			<view class="input-box">
				<input type="text" :adjust-position="true" :placeholder="defaultKeyword" @input="inputChange" v-model="keyword"
				 @confirm="doSearch(false,detailobj)" placeholder-class="placeholder-class" confirm-type="search">
			</view>
			<view class="search-btn" @tap="doSearch('searchbtn',detailobj)" style="background-color: #996699;">搜索</view>
			<view class="search-btn" @click="Back" style="background-color: #9999CC;">取消</view>

		</view>
		<view v-if="treeitemlist.length == 0" style="text-align: center;font-size: 14px;margin-top: 40rpx;">无数据</view>
		<view class="search-keyword">
			<view class="" v-show="!itemlist">
				<scroll-view class="keyword-list-box" v-show="isShowKeywordList" scroll-y>
					<block v-for="(row,index) in keywordList" :key="index">
						<view class="keyword-entry" hover-class="keyword-entry-tap">
							<view class="keyword-text" @tap.stop="doSearch(keywordList[index].keyword,row)">
								<rich-text :nodes="row.htmlStr"></rich-text>
							</view>
							<view class="keyword-img" @tap.stop="setKeyword(index)">
								<image src="../../static/back.png"></image>
							</view>
						</view>
					</block>

				</scroll-view>
				<scroll-view class="keyword-box" v-show="!isShowKeywordList" scroll-y>
					
					<view class="keyword-block" v-if="oldKeywordList.length>0">
						<view class="keyword-list-header">
							<view>历史搜索</view>
							<view>
								<image @tap="oldDelete" src=".../../static/delete.png"></image>
							</view>
						</view>
						<view class="keyword">
							<view v-for="(keyword,index) in oldKeywordList" @tap="doSearch(keyword)" :key="index">{{keyword}}</view>
						</view>
					</view>

				</scroll-view>
			</view>

			<scroll-view class="keyword-list-box" v-show="itemlist" scroll-y>
				<view class="tree-list-item" v-for="item in treeitemlist" :key="item.topicID" @click="toDetails(item.topicID,item.nickName)">
					<view style="color: #999999;font-size: 14px;margin-bottom: 10rpx;">
						{{item.title}}
					</view>
					<view style="color: #333333;font-size: 14px;border-bottom: 1px solid #EEEEEE;border-top: 1px solid #EEEEEE;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">
						{{item.contentery}}
						
					</view>
					<view style="color: #999999;font-size: 12px;text-align: right;margin-top: 10rpx;">
						{{item.nickName}}
					</view>
				</view>
			</scroll-view>
		</view>

	</view>
</template>

<script>
	//引用mSearch组件，如不需要删除即可
	import mSearch from '../../components/mehaotian-search-revision.vue';
	import mynavbar from '../../components/navbar.vue'
	import {
		http
	} from '../../utils/index.js'

	export default {
		data() {
			return {
				title: '搜索',
				defaultKeyword: "",
				keyword: "",
				oldKeywordList: [],
				keywordList: [],
				forbid: '',
				isShowKeywordList: false,
				nickname: '',
				detailobj: '',
				itemlist: false,
				treeitemlist: ''
			}
		},
		onLoad(option) {
			this.nickname = option.nickname
			this.init();
		},
		components: {
			mynavbar
		},
		methods: {
			/*返回上一页*/
			Back() {
				uni.navigateBack({
					delta: 1
				})
			},
			init() {
				this.loadDefaultKeyword();
				this.loadOldKeyword();

			},
			blur() {
				uni.hideKeyboard()
			},
			//加载默认搜索关键字
			loadDefaultKeyword() {
				//定义默认搜索关键字，可以自己实现ajax请求数据再赋值,用户未输入时，以水印方式显示在输入框，直接不输入内容搜索会搜索默认关键字
				this.defaultKeyword = "输入关键字";
			},
			//加载历史搜索,自动读取本地Storage
			loadOldKeyword() {
				uni.getStorage({
					key: 'OldKeys',
					success: (res) => {
						var OldKeys = JSON.parse(res.data);
						this.oldKeywordList = OldKeys;
					}
				});
			},
			/*查看详情*/
			toDetails(topicid, nickname) {
				console.log("????")
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
			//监听输入
			inputChange(event) {
				//兼容引入组件时传入参数情况
				var keyword = event.detail ? event.detail.value : event;
				if (!keyword) {
					this.keywordList = [];
					this.isShowKeywordList = false;
					return;
				}
				this.isShowKeywordList = true;
				//以下示例截取淘宝的关键字，请替换成你的接口
				http.post('/api/SelectTree', {
					selectv: keyword
				}).then(res => {
					console.log(res.data)
					
					this.treeitemlist = res.data
					this.keywordList = [];
					let titlearr = []
					let topicidarr = []
					let itnickname = []
					res.data.forEach(item => {
						titlearr.push(item.title)
						topicidarr.push(item.topicID)
						itnickname.push(item.nickName)
					})
					this.keywordList = this.drawCorrelativeKeyword(titlearr, keyword, topicidarr, itnickname);
				})
			},
			//高亮关键字
			drawCorrelativeKeyword(keywords, keyword, topicidarr, itnickname) {
				console.log(itnickname)
				var len = keywords.length,
					keywordArr = [];
				for (var i = 0; i < len; i++) {
					var row = keywords[i];
					//定义高亮#9f9f9f
					var html = row.replace(new RegExp(keyword, 'g'), "<span style='color: #993333;font-weight:800;'>" + keyword +
						"</span>");
					html = '<div>' + html + '</div>';
					var tmpObj = {
						keyword: row[0],
						htmlStr: html,
						title: keywords[i],
						topicid: topicidarr[i],
						itnickname: itnickname[i]
					}
					this.detailobj = tmpObj
					keywordArr.push(tmpObj)
				}
				return keywordArr;
			},
			//顶置关键字
			setKeyword(index) {
				console.log(index)
				console.log(this.keywordList[index])
				this.keyword = this.keywordList[index].title;
			},
			//清除历史搜索
			oldDelete() {
				uni.showModal({
					content: '确定清除历史搜索记录？',
					success: (res) => {
						if (res.confirm) {
							console.log('用户点击确定');
							this.oldKeywordList = [];
							uni.removeStorage({
								key: 'OldKeys'
							});
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},

			//执行搜索
			doSearch(keyword, str) {
				// this.keyword = keyword?keyword:this.keyword;
				this.saveKeyword(this.keyword); //保存为历史 
				console.log(this.keyword)
				console.log(str)
				if (keyword === 'searchbtn') {
					this.itemlist = true
					console.log("btn")
				} else {
					http.post('/api/TreeDetails', {
						topicid: str.topicid
					}).then(res => {
						console.log(res.data[0])
						uni.setStorage({
							key: 'topicdetail',
							data: res.data[0],
							success: () => {
								uni.redirectTo({
									url: `../../pages/showdetails/details?mynickname=${this.nickname}&topicid=${str.topicid}&itnickname=${str.itnickname}`
								})
							}
						})
					}, (err) => {
						console.log(err)
					})
				}

			},
			//保存关键字到历史记录
			saveKeyword(keyword) {
				uni.getStorage({
					key: 'OldKeys',
					success: (res) => {
						var OldKeys = JSON.parse(res.data);
						var findIndex = OldKeys.indexOf(keyword);
						if (findIndex == -1) {
							OldKeys.unshift(keyword);
						} else {
							OldKeys.splice(findIndex, 1);
							OldKeys.unshift(keyword);
						}
						//最多10个纪录
						OldKeys.length > 10 && OldKeys.pop();
						uni.setStorage({
							key: 'OldKeys',
							data: JSON.stringify(OldKeys)
						});
						this.oldKeywordList = OldKeys; //更新历史搜索
					},
					fail: (e) => {
						var OldKeys = [keyword];
						uni.setStorage({
							key: 'OldKeys',
							data: JSON.stringify(OldKeys)
						});
						this.oldKeywordList = OldKeys; //更新历史搜索
					}
				});
			}
		}
	}
</script>
<style>
	view {
		display: block;
	}

	.search-box {
		width: 95%;
		background-color: rgb(242, 242, 242);
		padding: 15upx 2.5%;
		display: flex;
		justify-content: space-between;
		position: sticky;
		top: 0;
	}

	.search-box .mSearch-input-box {
		width: 100%;
	}

	.search-box .input-box {
		width: 85%;
		flex-shrink: 1;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.search-box .search-btn {
		width: 15%;
		margin: 0 0 0 2%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-shrink: 0;
		font-size: 28upx;
		color: #fff;
		background: #669933;
		border-radius: 60upx;
	}

	.search-box .input-box>input {
		width: 100%;
		height: 60upx;
		font-size: 32upx;
		border: 0;
		border-radius: 60upx;
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
		padding: 0 3%;
		margin: 0;
		background-color: #ffffff;
	}

	.placeholder-class {
		color: #9e9e9e;
	}

	.search-keyword {
		width: 100%;
		background-color: rgb(242, 242, 242);
	}

	.keyword-list-box {
		height: calc(100vh - 110upx);
		padding-top: 10upx;
		border-radius: 20upx 20upx 0 0;
		background-color: #fff;
	}

	.keyword-entry-tap {
		background-color: #eee;
	}

	.keyword-entry {
		width: 94%;
		height: 80upx;
		margin: 0 3%;
		font-size: 30upx;
		color: #333;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: solid 1upx #e7e7e7;
	}

	.keyword-entry image {
		width: 60upx;
		height: 60upx;
	}

	.keyword-entry .keyword-text,
	.keyword-entry .keyword-img {
		height: 80upx;
		display: flex;
		align-items: center;
	}

	.keyword-entry .keyword-text {
		width: 90%;
	}

	.keyword-entry .keyword-img {
		width: 10%;
		justify-content: center;
	}

	.keyword-box {
		height: calc(100vh - 110upx);
		border-radius: 20upx 20upx 0 0;
		background-color: #fff;
	}

	.keyword-box .keyword-block {
		padding: 10upx 0;
	}

	.keyword-box .keyword-block .keyword-list-header {
		width: 94%;
		padding: 10upx 3%;
		font-size: 27upx;
		color: #333;
		display: flex;
		justify-content: space-between;
	}

	.keyword-box .keyword-block .keyword-list-header image {
		width: 40upx;
		height: 40upx;
	}

	.keyword-box .keyword-block .keyword {
		width: 94%;
		padding: 3px 3%;
		display: flex;
		flex-flow: wrap;
		justify-content: flex-start;
	}

	.keyword-box .keyword-block .hide-hot-tis {
		display: flex;
		justify-content: center;
		font-size: 28upx;
		color: #6b6b6b;
	}

	.keyword-box .keyword-block .keyword>view {
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 60upx;
		padding: 0 20upx;
		margin: 10upx 20upx 10upx 0;
		height: 60upx;
		font-size: 28upx;
		background-color: rgb(242, 242, 242);
		color: #6b6b6b;
	}
	.tree-list-item{
		padding: 20rpx 40rpx;
		margin: 40rpx 20rpx;
		box-sizing: border-box;
		border-radius: 10px;
		border: 1px solid #00193A;
	}
</style>
