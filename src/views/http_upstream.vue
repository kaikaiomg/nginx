<template>

	<div id="app" style="display: flex; flex-flow: row wrap ;width: 100%;margin: 0px;">
		<daohang> </daohang>

		<div style="display: flex; flex-flow: column;width: 20%;">
			
			<div class="left_menu_1">
				<div style="width: 90%;margin: 20px auto;">
					<el-input placeholder="HTTP Servers Name" v-model="searchinput" class="input-with-select" size="mini">
						<el-button slot="append" icon="el-icon-search" @click="search()"></el-button>
					</el-input>
				</div>
			</div>
			<div class="left_menu_2 topnav_box" :style="'height:'+(winHeight-218)+'px;'">
				<div v-for="(item1,index1) in upstreamsdata" :key="index1" style="flex-flow: column;margin: 10px auto 20px;width: 85%;">
					<el-button @click="clickitem(item1,index1)" style="width: 100%; background-color: #e7eeff; " size="mini">
						<div style=" font-size: 16px;margin: 20px 12px; font-weight: bold;   word-wrap: break-word ;    white-space: normal ;">{{item1.name}}</div>
						<!-- 								<div style="font-size: 12px;margin:  0px 12px 16px; ;color: #808080;   word-wrap: break-word ;      white-space: normal ;">端口号:{{item1.port}}</div>
 -->
					</el-button>
				</div>
			</div>
			<div class="left_menu_3">
				<div style="display: flex; margin: 18px auto 10px;width: 85%;">
					<el-button @click="additem()" style="width: 100%;  background-color: #00c38d; border-radius: 12px; color: white;  " size="mini">新增</el-button>
				</div>
			</div>




		</div>
		<div style=" display: flex; width: 80%;display: flex;flex-flow: column;">

			<!-- <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
				<el-tab-pane label="HTTP Servers"></el-tab-pane>
				<el-tab-pane label="HTTP Upstreams"></el-tab-pane>
				<el-tab-pane label="Loctions"></el-tab-pane>
				<el-tab-pane label="限流配置"></el-tab-pane>
				<el-tab-pane label="灰度策略"></el-tab-pane>
				<el-tab-pane label="全局配置"></el-tab-pane>


			</el-tabs> -->

			<div class="border8 right_menu" :style="'min-height:'+(winHeight-197)+'px;'">
				<!-- <router-view /> -->

				<!-- <form style="align-items: flex-start"> -->
				<div style="display: flex; align-content: flex-start;  padding: 5px; ">| 名称</div>
				<div style="display: flex; align-content: flex-start; ">
					<!-- <input style="width:20%;height: 12px;margin: 4px 0px 6px;" v-model="input1"/> -->
					<el-input :disabled="if_disable_flag" v-model="itemdata.name" size="mini" placeholder="HTTP Upstream Name" style="width: 25%;margin: 4px 0px 6px;"></el-input>
				</div>

				<div style="display: flex; align-content: flex-start; padding: 5px;">| 自定义配置</div>
				<!-- 		<div  style="display: flex; align-content: flex-start; ">
						<el-input type="textarea" size="mini" :rows="2" placeholder="请输入内容" v-model="input" style="width: 35%;margin: 4px 0px 6px;">
						</el-input>
						<i class="el-icon-close" style="padding: 10px;"></i>
					</div>
					<div  style="display: flex; align-content: flex-start; ">
						<el-button type="primary" size="mini" style="width:35%;
						margin: 4px 0px 10px;background-color: #FFFFFF;color: #000000;">+添加自定义配置</el-button>
						<i class="el-icon-question" style="padding: 10px;"></i>

					</div> -->
				<div v-for="(item2,index2) in itemdata.customConfig" :key="index2" style="display: flex;">
					<el-input :disabled="if_disable_flag" type="textarea" size="mini" :rows="1" placeholder="请输入内容" v-model="itemdata.customConfig[index2]"
					 style="width: 35%;margin: 4px 0px 6px;">
					</el-input>
					<i class="el-icon-close" style="padding: 10px;" @click="deleteitem_customConfig(index2)"></i>
				</div>

				<div style="display: flex;  ">
					<!-- <button  style="width:30.4%;height: 18px;margin: 4px 0px 10px;font-size: 10px;">+添加自定义配置</button> -->
					<el-button :disabled="if_disable_flag" @click="add_customConfig(itemdata.customConfig)" type="primary" size="mini"
					 style="width:35%;margin: 4px 0px 10px;background-color: #FFFFFF;color: #000000;">+添加自定义配置</el-button>
					<i class="el-icon-question" style="padding: 10px;"></i>

				</div>


				<div style="display: flex; align-content: flex-start; padding: 5px;">| 服务器配置</div>

				<el-table :data="itemdata.serverConfig" border style="display: table-cell; width: 721px; " size='mini'>
					<el-table-column prop="ip" label="ip" width="160">
						<template slot-scope="scope">
							<el-input v-model="scope.row.ip" size="mini" placeholder=""></el-input>
						</template>
					</el-table-column>
					<el-table-column prop="port" label="端口" width="130">
						<template slot-scope="scope">
							<el-input v-model="scope.row.port" size="mini" placeholder=""></el-input>
						</template>
					</el-table-column>
					<el-table-column prop="retry" label="最大重试次数" width="130">
						<template slot-scope="scope">
							<el-input v-model="scope.row.retry	" size="mini" placeholder=""></el-input>
						</template>
					</el-table-column>
					<el-table-column prop="timeout" label="超时时间" width="130">
						<template slot-scope="scope">
							<el-input v-model="scope.row.timeout" size="mini" placeholder=""></el-input>
						</template>
					</el-table-column>

					<el-table-column prop="cahozuo" label="操作" width="170">
						<template slot-scope="scope">
							<el-button @click="shanchucaozuo(scope.$index)" type="text" size="small">删除</el-button>
						</template>
					</el-table-column>
				</el-table>

				<div style="display: flex; align-content: flex-start; ">

					<el-button :disabled="if_disable_flag" type="primary" size="mini" style="width: 720px; background-color: #FFFFFF;color: grey;border:#F5F5F5 1px solid "
					 @click="addline()">+新增</el-button>
				</div>




				<div style=" display: flex;  padding-top:22px;">
					<el-button type="primary" @click="updatedata()" size="mini">保存</el-button>
					<el-button type="primary" @click="deletedata()" plain size="mini">删除</el-button>

				</div>



				<!-- </form> -->


			</div>




		</div>




		<!-- <img src="./assets/logo.png"> -->
		<!-- <div v-show="dialogVisible" style="z-index: 100;justify-content: center; flex-flow: column; width: 300px;height: 170px;
			position:fixed;top:50%;left:50%;transform:translateX(-50%) translateY(-50%);
			background-color: #F5F5F5; border:1px solid #000000;border-radius: 5px;">
			<div style="justify-content: center;font-size: 20px;padding: 10px;font-weight: 400;">提示</div>
			<div style="justify-content: center; padding: 10px;">是否要删除本行?</div>
			<div style="justify-content: center;padding: 15px;">
				<el-button size="mini" type="primary" @click="dialogVisible = false">确 定</el-button>
				<el-button size="mini" @click="dialogVisible = false">取 消</el-button>
			</div>

		</div> -->
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
				dialogVisible: false,
				activeName: 'first',
				setTime: null,
				if_disable_flag: true,
				if_update_flag: false,
				input: '',
				searchinput: '',
				upstreamsdata: [],
				itemdata: [],
				formLabelAlign: {
					name: '',
					region: '',
					type: ''
				},
				checked: false,


			};
		},

		created() {
			var that = this;
			this.$axios.get('/test/api/apis/v1/upstream').then(response => {
				console.log(response, 'upstream')
				if (response.status >= 200 && response.status < 300) {
					this.upstreamsdata = response.data.body;
					console.log(response.message);
				} else {
					console.log(response.data);
				}
			})
			this.activeName = "1";
			console.log('upstream');

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
			search() {
				// alert(this.input)
				if (this.searchinput != "") {
					// alert(this.searchinput)
					this.$axios.get('/test/api/apis/v1/upstream/' + this.searchinput).then(response => {
						// console.log(response.data.body ,'upstream')
						if (response.status >= 200 && response.status < 300) {
							this.upstreamsdata = response.data.body;
						} else {
							console.log(response.message);
						}
					})
				} else {
					this.$axios.get('/test/api/apis/v1/upstream').then(response => {
						console.log(response, 'upstream')
						if (response.status >= 200 && response.status < 300) {
							this.upstreamsdata = response.data.body;
							console.log(response);
						} else {
							console.log(response.message);
						}
					})
				}
				this.itemdata = [];
				this.if_disable_flag = true;
				this.if_update_flag = false;
				this.$forceUpdate();
			},
			clickitem(item, index) {
				this.if_disable_flag = false;
				this.if_update_flag = false;
				this.itemdata = item;
				console.log(item)
			},
			shanchucaozuo(line) {

				this.$confirm('此操作将永久删除改行数据, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$message({
						type: 'success',
						message: '删除成功!',
					});
					this.itemdata.serverConfig.splice(line, 1);
					console.log(line);
					this.$forceUpdate();
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			addline() {

				this.itemdata.serverConfig.push([])
				this.$forceUpdate();
			},
			gotonginx() {
				this.activeName = "-1";
				this.$router.push('/')
				// clearInterval(this.setTime)
			},
			additem() {
				this.if_update_flag = true;
				this.if_disable_flag = false;
				this.itemdata = {
					"name": "新增name",
					"customConfig": [],
					"serverConfig": []
				};
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
					this.itemdata.customConfig.splice(line, 1);
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
				if (item == null) {
					this.itemdata.customConfig = [];
					console.log("item", item)
				}
				this.itemdata.customConfig.push("");
				this.$forceUpdate()
			},

			updatedata() {
				if (this.itemdata.length == 0) {
					return 0;
				}
				var that = this;
				that.$confirm('此操作将永久修改改upstream数据, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {


					if (that.if_update_flag == false) {
						that.$axios.put('/test/api/apis/v1/upstream/' + that.itemdata.name, that.itemdata).then(response => {
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
					} else {
						that.$axios.post('/test/api/apis/v1/upstream/' + that.itemdata.name, that.itemdata).then(response => {
							console.log(response, 'upstream')
							if (response.status >= 200 && response.status < 300) {
								that.$message({
									type: 'success',
									message: '添加成功!',
								});
							} else {
								console.log(response.message);
							}
						})

					}

					that.itemdata = [];
					that.if_disable_flag = true;
					that.if_update_flag = false;
					that.search();

					that.$forceUpdate();
				}).catch(() => {
					that.$message({
						type: 'info',
						message: '已取消修改'
					});
				});
			},
			deletedata() {
				if (this.itemdata.length == 0) {
					return 0;
				}
				var that = this;
				that.$confirm('此操作将永久删除该upstream数据, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					that.$axios.delete('/test/api/apis/v1/upstream/' + that.itemdata.name, ).then(response => {
						console.log(response, 'upstream')
						if (response.status >= 200 && response.status < 300) {
							that.$message({
								type: 'success',
								message: '删除成功!',
							});
						} else {
							console.log(response.message);
						}
					})
					that.itemdata = [];
					that.if_disable_flag = true;
					that.if_update_flag = false;
					that.search();
					that.$forceUpdate();
				}).catch(() => {
					that.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},


			handleClick(tab, event) {
				// console.log(panName);
				console.log(tab.paneName);
				console.log(this.activeName);

				var str = '/page' + tab.paneName;
				console.log(str);
				if (this.activeName != 1) {
					this.$router.push(str)
					clearInterval(this.setTime)
				}
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

	/* 
	div {
		display: flex;
	} */


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
