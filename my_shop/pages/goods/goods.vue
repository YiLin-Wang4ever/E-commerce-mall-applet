<template>
	<view class="list">
		<goodsList @goodsDetail="goGoodsDetail" :goods="goods"></goodsList>
		<view class="over" v-if="flag">
			--------我是有底线的--------
		</view>
	</view>
</template>

<script>
	import goodsList from '../../components/goods_list/goods_list.vue'
	export default {
		data() {
			return {
				pageIndex:1,
				goods:[],
				img:"https://img12.360buyimg.com/n1/jfs/t1/215646/3/14784/65004/62303d44Ead199001/7a053a9d0f08f139.jpg.avif",
				flag:false
			}
		},
		components:{
			goodsList
		},
		onLoad(){
			this.getGoodsList()
		},
		methods: {
			// 获取商品列表请求
			async getGoodsList(callback){
				const res = await this.$myRequest({
					url:`/api/getgoods?pageindex=${this.pageIndex}`
				})
				for(let i in res.data.message){
					res.data.message[i].img_url = this.img;
				}
				// 防止分页查询的时候 覆盖掉之前查出来的数据 
				this.goods = [...this.goods,...res.data.message]
				callback && callback();
			},
			// 导航到商品详情页
			goGoodsDetail(id){
				uni.navigateTo({
					url:"/pages/goods_detail/goods_detail?id="+id
				})
			}
		},
		onReachBottom() {
			if(this.goods.length < this.pageIndex*10) return this.flag = true;
			this.pageIndex++;
			this.getGoodsList();
		},
		onPullDownRefresh() {
			this.pageIndex = 1;
			this.goods = [];
			this.flag = false;
			setTimeout(()=>{
				this.getGoodsList(()=>{
					uni.stopPullDownRefresh();
				});
			},1000);
			
		}
	}
</script>

<style lang="scss">
	.list{
		background-color: #eee;
		.over{
			width: 100%;
			height: 50px;
			line-height: 50px;
			text-align: center;
			color: #999;
			font-size: 30rpx;
			
		}
	}
</style>
