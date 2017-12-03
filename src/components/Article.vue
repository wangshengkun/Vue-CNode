<template>
	<div id="main" v-loading.lock="loading">
		<router-link :to="{name:'UserRoute', params:{name:article.author.loginname}}">
			作者：{{article.author.loginname}}
		</router-link>
		<span class="publishDetail">浏览量：{{article.visit_count}}</span>
		<span class="publishDetail">来自板块：{{article.tab}}</span>
		<h1>{{article.title}}</h1>
		<div v-html="article.content" id="content"></div>
		<div id="reply">
			<div v-for="reply in article.replies" id="replySec" :key="reply.length">
				<router-link :to="{name:'UserRoute', params:{name:reply.author.loginname}}">
					<img :src="reply.author.avatar_url">
				</router-link>
				<div class="replyContent">
					<div class="replyDetail">
						<span class="replyName">{{reply.author.loginname}}</span>
						<span>{{reply.create_at}}</span>
					</div>
					<p v-html="reply.content"></p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default{
	data(){
		return{
			article:{
				author:{
					loginname:''
				}
			},
			loading: true
		}
	},
	beforeCreate(){
		this.axios({
			url:`https://cnodejs.org/api/v1${this.$route.path}`,
			method: 'get'
		}).then((res)=>{
			this.article = res.data.data;
		}).catch((err)=>{
			console.log(err);
		})
	},
	watch:{
		article(val){
			if(val){
				this.loading = false;
			}
		}
	}
}	
</script>

<style>
		@import url('../assets/markdown-github.css');
</style>
<style lang="scss" scoped>
	#main{
		width: 70%;
		background-color: #f9fafc;
		padding: 2rem;
		a{
			text-decoration: none;
			font-size: 20px;
		}
		.publishDetail{
			display: inline-block;
			font-size: 20px;
			margin-left: 2rem;
		}
		#content{
			margin: 2rem auto;
			padding: 2rem 1rem;
			border: 1px solid #ddd;
			background-color: #EFF2F7;
			font-size: 20px;
		}
		#reply{
			display: flex;
			flex-direction: column;
			img{
				height: 5rem;
				width: 5rem;
				float:left;
			}
			#replySec{
				border-bottom: 2px solid #C1CDDB;
				padding: 1rem;
				.replyContent{
					display: flex;
					flex-direction: column;
					align-items: flex-start;
					.replyDetail{
						span{
							font-size: 18px;
							margin-left:1rem;
						}
					}
					p{
						font-size: 20px;
						margin: 0;
						padding: 0;
						margin-left: 1rem;
					}
				}
			}
		}
	}
</style>