<template>
	<main id="one" v-loading.lock="loading">
		<div v-for="part of content" :key="part.id" class="content">
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
				loading: true
			}
		},
		methods:{
			getData(){
				// axios直接定义在了Vue.prototype上（位于main.js文件中），
				// 你动手编写时需先自己使用npm加载axios并将其注册在Vue原型上
				this.axios({
					url:'https://cnodejs.org/api/v1/topics',
					method:'get',
					params:{
						page:1,
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
		watch:{
			content(val){
				if(val){
					this.loading = false;
				}
			}
		},
		created(){
			this.getData();
		}
	}
</script>
<style lang="scss" scoped>
	#one{
		width: 100%;
		@media screen and (min-width: 420px){
			width: 70%;
		}
		background-color: #F9FAFC;
		padding: 1rem;
		border-radius: 0.3rem;
		>div[class="content"]{
			display: flex;
			justify-content: flex-start;
			align-items: center;
			margin: 0.5rem 0;
			border-bottom: 0.125rem solid #C0CCDA;
			padding: 1rem 0;
			img{
				height: 5rem;
				width: 5rem;
				margin-right: 2rem;
			}
			>div[class="report"]{
				display: flex;
				flex-direction: column;
				justify-content: flex-start;
				>a{
					color: #000;
					font-size: 1.25rem;
					font-weight: bold;
					text-decoration: none;
				}
				>div[class="detail"]{
					font-size: 1rem;
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