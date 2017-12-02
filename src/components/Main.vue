<template>
	<main id="one">
		<div v-for="part of content" :key="part.id">
			<router-link :to="{name:'UserRoute',params:{name:part.author.loginname}}">
				<img :src="part.author.avatar_url" :title="part.author.loginname">
			</router-link>
			<div class="report">
				<router-link :to="{name:'ArticleRoute',params:{id:part.id}}">
					{{part.title}}
				</router-link>
				<div class="detail">
					<span>回复：{{part.reply_count}}</span>
					<span>浏览量：{{part.visit_count}}</span>
				</div>
			</div>
		</div>
	</main>
</template>
<script>
	export default{
		name:"main",
		data(){
			return {
				content:[],
			}
		},
		methods:{
			getData(){
				this.axios({
					url:'https://cnodejs.org/api/v1/topics',
					method:'get',
					params:{
						page:1,
						tab:'job',
						limit:10,
						mdrender:'false'
					}
				}).then((res)=>{
					this.content = res.data.data;
				}).catch((err)=>{
					console.log(err);
				})
			}
		},
		created(){
			this.getData();
		}
	}
</script>
<style lang="scss" scoped>
	#one{
		width: 70%;
		background-color: #F9FAFC;
		padding: 1rem;
		border-radius: 0.3rem;
		a{
			text-decoration: none;
		}
		>div{
			display: flex;
			justify-content: flex-start;
			align-items: center;
			margin: 0.5rem 0;
			border-bottom: 2px solid #C0CCDA;
			padding-bottom: 1rem;
			img{
				height: 5rem;
				width: 5rem;
				margin-right: 2rem;
			}
			>div[class="report"]{
				display: flex;
				flex-direction: column;
				align-items: flex-start;
				justify-content: flex-start;
				width: 100%;
				>a{
					color: #000;
					font-size: 20px;
					font-weight: bold;
				}
				>div[class="detail"]{
					font-size: 16px;
					margin-top: 1rem;
					color: #8492A6;
					span{
						margin-right: 2rem;
					}
				}
			}
		}
	}
</style>