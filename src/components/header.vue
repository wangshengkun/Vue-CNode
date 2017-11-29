<template>
	<header class="header">
			<img src="../assets/logo.svg" alt="cnode logo">
		<el-button @click="showDialog = true" 
		type="text" id="button">
			关于
		</el-button>
		<el-dialog id="dialog"
		title="用Vue构造的简易CNode社区" 
		:visible.sync="showDialog" center>
			<h2>作者：<a :href="myGithub">{{author}}</a></h2>
			<h2>源码：<a :href="myCode">{{code}}</a></h2>
			<span id="des">
				<strong>描述：</strong>
				依据<a :href="inspiration" id="demo">例子</a>来仿写的一个简易CNode社区，参考了其源码，并在此基础上添加了一些新的技术，适合Vue新手学习。
			</span>
			<br>
			<span id="skill">技术栈</span>
			<ul>
				<li v-for="item in items">{{item.message}}</li>
			</ul>
			<span slot="footer" class="dialog-footer">
				<el-button @click="showDialog = false">确定</el-button>
			</span>
		</el-dialog>
	</header>
</template>
<script>
	export default{
		data(){
			return {
				showDialog:false,
				author:'王圣坤',
				code:'案例代码',
				myGithub:'https://github.com/wangshengkun',
				myCode:'https://github.com/wangshengkun',
				inspiration:'https://github.com/shuiRong/VueCnodeJS',
				items:[
				{message:'Vue.js'},
				{message:'Vue-router'},
				{message:'Axios'},
				{message:'Sass'},
				{message:'Element UI'},
				{message:'CNode API'}
				]
			}
		}
	}
</script>

<style lang="scss" scoped>
@mixin absolute-position{
	position: absolute;
	top: 0;
	left: 0;
}
header{
	@include absolute-position;
    background: #324057;
    height: 3.6rem;
    width: 100%;
    img{
		@include absolute-position;
		width: 10em;
		height: 3.6em;
		margin-left:10rem;
    }
    a{
    	text-decoration:none;
    }
}
header > #button{
	float:right;
	font-size:25px;
	font-weight:bold;
	color:#fff;
	letter-spacing:2px;
	margin-right:10rem;
	text-align:center;
}
header > #dialog{
	$font-size:20px;
	#des, #skill{
		font-size:$font-size;
	}
	#demo{
		font-style:italic;
	}
	#skill{
		display:inline-block;
		font-weight:bold;
		margin:1rem 0rem;
	}
	ul{
		margin:0;
		padding:0;
		li{
			font-size:18px;
			margin-left:2rem;
		}
	}
}

</style>