<template>
	<view class="goods_detail">
		<swiper indicator-dots>
			<swiper-item v-for="(item,index) in swipers" :key="index">
				<image :src="item.src"></image>
			</swiper-item>
		</swiper>
		<view class="box1">
			<view class="price">
				<text>￥{{goodsInfo.sell_price}}</text>
				<text>￥{{goodsInfo.market_price}}</text>
			</view>
			<view class="goods_name">{{goodsInfo.title}}</view>
		</view>
		<view class="line"></view>
		<view class="box2">
			<view>货号：{{goodsInfo.goods_no}}</view>
			<view>库存：{{goodsInfo.stock_quantity}}</view>
		</view>
		<view class="line"></view>
		<view class="box3">
			<view class="tit">详情介绍</view>
			<view class="content">
				<rich-text :nodes="content"></rich-text>
			</view>
		</view>
		<view class="nav_bottom">
			<uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick"
			@buttonClick="buttonClick" />
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: 0,
				swipers: [],
				img: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg2.autotimes.com.cn%2Fnews%2F2021%2F12%2F1228_155926036942.jpg&refer=http%3A%2F%2Fimg2.autotimes.com.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1657358285&t=b3b96e5a78a6d867da0983c3823aebbb",
				goodsInfo: {},
				content: '',
				options: [{
					icon: 'headphones',
					text: '客服'
				}, {
					icon: 'shop',
					text: '店铺',
					info: 2,
					infoBackgroundColor: '#007aff',
					infoColor: "red"
				}, {
					icon: 'cart',
					text: '购物车',
					info: 2
				}],
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: '#ff0000',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: '#ffa200',
						color: '#fff'
					}
				]
			};
		},
		onLoad(options) {
			this.id = options.id;
			this.getSwipers();
			this.getInfo();
			this.getDesc();
		},
		methods: {
			async getSwipers() {
				const res = await this.$myRequest({
					url: "/api/getthumimages/" + this.id
				})
				for (let i in res.data.message) {
					res.data.message[i].src = this.img;
				}
				this.swipers = res.data.message;
			},
			// 获取详情的信息
			async getInfo() {
				const res = await this.$myRequest({
					url: "/api/goods/getinfo/" + this.id
				})
				this.goodsInfo = res.data.message[0]
			},
			// 获取详情的介绍
			async getDesc() {
				const res = await this.$myRequest({
					url: "/api/goods/getdesc/" + this.id
				})
				this.content = res.data.message[0].content
			},
			onClick(e) {
				uni.showToast({
					title: `点击${e.content.text}`,
					icon: 'none'
				})
			},
			buttonClick(e) {
				console.log(e)
				this.options[2].info++
			}
		}
	}
</script>

<style lang="scss">
	.goods_detail {
		swiper {
			height: 700rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.box1 {
			padding: 10px;

			.price {
				font-size: 35rpx;
				color: $shop-color;
				line-height: 80rpx;

				text:nth-child(2) {
					color: #ccc;
					font-size: 28rpx;
					text-decoration: line-through;
					margin-left: 20rpx;
				}
			}

			.goods_name {
				font-size: 32rpx;
				line-height: 60rpx;
			}
		}

		.box2 {
			padding: 0 10px;
			font-size: 32rpx;
			line-height: 70rpx;
		}

		.box3 {
			padding-bottom: 50px;

			.tit {
				font-size: 32rpx;
				padding-left: 10px;
				border-bottom: 1px solid #eee;
				line-height: 70rpx;
			}

			.content {
				padding: 10px;
				font-size: 28rpx;
				color: #333;
				line-height: 50rpx;
			}
		}

		.line {
			height: 10rpx;
			width: 750rpx;
			background: #eee;
		}
		.nav_bottom{
			width: 750rpx;
			position: fixed;
			bottom: 0;
		}
	}
</style>
