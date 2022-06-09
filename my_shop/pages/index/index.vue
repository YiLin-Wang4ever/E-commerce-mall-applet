<template>
	<view class="home">
		<!-- 轮播图区域 -->
		<swiper autoplay="true" indicator-dots="true">
			<swiper-item v-for="(item,index) in swipers" :key="item.id"><image :src="item.img"></image></swiper-item>
		</swiper>
		<!-- 导航区域 -->
		<view class="nav">
			<view class="nav_item" v-for="(item,index) in nav_items" :key="index" @click="goRouter(item.path)">
				<view :class="item.icon"></view>
				<text>{{item.text}}</text>
			</view>
		</view>
		<!-- 推荐商品 -->
		<view class="hot_goods">
				<view class="tit">
					推荐商品
				</view>
				<goodsList :goods="goods" @goodsDetail="goGoodsDetail" ></goodsList>
		</view>
	</view>
</template>

<script>
	import goodsList from '../../components/goods_list/goods_list.vue'
	export default {
		data() {
			return {
				swipers:[],
				goods:[],
				id:0,
				// 数据库中图片失效，img用来替换图片
				img:"https://img12.360buyimg.com/n1/jfs/t1/215646/3/14784/65004/62303d44Ead199001/7a053a9d0f08f139.jpg.avif",
				nav_items:[
					{
						icon:'iconfont icon-ziyuan',
						text:'我的超市',
						path:'/pages/goods/goods'
					},
					{
						icon:'iconfont icon-guanyuwomen',
						text:'联系我们',
						path:'/pages/contact/contact'
					},
					{
						icon:'iconfont icon-tupian',
						text:'社区图片',
						path:'/pages/pics/pics'
					},
					{
						icon:'iconfont icon-shipin',
						text:'学习视频',
						path:'/pages/videos/videos'
					}
				]
			}
		},
		components:{
			goodsList
		},
		// 加载时获取传过来的id
		onLoad() {
			this.getSwipers();
			this.getGoods();
		},
		methods: {
			// 获取轮播图的数据
			async getSwipers(){
				const res = await this.$myRequest({
					url:"/api/getlunbo"
				})
				this.swipers = res.data.message;
			},
			// 获取商品列表
			async getGoods(){
				const res = await this.$myRequest({
					url:`/api/getgoods?pageindex=1`
				})
				let data = res.data.message;
				for(let i in data){
					data[i].img_url = this.img;
				}
				this.goods = data;		
			},
			// 导航点击跳转路由
			goRouter(path){
				uni.navigateTo({
					url:path
				})
			},
			// 导航到商品详情页
			goGoodsDetail(id){
				uni.navigateTo({
					url:"/pages/goods_detail/goods_detail?id="+id
				})
			}
		}
	}
</script>

<style lang="scss">
	.home{
		swiper{
			width: 750rpx;
			height: 380rpx;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.nav{
			display: flex;
			justify-content: space-around;
			align-items: center;
			.nav_item{
				width: 25%;
				text-align: center;
				view{
					width: 120rpx;
					height: 120rpx;
					background-color: $shop-color;
					border-radius: 50%;
					line-height: 120rpx;
					font-size: 50rpx;
					margin: 10px auto;
					color: white;
				}
				.icon-tupian{
					font-size: 45rpx;
				}
				text{
					font-size: 30rpx;
				}
			}
		}
		.hot_goods{
			background-color: #eee;
			margin-top: 10rpx;
			overflow: hidden;
			.tit{
				width: 750rpx;
				height: 50px;
				line-height: 50px;
				color: $shop-color;
				letter-spacing: 20px;
				text-align: center;
				background: #fff;
				margin: 7rpx 0;
			}
		}
	}
</style>
