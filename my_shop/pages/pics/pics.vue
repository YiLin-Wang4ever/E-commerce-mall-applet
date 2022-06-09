<template>
	<view class="pics">
		<scroll-view class="left" scroll-y="true">
			<view :class="active===index?'active':''" v-for="(item,index) in picItem" :key="index"
				@click="clickHandle(index,item.id)">{{item.title}}</view>
		</scroll-view>
		<scroll-view class="right" scroll-y="true">
			<view class="item" v-for="item in secondData" :key="item.id">
				<image @click="previewImg(item.img_url)" :src="item.img_url"></image>
				<text>{{item.title}}</text>
			</view>
			<text v-if="secondData.length === 0">暂无数据</text>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				picItem: [],
				active: 0,
				secondData: [],
				img:"https://img12.360buyimg.com/n1/jfs/t1/215646/3/14784/65004/62303d44Ead199001/7a053a9d0f08f139.jpg.avif"
			}
		},
		methods: {
			async getPicItem() {
				const res = await this.$myRequest({
					url: "/api/getimgcategory"
				})
				this.picItem = res.data.message;
				this.clickHandle(0,this.picItem[0].id)
			},
			async clickHandle(index, id) {
				this.active = index;
				// 获取右侧的数据
				const res = await this.$myRequest({
					url: `/api/getimages/${id}`,
				})
				for(let i in res.data.message){
					res.data.message[i].img_url = this.img;
				}
				this.secondData = res.data.message;
			},
			previewImg(current){
				const urls = this.secondData.map(item=>{
					return item.img_url
				})
				uni.previewImage({
					urls,
					current
				})
			}
		},
		// 应用加载时执行
		onLoad() {
			this.getPicItem();
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
	}

	.pics {
		height: 100%;
		display: flex;
		.left {
			width: 200rpx;
			height: 100%;
			border-right: 1px solid #eee;

			view {
				height: 60px;
				line-height: 60px;
				color: #333;
				text-align: center;
				font-size: 30rpx;
				border-top: 1px solid #eee;
			}

			.active {
				background: $shop-color;
				color: #fff;
			}
		}

		.right {
			height: 100%;
			width: 520rpx;
			margin: 10rpx auto;

			.item {
				image {
					width: 520rpx;
					height: 520rpx;
					border-radius: 5px;
				}

				text {
					font-size: 30rpx;
					line-height: 60rpx;
				}
			}
		}
	}
</style>
