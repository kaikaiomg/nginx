<template>
	<div id="app" style="display: flex; flex-flow: row wrap ;width: 100%;margin: 0px;">
		<daohang> </daohang>

		<div style="flex-flow: column;width: 20%;">
			<!-- 	<div @click="gotonginx()" style="width: 95%;height:40px; font-weight: bold; font-size: 20px;background-color: #F0F0F0;margin: 0 auto;align-items: center; justify-content: center; line-height:40px;">
				PaaS Nginx
			</div> -->
		<div class="left_menu_1 border8" :style="'height:'+(winHeight-100)+'px;'">


				<div style="margin: 30px auto 20px;width: 85%;">
					<el-button @click=" changepage('nginx')" style="width: 100%;  background-color: #e7eeff;  padding:25px 20px; " size="medium">
						Nginx 全局配置</el-button>
				</div>

				<div style="margin: 0px auto 20px;width: 85%;">
					<el-button @click=" changepage('http')" style="width: 100%;  background-color: #e7eeff; padding:25px 20px; " size="medium">
						HTTP 全局配置</el-button>
				</div>



				<!-- <div @click="changepage('HTTP')" style="flex-flow: column nowrap; margin: 12px auto;width: 85%;border: 1px solid black;background-color: #FFFFFF; border-radius: 3px;">
					<div style="font-size: 16px;margin: 18px 12px; font-weight: 300; ">HTTP 全局配置</div>
				</div> -->
				<!-- <div style="flex-flow: column nowrap; margin: 12px auto;width: 85%;border: 1px solid black;background-color: #FFFFFF; border-radius: 3px;">
					<div style="font-size: 16px;margin: 8px 12px; font-weight: 300; ">HTTP Servers 2</div>
					<div style="font-size: 12px;margin:  0px 12px 16px; ;color: #808080;">侦听接口：8081</div>
				</div> -->


			</div>


		</div>
		<div style="display: flex; width: 80%;display: flex;flex-flow: column;">

			<!-- 		<el-tabs v-model="activeName" type="card" @tab-click="handleClick">
				<el-tab-pane label="HTTP Servers"></el-tab-pane>
				<el-tab-pane label="HTTP Upstreams"></el-tab-pane>
				<el-tab-pane label="Loctions"></el-tab-pane>
				<el-tab-pane label="限流配置"></el-tab-pane>
				<el-tab-pane label="灰度策略"></el-tab-pane>
				<el-tab-pane label="全局配置"></el-tab-pane>


			</el-tabs> -->

				<div class="border8 right_menu" :style="'min-height:'+(winHeight-197)+'px;'">
				<!-- <router-view /> -->

				<form>


					<div v-show="show_modle=='nginx'" style="display: flex; padding: 5px;">| Nginx全局配置</div>
					<div v-show="show_modle=='nginx'" style="display: flex; padding: 5px;">用户 </div>
					<div v-show="show_modle=='nginx'" style="display: flex;">
						<!-- <input style="width:20%;height: 12px;margin: 4px 0px 6px;" v-model="input1"/> -->
						<el-input v-model="username" size="mini" placeholder="User Name" style="width: 40%;margin: 4px 0px 6px;"></el-input>
					</div>
					<div v-show="show_modle=='nginx'" style="display: flex; padding: 5px;">工作线程数量 </div>
					<div v-show="show_modle=='nginx'" style="display: flex;">
						<el-input v-model="nginxdata.global.worker_processes" size="mini" placeholder="default" style="width: 40%;margin: 4px 0px 6px;"></el-input>
					</div>
					<div v-show="show_modle=='nginx'" style="display: flex; padding: 5px;">错误日志路径 </div>
					<div v-show="show_modle=='nginx'" style="display: flex;">
						<el-input v-model="nginxdata.errorLogPath" size="mini" placeholder="logs/error.log;" style="width: 40%;margin: 4px 0px 6px;"></el-input>
					</div>
					<div v-show="show_modle=='nginx'" style="display: flex; padding: 5px;">打开文件数量 </div>
					<div v-show="show_modle=='nginx'" style="display: flex;">
						<el-input v-model="nginxdata.global.worker_rlimit_nofile" size="mini" placeholder="8192" style="width: 40%;margin: 4px 0px 6px;"></el-input>
					</div>
					<div v-show="show_modle=='nginx'" style="display: flex; padding: 5px;">| 事件设置 </div>
					<div v-show="show_modle=='nginx'" style="display: flex; padding: 5px;">use </div>
					<div v-show="show_modle=='nginx'" style="display: flex;">
						<el-input v-model="nginxdata.events.use" size="mini" placeholder="8192" style="width: 40%;margin: 4px 0px 6px;"></el-input>
					</div>
					<div v-show="show_modle=='nginx'" style="display: flex; padding: 5px;">工作链接数量 </div>
					<div v-show="show_modle=='nginx'" style="display: flex;">
						<el-input v-model="nginxdata.events.worker_connections" size="mini" placeholder="8192" style="width: 40%;margin: 4px 0px 6px;"></el-input>
					</div>

					<div v-show="show_modle=='nginx'" style=" display: flex; justify-content: center; padding-top:22px; width: 40%; ">
						<el-button type="primary" @click="nginxupdatedata()" size="medium" style=" ">保存</el-button>

					</div>
					<!---!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! -->

					<div v-show="show_modle=='http'" style="display: flex; padding: 5px;">| HTTP全局配置基本设置</div>



					<div v-show="show_modle=='http'" v-for="(item2,index2) in httpdata.httpGoalb" :key="index2">
						<div style="display: flex; padding: 5px;">{{index2}}</div>
						<div style="display: flex;">
							<el-input v-model="httpdata.httpGoalb[index2]" size="mini" placeholder="8192" style="width: 40%;margin: 4px 0px 6px;"></el-input>
						</div>

					</div>




					<div v-show="show_modle=='http'" style="display: flex;  padding: 5px;">| 自定义配置</div>

					<div v-show="show_modle=='http'" v-for="(item2,index2) in httpdata.customConfig" :key="index2+'pz'" style="display: flex;">
						<el-input type="textarea" size="mini" :rows="2" placeholder="请输入内容" v-model="httpdata.customConfig[index2]" style="width: 40%;margin: 4px 0px 6px;">
						</el-input>
						<i class="el-icon-close" style="padding: 10px;" @click="deleteitem_customConfig(index2)"></i>
					</div>

					<div v-show="show_modle=='http'" style="display: flex;  ">
						<!-- <button  style="width:30.4%;height: 18px;margin: 4px 0px 10px;font-size: 10px;">+添加自定义配置</button> -->
						<el-button @click="add_customConfig(httpdata.customConfig)" type="primary" size="mini" style="width:40%;margin: 4px 0px 10px;background-color: #FFFFFF;color: #000000;">+添加自定义配置</el-button>
						<i class="el-icon-question" style="padding: 10px;"></i>

					</div>
					<div v-show="show_modle=='http'" style=" display: flex;  justify-content: center; padding-top:22px; width: 40%;">
						<el-button type="primary" @click="httpupdatedata()" size="medium">保存</el-button>

					</div>




				</form>


			</div>




		</div>




		<!-- <img src="./assets/logo.png"> -->
		<div>
			<!-- <el-button @click="go()">Sta1rt</el-button> -->
		</div>
		<!-- 	<router-link to="/page1">Go to page1</router-link>
<router-link to="/page2">Go to page2</router-link> -->
	</div>
</template>
<!-- <script src="https://unpkg.com/vue/dist/vue.js"></script> -->
<!-- <script src="https://unpkg.com/vue-router/dist/vue-router.js"></script> -->
<script>
	import daohang from '../components/daohang.vue';
	export default {
		components: {
			daohang,
		},
		data() {
			return {
				show_modle: "nginx",
				activeName: 'first',
				setTime: null,
				input: '',
				username: "user",
				nginxdata: {
					global: "",
					errorLogPath: "",
					events: "",
				},
				httpdata: {},
				formLabelAlign: {
					name: '',
					region: '',
					type: ''
				},
				checked: false,
				options: [{
					value: '选项1',
					label: '黄金糕'
				}, {
					value: '选项2',
					label: '双皮奶'
				}, {
					value: '选项3',
					label: '蚵仔煎'
				}, {
					value: '选项4',
					label: '龙须面'
				}, {
					value: '选项5',
					label: '北京烤鸭'
				}],
				options5: [{
					value: 'HTML',
					label: 'HTML'
				}, {
					value: 'CSS',
					label: 'CSS'
				}, {
					value: 'JavaScript',
					label: 'JavaScript'
				}],
				value10: '',
				value11: '',
			};
		},

		created() {
			var that = this;
			this.$axios.get('/test/api/apis/v1/global').then(response => {
				console.log(response, 'global')
				if (response.status >= 200 && response.status < 300) {
					this.nginxdata = response.data.body;
					console.log(response.message);
				} else {
					console.log(response.data);
				}
			})
			this.$axios.get('/test/api/apis/v1/httpglobal').then(response => {
				console.log(response, 'httpglobal')
				if (response.status >= 200 && response.status < 300) {
					this.httpdata = response.data.body;
					console.log(response.message);
				} else {
					console.log(response.data);
				}
			})



			this.activeName = "5";
			console.log('hhh')
		},


		methods: {
			// startHacking() {
			// 	this.$notify({
			// 		title: 'It works!',
			// 		type: 'success',
			// 		message: 'We\'ve laid the ground work for you. It\'s time for you to build something epic!',
			// 		duration: 5000
			// 	})
			// },

			gotonginx() {
				this.activeName = "-1";
				this.$router.push('/')
				clearInterval(this.setTime)
			},


			handleClick(tab, event) {
				// console.log(panName);
				console.log(tab.paneName);
				console.log(this.activeName);

				var str = '/page' + tab.paneName;
				console.log(str);
				if (this.activeName != 5) {
					this.$router.push(str)
					clearInterval(this.setTime)
				}
			},
			changepage(name) {
				this.show_modle = name;
			},
			nginxupdatedata() {
				var that = this;
				that.$confirm('此操作将永久修改改服务器数据, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					that.$axios.put('/test/api/apis/v1/global', that.nginxdata).then(response => {
						console.log(response, 'upstream')
						if (response.status >= 200 && response.status < 300) {
							that.$message({
								type: 'success',
								message: '修改成功!',
							});
						} else {
							console.log(response.message);
						}
					})
				}).catch(() => {
					that.$message({
						type: 'info',
						message: '已取消修改'
					});
				});
			},
			deleteitem_customConfig(line) {
				this.$confirm('此操作将删除改行数据, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$message({
						type: 'success',
						message: '删除成功!',
					});
					this.httpdata.customConfig.splice(line, 1);
					console.log(this.serversdata);
					this.$forceUpdate();
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			add_customConfig(item) {
				// item.push("");
				if (item == null) {
					this.httpdata.customConfig = [];
					console.log("item", item)
				}
				this.httpdata.customConfig.push("");
				this.$forceUpdate()
			},
			httpupdatedata() {
				var that = this;
				that.$confirm('此操作将永久修改改服务器数据, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					that.$axios.put('/test/api/apis/v1/httpglobal', that.httpdata).then(response => {
						console.log(response, 'httpdata')
						if (response.status >= 200 && response.status < 300) {
							that.$message({
								type: 'success',
								message: '修改成功!',
							});
						} else {
							console.log(response.message);
						}
					})
				}).catch(() => {
					that.$message({
						type: 'info',
						message: '已取消修改'
					});
				});
			},

		},
		destroyed() {
			clearInterval(this.setTime)
		}
	}
</script>

<style scoped>
	#app {
		font-family: Helvetica, sans-serif;
		text-align: center;
	}

	.z1 {
		height: 20px;
		padding-left: 30px;
	}

	.but1 {
		display: inline-block;

		margin: 2px;
		padding: .3em .5em;
		width: 35%;
		background-color: white;
		color: #000000;
		border: 1px solid black;
		border-radius: 0em;
		text-align: center;

	}

	.but1:hover {
		background-color: grey;
		color: white;
	}


	.but2 {
		display: inline-block;
		margin: 2px;
		padding: .3em .5em;
		width: 80%;
		background-color: white;
		color: #000000;
		border: 1px solid black;
		border-radius: 0em;
		text-align: center;
	}

	.but2:hover {
		background-color: grey;
		color: white;
	}


	.xfk1 {
		font-weight: bold;
		font-size: 14px;
	}

	.xfk2 {
		font-weight: bold;
		font-size: 18px;

		margin: 5px 0px 20px;

	}

	.input {
		align-content: center;
		align-items: center;
	}

	.el-select .el-option {
		height: 10px;
	}
</style>
