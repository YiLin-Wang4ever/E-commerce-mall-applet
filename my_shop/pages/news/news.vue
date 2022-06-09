<template>
	<view class="news">
		<newsItem @dadclick="goDetails" :newsList="news"></newsItem>
	</view>
</template>

<script>
	import newsItem from '../../components/news_item/news_item.vue'
	export default {
		data() {
			return {
				news:[],
				img:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg2.autotimes.com.cn%2Fnews%2F2021%2F12%2F1228_155926036942.jpg&refer=http%3A%2F%2Fimg2.autotimes.com.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1657358285&t=b3b96e5a78a6d867da0983c3823aebbb"
			}
		},
		methods: {
			async getNewsList(){
				const res = await this.$myRequest({
					url:'/api/getnewslist'
				})
				for(let i in res.data.message){
					res.data.message[i].img_url = this.img;
				}
				this.news = res.data.message;
			},
			goDetails(id){
				uni.navigateTo({
					url:"/pages/news_details/news_details?id="+id,
					
				})
			}
			
		},
		components:{
			newsItem
		},
		onLoad(){
			this.getNewsList()
		}
	}
</script>

<style lang="scss">
.news{
	width: 750rpx;
	
}
</style>
