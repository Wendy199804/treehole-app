<template>
  <view class="banner-container">
    <swiper :style="{width: '100vw', height: '620rpx'}" 
      :indicator-dots="swiperConfig.indicatorDots" 
      :indicator-color="swiperConfig.indicatorColor" 
      :indicator-active-color="swiperConfig.indicatorActiveColor"
      :autoplay="swiperConfig.autoplay" 
      :interval="swiperConfig.interval" 
      :duration="swiperConfig.duration" 
      :circular="swiperConfig.circular"
      :previous-margin="swiperConfig.previousMargin"
      :next-margin="swiperConfig.nextMargin"
      @change="swiperChange" 
      @animationfinish="animationfinish">
      <swiper-item v-for="(item, i) in bannerList" :key="i">
		<!-- 1.当前展示为第1项时，bannerList最后一项和第二项的justifyContent值分别为flex-end和flex-start，其余项值为center -->
		<!-- 2.当前展示为最后一项时，bannerList倒数第2项和第1项的justifyContent值分别为flex-end和flex-start，其余项值为center -->
		<!-- 3.当前展示为其他项（非第1和最后1项）时，bannerList当前项的前1项和后1项的justifyContent值分别为flex-end和flex-start，其余项值为center -->
		<!-- 4.padding值也需要根据不同项设定不同值，但理同justifyContent -->
        <view class="image-container" 
			:class="[curIndex===0?((i===listLen-1)?'item-left':(i===1?'item-right':'item-center')):(curIndex===listLen-1?(i===0?'item-right':(i===listLen-2?'item-left':'item-center')):(i===curIndex-1?'item-left':(i===curIndex+1?'item-right':'item-center')))]">
          <view
            class="slide-image"
            :style="{
              transform: curIndex===i?'scale(' + scaleX + ',' + scaleY + ')':'scale(1,1)',
              transitionDuration: '.3s',
              transitionTimingFunction: 'ease'
            }" 
            @click="getBannerDetail(item.topicID)">
							<text class="title">{{item.title}}</text>
							<view class="desc" v-html="item.contentery"></view>
							<view class="support">
								<uni-fav :checked="item.flag" class="favBtn" circle="true" bg-color="#eeeeee" fg-color="#666666" fg-color-checked="#ffffff"
								 bg-color-checked="#EF5656" @click.native.stop="support(item.topicID,i)" :content-text="supporttext"></uni-fav>
								
							</view>
						</view>
        </view>
      </swiper-item>
    </swiper>
   <!-- <div class="desc-wrap" :class="[isDescAnimating?'hideAndShowDesc':'']">
      <view class="title">{{bannerList[descIndex].title}}</view>
      <view class="desc">{{bannerList[descIndex].description}}</view>
    </div> -->
  </view>
</template>
<script>
	import {
		uniFav
	} from '@dcloudio/uni-ui'
	import {
		http
	} from '../utils/index.js'
	
export default {
  props: {
		mynickname:{
			type:String
		},
	bannerList: {
		type: Array,
		default () {
			return []
		}
	},
	swiperConfig: {
		type: Object,
		default () {
			return {
				indicatorDots: true,
				indicatorColor: 'rgba(255, 255, 255, .4)',
				indicatorActiveColor: 'rgba(255, 255, 255, 1)',
				autoplay: false,
				interval: 3000,
				duration: 300,
				circular: true,
				previousMargin: '58rpx',
				nextMargin: '58rpx'
			}
		}
	},
	scaleX: {
		type: String,
		default: (634 / 550).toFixed(4)
	},
	scaleY: {
		type: String,
		default: (378 / 328).toFixed(4)
	}
  },
  computed:{
	listLen () {
		return this.bannerList.length
	}
  },
  data () {
    return {
      curIndex: 0,
      descIndex: 0,
      isDescAnimating: false,
			supporttext: {
				contentDefault: '支持',
				contentFav: '已支持'
			}, //支持文字
			// checked:false,
			
    }
  },
	components:{
		uniFav
	},
  methods: {
    swiperChange (e) {
      const that = this
      this.curIndex = e.mp.detail.current
      this.isDescAnimating = true
      let timer = setTimeout(function () {
        that.descIndex = e.mp.detail.current
        clearTimeout(timer)
      }, 150)
    },
    animationfinish (e) {
      this.isDescAnimating = false
    },
    getBannerDetail (topicid) {
			this.$emit('getBannerDetail',topicid)
	 //  uni.showLoading({
		// title: '将前往详情页面',
		// duration: 2000,
		// mask: true
	 //  })
    },
		/*点击支持*/
		support(topicid,index) {
			// this.checked = !this.checked
			console.log(this.bannerList)
			this.$emit('succeed',index)
			http.post('/api/Support',{topicid,nickname:this.mynickname}).then(res => {
				console.log(res)
					uni.showToast({
						title: res.data,
						icon: 'none',
						position: 'bottom',
						duration: 1500
					})
			},err => {
				uni.showToast({
					title: err.data,
					icon: 'none',
					position: 'bottom',
					duration: 1500
				})
			})
		},
  },
	
}
</script>
<style lang="scss" scoped>
.banner-container {
  width: 100vw;
  height: 620rpx;
  .image-container {
	box-sizing: border-box;
	width: 100%;
	height: 620rpx;
	display: flex;
	.slide-image {
	  width: 500rpx;
	  height:520rpx;
	  z-index: 200;
		background-color: #FFFFFF;
		border-radius: 10px;
		display: flex;flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		padding-top: 20rpx;
		box-sizing: border-box;
		
	}
  }
  .item-left {
	justify-content: flex-end;
	padding: 56rpx 26rpx 0 0;
	box-sizing: border-box;
  }
  .item-right {
	justify-content: flex-start;
	padding: 56rpx 0 0 26rpx;
	box-sizing: border-box;
  }
  .item-center {
	justify-content: center;
	padding: 56rpx 0 0 0;
  }
    
    .title {
      height: 42rpx;
      line-height: 42rpx;
      color: #222222;
      font-family: 'PingFangTC-Regular';
      text-align: center;
			font-size: 14px;
			position: relative;
			&::before{
				content: '';
				display: block;
				width: 5px;
				height: 5px;
				position: absolute;
				top: 50%;
				left: -30rpx;
				transform: translateY(-50%);
				background-color: #CC9999;
				border-radius: 50%;
			}
			&::after{
				content: '';
				display: block;
				width: 5px;
				height: 5px;
				position: absolute;
				top: 50%;
				right: -30rpx;
				transform: translateY(-50%);
				background-color: #CC9999;
				border-radius: 50%;
			}
    }
    .desc {
      margin-top: 4rpx;
      width: 100%;
      height:388rpx;
      color: #222222;
      font-family: 'PingFangTC-Regular';
      text-align: left;
			font-size: 13px;
			padding: 20rpx;
			box-sizing: border-box;
			text-overflow: -o-ellipsis-lastline;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 11;
			line-clamp: 11;
			-webkit-box-orient: vertical;
    }
		.support{
			text-align: right;
		}
  @keyframes descAnimation {
    0% {
      opacity: 1;
    }
    25% {
      opacity: .5;
    }
    50% {
      opacity: 0;
    }
    75% {
      opacity: .5;
    }
    100% {
      opacity: 1;
    }
  }
  @-webkit-keyframes descAnimation {
    0% {
      opacity: 1;
    }
    25% {
      opacity: .5;
    }
    50% {
      opacity: 0;
    }
    75% {
      opacity: .5;
    }
    100% {
      opacity: 1;
    }
  }
  .hideAndShowDesc {
    animation: descAnimation .3s ease 1;
    -webkit-animation: descAnimation .3s ease 1;
  }
}
</style>
