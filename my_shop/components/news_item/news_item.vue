<template>
	<view>
		<view class="news_item" @click="navigator(item.id)" v-for="(item,index) in newsList" :key="index">
			<image :src="item.img_url"></image>
			<view class="right">
				<view class="title">
					{{item.title}}
				</view>
				<view class="info">
					<text>发布时间：{{item.add_time | formatDate}}</text>
					<text>浏览：{{item.click}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "news_item",
		data() {
			return {

			};
		},
		props: ['newsList'],
		// 过滤器
		filters:{
			formatDate(date){
				const newDate = new Date(date);
				const year = newDate.getFullYear();
				const month = newDate.getMonth().toString().padStart(2,0);
				const day = newDate.getDay().toString().padStart(2,0)
				return year+ '-' + month + '-' + day
			}
		},
		methods:{
			navigator(id){
				this.$emit('dadclick',id)
			}
		}
	}
</script>

<style lang="scss">
	.news_item {
		display: flex;
		padding: 10rpx 20rpx;
		border-bottom: 1px solid $shop-color;

		image {
			min-width: 200rpx;
			max-width: 200rpx;
			height: 150rpx;
		}

		.right {
			margin-left: 15rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			.title {
				font-size: 30rpx;
			}

			.info {
				font-size: 24rpx;

				text:nth-child(2) {
					margin-left: 20rpx;
				}
			}
		}
	}
</style>
