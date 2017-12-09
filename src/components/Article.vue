<template>
	<div id="main" v-loading.lock="loading">
		<router-link :to="{name:'UserRoute', params:{name:article.author.loginname}}">
			作者：{{article.author.loginname}}
		</router-link>
		<div id="publishDetail">
			<span>浏览量：{{article.visit_count}}</span>
			<span>来自板块：{{article.tab}}</span>	
		</div>
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
			// 注意！此处并非单引号或双引号，使用此两种符号会有跨域错误，
			// 该符号位于键盘中Tab键上方
			// 至于为什么使用该符号目前我也不懂，希望有理解的朋友可以指点下
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
		width: 100%;
		@media screen and (min-width: 420px){
			width: 70%;
		}
		background-color: #f9fafc;
		padding: 2rem;
		a{
			text-decoration: none;
			font-size: 1.25rem;
			color: #000;
			font-weight: bold;
		}
		#publishDetail{
			display: inline-block;
			font-size: 1.25rem;
			span{
				margin-left: 2rem;
			}
			@media screen and (max-width: 420px){
				display: flex;
				justify-content: flex-start;
				span{
					margin: 0 2rem 0 0;
				}
			}
		}
		#content{
			margin: 2rem auto;
			padding: 2rem 1rem;
			border: 0.0625rem solid #ddd;
			background-color: #EFF2F7;
			font-size: 1.25rem;
		}
		#reply{
			display: flex;
			flex-direction: column;
			img{
				height: 5rem;
				width: 5rem;
				float: left;
			}
			#replySec{
				border-bottom: 0.125rem solid #C1CDDB;
				padding: 1rem;
				.replyContent{
					display: flex;
					flex-direction: column;
					align-items: flex-start;
					.replyDetail{
						span{
							font-size: 1.125rem;
							margin-left:1rem;
							font-weight: bold;
						}
					}
					p{
						font-size: 1.25rem;
						margin: 0;
						padding: 0;
						margin-left: 1rem;
					}
				}
			}
		}
	}
</style>