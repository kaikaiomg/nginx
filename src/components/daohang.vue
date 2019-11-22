<template>
	<div style="display:flex; flex-flow: row nowrap;justify-content: space-between; width: 100%; padding: 0px 100px 0 30px; height: 60px;background: #0d1731;margin: 0 0 20px 0;box-shadow: 0px 20px 20px -20px ">
		<div style="">
			<img src="../assets/nginxlogo.png" style="margin: 10px auto;">
		</div>

		<div>
			<el-tabs v-model="activeName" @tab-click="handleClick" style="background-color: #0d1731; margin: auto;">
				<el-tab-pane label="HOME" style="color: white;"></el-tab-pane>
				<el-tab-pane label="HTTP Servers" style="color: white;"></el-tab-pane>
				<el-tab-pane label="HTTP Upstreams"></el-tab-pane>
				<el-tab-pane label="Loctions"></el-tab-pane>
				<el-tab-pane label="限流配置"></el-tab-pane>
				<el-tab-pane label="灰度策略"></el-tab-pane>
				<el-tab-pane label="全局配置"></el-tab-pane>
			</el-tabs>

		</div>

	</div>
</template>
<script>
	export default {
		name: 'page1',
		data() {
			return {
				activeName:0,
				msg: 'page1'
			}
		},
		created() {
			// var path = '/page' + (this.activeName);
			// console.log('start',this.$route.path)
			var str = this.$route.path.substring(5,6);
				// console.log('str',str)
				this.activeName=str;
		},
		methods: {
			goTo() {
				//直接跳转
				this.$router.push('/');

				// //带参数跳转
				// this.$router.push({path:'/testDemo',query:{setid:123456}});
				// this.$router.push({name:'testDemo',params:{setid:111222}});
			},
			
			handleClick(tab, event) {
				// console.log(panName);
				console.log(this.activeName);
				var str = '/page' + (this.activeName);
				
				console.log(str);
				console.log(this.$route.path)
				var that=this;
				if (this.$route.path!=str) {
					setTimeout(function() {that.$router.push(str);}, 200);
				}
			
				// if (this.activeName !="-1") {
				// 	this.$router.push(str)
				// 	clearInterval(this.setTime)
				// }
			},
		}
	}
</script>
<style>
	.el-tabs__item {
		color: white;
		font-size: 14px;
 font-weight: 800;
 font-family:  YouYuan;
	}

	.el-tabs__item.is-active {
		background: linear-gradient(to right, Cyan, blue);
		-webkit-background-clip: text;
		color: transparent;
		font-size: 16px;

	}
</style>
