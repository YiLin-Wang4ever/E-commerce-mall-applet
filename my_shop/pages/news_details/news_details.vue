<template>
	<view class="news_detail">
		<text class="title">{{this.detail.title}}</text>
		<view class="info">
			<text>发表时间：{{this.detail.add_time | formatDate}}</text>
			<text>浏览：{{this.detail.click}}</text>
		</view>
		<view class="content">
			<rich-text :nodes="this.detail.content"></rich-text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:0,
				detail:{}
			}
		},
		methods: {
			async getNewsDetail(){
				const res = await this.$myRequest({
					url:"/api/getnew/"+this.id
				})
				this.detail = res.data.message[0]
			}
		},
		// 使用options来接受传过来的参数
		onLoad(options) {
			this.id = options.id;
			this.getNewsDetail();
		}
	}
</script>

<style lang="scss">
.news_detail{
	font-size: 30rpx;
	padding: 0 20rpx;
	.title{
		text-align: center;
		width: 710rpx;
		display: block;
		margin: 20rpx 0;
		font-size: 35rpx;
		font-weight: 600;
		padding-bottom: 10px;
	}
	.info{
		display: flex;
		justify-content: space-between;
		padding-bottom: 10px;
		border-bottom: 1px solid #e1e1e1;
	}
	.content{
		margin-top: 10px;
	}
}
</style>
