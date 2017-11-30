<template>
	<main>
		<div v-for="part of content">
			<router-link :to="{name:'UserRoute',params:{name:part.author.loginname}}">
				<img :src="part.author.avatar_url" :title="part.author.loginname">
			</router-link>
			<div class="report">
				<router-link :to="{name:'ArticleRoute',params:{id:part.id}}">
					{{part.title}}
				</router-link>
				<div class="detail">
					<span>回复：{{part.reply_count}}</span>
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
				this.$http({
					url:'https://cnodejs.org/api/v1/topics',
					method:'get',
					params:{
						page:1,
						limit:10,
						mdrender:'false'
					}
				}).then((res)=>{
					this.content = res.data.data;
				}).catch((res)=>{
					console.log("Error");
				})
			}
		},
		created(){
			this.getData();
		}
	}
</script>