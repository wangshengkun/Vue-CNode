<template>
	<div id="main">
		<div id="profile" v-loading.lock="loading">
			<div id="message">
				<img :src="userInfo.avatar_url" :title="userInfo.loginname">
				<span>{{userInfo.loginname}}</span>
			</div>
			<ul id="about">
				<li>
					<span>积分：</span>
					{{userInfo.score}}
				</li>
				<li>
					<span>Github：</span>
					https://github.com/{{userInfo.githubUsername}}
				</li>
			</ul>			
		</div>
		<div id="recentReplies" v-loading.lock="loading">
				<h3>最近参与的话题</h3>
				<template v-for="(item,index) of userInfo.recent_replies">
					<div v-if="index < 4" :key="index">
						<router-link :to="{name:'UserRoute', params:{name:item.author.loginname}}">
							<img :src="item.author.avatar_url" :title="item.author.loginname">
						</router-link>
						<router-link :to="{name:'ArticleRoute',params:{id:item.id}}">
							<h2>{{item.title}}</h2>
						</router-link>
					</div>
				</template>
		</div>
		<div id="recentTopics" v-loading.lock="loading">
			<h3>最近创建的话题</h3>
			<template v-for="(item,index) of userInfo.recent_topics">
				<div v-if="index < 4 && item" :key="index">
					<img :src="item.author.avatar_url" :title="item.author.loginname">
					<router-link :to="{name:'ArticleRoute',params:{id:item.id}}">
						<h2>{{item.title}}</h2>
					</router-link>
				</div>
			</template>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				userInfo:{},
				loading: true
			}
		},
		created(){
			this.axios({
				url:`https://cnodejs.org/api/v1${this.$route.path}`,
				method:'get',
			}).then((res)=>{
				this.userInfo = res.data.data;
			}).catch((err)=>{
				console.log(err);
			})
		},
		beforeRouteUpdate(to, from, next){
			this.axios({
				url:`https://cnodejs.org/api/v1${to.path}`,
				method:'get',
			}).then((res)=>{
				this.userInfo = res.data.data;
			}).catch((err)=>{
				console.log(err);
			});
			next();
		},
		watch:{
			userInfo(val){
				if(val){
					this.loading = false;
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	#main{
		width: 70%;
		a{
			text-decoration: none;
		}
		#profile{
			padding: 1rem;
			background: #EFF2F7;
			#message{
				margin-bottom: 1rem;
				img{
					height: 8rem;
					width: 8rem;
				}
				span{
					font-size: 25px;
					color: #000;
					font-weight: bold;
					margin-left: 1rem;
				}
			}
			#about{
				margin: 0;
				padding: 0;
				li{
					list-style-type: none;
					font-size: 20px;
				}
			}
		}
		#recentReplies{
			background-color: #E5E9F2;
		}
		#recentTopics{
			background-color: #D3DCE6;
		}
		@mixin avatar-size{
				height: 5rem;
				weight: 5rem;
			}
		@mixin talk-style{
				padding: 1rem;
				border-radius: 0.3rem;
		}
		#recentReplies, #recentTopics{
			margin-top: 1rem;
			h3{
				margin: 0;
				padding: 0;
			}
			@include talk-style;
			img{
				@include avatar-size;
			}
			div{
				display: flex;
				align-items:center;
				padding: 1rem 0;
				border-bottom: 2px solid #C0CCDA;
			}
			h2{
				margin-left: 1rem;
			}
		}

	}
</style>