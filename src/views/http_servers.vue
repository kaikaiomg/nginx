<template>
<div id="app" style="display: flex; flex-flow: row wrap ;width: 100%;margin: 0px;" >
    	<daohang> </daohang>
    	
		<div  style="flex-flow: column;width: 20%;">

			<div class="left_menu_1">
				<div style="width: 90%;margin: 20px auto;">
					<el-input placeholder="HTTP Servers Name" v-model="searchinput" class="input-with-select" size="mini">
						<el-button slot="append" icon="el-icon-search" @click="search()"></el-button>
					</el-input>
				</div>
			</div>
			<div class="left_menu_2 topnav_box" :style="'height:'+(winHeight-218)+'px;'">
				<div v-for="(item1,index1) in serversdata" :key="index1" style="flex-flow: column;margin: 10px auto 20px;width: 85%;">
					<el-button @click="clickitem(item1,index1)" style="width: 100%; background-color: #e7eeff;  " size="mini">
						<div style=" font-size: 16px;margin: 8px 12px; font-weight: bold;   word-wrap: break-word ;    white-space: normal ;">{{item1.name}}</div>
						<div style="font-size: 12px;margin:  0px 12px 16px; ;color: #808080;   word-wrap: break-word ;      white-space: normal ;">端口号:{{item1.port}}</div>
					</el-button>
				</div>
			</div>
			<div class="left_menu_3">
				<div style="display: flex; margin: 18px auto 10px;width: 85%;">
					<el-button @click="additem()" style="width: 100%; background-color: #00c38d; border-radius: 12px; color: white; " size="mini">新增</el-button>
				</div>
			</div>

		</div>

		<div style="width: 80%;display: flex;flex-flow: column;">


			<div class="border8 right_menu" :style="'min-height:'+(winHeight-197)+'px;'">
				<!-- <router-view /> -->

					<div style="display: flex;  padding: 5px;">| 名称</div>
					<div style="display: flex;  ">
						<!-- <input style="width:20%;height: 12px;margin: 4px 0px 6px;" v-model="input1"/> -->
						<el-input  :disabled="if_disable_flag" v-model="itemdata.name"  size="mini" placeholder="请输入内容" style="width: 25%;margin: 4px 0px 6px;"></el-input>
					</div>
					<div style="display: flex;  padding: 5px;">| 监听端口</div>
					<div style="display: flex;  ">
						<el-input :disabled="if_disable_flag" v-model="itemdata.port" size="mini" placeholder="请输入内容" style="width: 25%;margin: 4px 0px 6px;"></el-input>
					</div>

					<div style="display: flex;  padding: 5px;">| 监控功能</div>
					<div style="display: flex;  margin: 4px 0px 12px; flex-flow:row ;align-items: center;">
						<!-- <input name="save" id="save" type="checkbox" @click="save_ck(this);" /> -->
						<el-checkbox :disabled="if_disable_flag" v-model="itemdata.enable_collect_req"></el-checkbox>&nbsp;
						<div style="font-size: 10px;"> 采集请求和相应报文</div>
					</div>
					<div style="display: flex;  padding: 5px;">| 自定义配置</div>

					<div v-for="(item2,index2) in itemdata.customConfig" :key="index2+'pz'" style="display: flex;">
						<el-input :disabled="if_disable_flag" type="textarea" size="mini" :rows="2" placeholder="请输入内容" v-model="itemdata.customConfig[index2]"
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



					<div style="display: flex;  padding: 5px;">| location列表</div>
					<div style="display: flex;" v-for="(item3,index3) in itemdata.locations" :key="index3">
						<!-- <input style="width:30%;height: 12px;margin: 4px 0px;" v-model="input1"/> -->
						<el-select :disabled="if_disable_flag" v-model="itemdata.locations[index3]" placeholder="请选择" size="mini" style="width: 25%;margin: 4px 0px ;"
						 @change="departChange">
							<el-option v-for="(item,index5) in locationsdata" :key="index5+'-'+index3" :label="item.name" :value="item.name">
							</el-option>
						</el-select>
						<el-button :disabled="if_disable_flag" type="primary" size="mini" style="width:10%;margin: 4px 0px 4px 5px;" @click="checkloaction(item3,index3)">
							查看配置
						</el-button>
						<i class="el-icon-close" style="padding: 10px;" @click="deleteitem_location(index3)"></i>

					</div>
					<div style="display: flex;  ">
						<!-- <el-button type="primary" size="mini" style="width:35%;margin: 4px 0px 10px;background-color: #FFFFFF;color: #000000;">
							+添加已有loction
						</el-button> -->

						<!-- v-model="value"  v-model='loctiontitle'   -->
						<el-select  :disabled="if_disable_flag" v-model='loctiontitle' placeholder="+添加已有loction" type="primary" size="mini" @change="addlocation($event)"
						 style=" border: 1px solid DodgerBlue; border-radius: 5px; width:36%;margin: 4px 4px 10px 0px;background-color: #FFFFFF;color: black;">
							<el-option v-for="(item,index4) in locationsdata" :key="index4+'op2'" :label="item.name" :value="item.name">
							</el-option>
						</el-select>



						<el-button  :disabled="if_disable_flag" type="primary" @click="newpage()" size="mini" style="width:25%;margin: 4px 7px 10px;background-color: #FFFFFF;color: #000000;">
							前往创建location
						</el-button>
						<i class="el-icon-question" style="padding: 10px;"></i>
					</div>

					<div style=" display: flex;  padding-top:22px;">
						<el-button type="primary" @click="updatedata()" size="mini">保存</el-button>
						<el-button type="primary" @click="deletedata()" plain size="mini">删除</el-button>

					</div>





			</div>




		</div>




		<!-- <img src="./assets/logo.png"> -->


		<el-dialog title="Loction" :visible.sync="dialogTableVisible" :center=true>
			<div style="display: flex; padding: 5px;">| 名称</div>
			<div style="display: flex;">
				<!-- <input style="width:20%;height: 12px;margin: 4px 0px 6px;" v-model="input1"/> -->
				<el-input disabled v-model="checkloactiondata.name" size="mini" placeholder="Loction Name" style="width: 40%;margin: 4px 0px 6px;"></el-input>
			</div>
			<div style="display: flex; padding: 5px;">| 匹配路径 </div>
			<div style="display: flex;">
				<el-input disabled v-model="checkloactiondata.path" size="mini" placeholder="/cus/" style="width: 40%;margin: 4px 0px 6px;"></el-input>
			</div>
			<div style="display: flex; padding: 5px;">| 灰度配置 &nbsp; &nbsp;
				<el-checkbox disabled v-model="checkloactiondata.enableSwitchFlow" size="mini">开启</el-checkbox>
			</div>
			<div v-show="checkloactiondata.enableSwitchFlow" style="display: flex;padding: 5px;">灰度策略选择 </div>
			<div v-show="checkloactiondata.enableSwitchFlow" style="display: flex;">
				<el-select disabled v-model="checkloactiondata.strategyName" multiple filterable allow-create default-first-option
				 placeholder="请选择文章标签" size="medium" style="width: 50%;margin: 4px 0px 6px;">
					<el-option v-for="item in checkloactiondata.strategyName" :key="item" :label="item" :value="item">
					</el-option>
				</el-select>
			</div>
			<div style="display: flex;padding: 5px;">| 限速配置 &nbsp; &nbsp;
				<el-checkbox disabled v-model="checkloactiondata.enableLimit" size="mini">开启</el-checkbox>
			</div>
			<div v-show="checkloactiondata.enableLimit" style="display: flex;padding: 5px;">限流策略选择 </div>
			<div v-show="checkloactiondata.enableLimit" style="display: flex;margin: 4px 0px 6px;">
				<el-select  disabled v-model="checkloactiondata.limitName" clearable placeholder="请选择" size="mini" style="width: 40%; ">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</div>
			<div v-show="checkloactiondata.enableLimit" style="display: flex;padding: 5px;">burst</div>
			<div v-show="checkloactiondata.enableLimit" style="display: flex;">
				<el-input v-model="checkloactiondata.burst" size="mini" placeholder="10" style="width: 40%;margin: 4px 0px 6px;"></el-input>
			</div>
			<div v-show="checkloactiondata.enableLimit" style="display: flex;padding: 5px;">是否开启 enableNodelay &nbsp; &nbsp;
				<el-checkbox disabled v-model="checkloactiondata.enable_no_delay" size="mini">开启</el-checkbox>
			</div>
			<div v-show="checkloactiondata.enableLimit" style="display: flex;padding: 5px;">限制请求状态 </div>
			<div v-show="checkloactiondata.enableLimit" style="display: flex;">
				<el-select disabled v-model="checkloactiondata.repStatus" clearable placeholder="429" size="mini" style="width: 40%;margin: 4px 0px 6px;">
					<el-option v-for="item in xzqqzt_options" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</div>

			<div style="display: flex;padding: 5px;">| 代理模式选择 &nbsp; &nbsp;
				<el-checkbox disabled v-model="checkloactiondata.enableStaticProxy" size="mini">静态文件代理</el-checkbox>
				<el-checkbox disabled  v-model="checkloactiondata.enableServerProxy" size="mini">服务器代理</el-checkbox>
			</div>
			<div v-show="checkloactiondata.enableStaticProxy" style="display: flex;padding: 5px;">静态文件代理路径</div>
			<div v-show="checkloactiondata.enableStaticProxy" style="display: flex;">
				<el-input disabled v-model="checkloactiondata.staticProxyPath" size="mini" placeholder="10" style="width: 40%;margin: 4px 0px 6px;"></el-input>
			</div>
			<div v-show="checkloactiondata.enableStaticProxy" style="display: flex; padding: 5px;">静态文件名称</div>
			<div v-show="checkloactiondata.enableStaticProxy" style="display: flex;">
				<el-input disabled  v-model="checkloactiondata.staticProxyName" size="mini" placeholder="10" style="width: 40%;margin: 4px 0px 6px;"></el-input>
			</div>
			<div v-show="checkloactiondata.enableServerProxy" style="display: flex;padding: 5px;">Host</div>
			<div v-show="checkloactiondata.enableServerProxy" style="display: flex;">
				<el-input disabled v-model="checkloactiondata.serverProxyHost" size="mini" placeholder="10" style="width: 40%;margin: 4px 0px 6px;"></el-input>
			</div>
			<div v-show="checkloactiondata.enableServerProxy" style="display: flex;padding: 5px;">代理服务器地址</div>
			<div v-show="checkloactiondata.enableServerProxy" style="display: flex;">
				<el-input  disabled v-model="checkloactiondata.ServerProxyAddress" size="mini" placeholder="10" style="width: 40%;margin: 4px 0px 6px;"></el-input>
			</div>
		</el-dialog>
		<!-- <el-button @click="go()">Sta1rt</el-button> -->

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
				activeName: 'first',
				setTime: null,
				searchinput: '',
				serversdata: [],
				locationsdata: [],
				if_update_flag: false,
				checkloactiondata: [],
				loctiontitle: "+添加已有loction",
				dialogTableVisible: false,
				if_disable_flag: true,
				itemdata: [],
				input: '',
				xzqqzt_options: [{
					value: '4291',
					label: '429'
				}, ],
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
			};
		},

		created() {
			var that = this;

			this.$axios.get('/test/api/apis/v1/server').then(response => {
				console.log(response, 'server')
				if (response.status >= 200 && response.status < 300) {
					this.serversdata = response.data.body;
					console.log(response.message);
				} else {
					console.log(response.data);
				}
			})
			this.$axios.get('/test/api/apis/v1/location').then(response => {
				console.log(response, 'location')
				if (response.status >= 200 && response.status < 300) {
					this.locationsdata = response.data.body;
					console.log(response.data);
				} else {
					console.log(response.message);
				}
			})


			// this.$api.get('/test/api/apis/v1/server', {
			// 	// "name": this.searchinput
			// }, response => {
			// 	if (response.status >= 200 && response.status < 300) {
			// 		this.serversdata = response.data.body.httpServers;
			// 		console.log('dd',response.data);
			// 	} else {
			// 		console.log(response.message);
			// 				console.log('dd',response);
			// 	}
			// });

			// this.$api.get('/test/api/apis/v1/location', {},
			// 	response => {
			// 		if (response.status >= 200 && response.status < 300) {
			// 			this.locationsdata = response.data.body.locations;
			// 		} else {
			// 			console.log(response.message);
			// 		}
			// 	});
			this.activeName = "0";
			console.log('server')

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
					this.$axios.get('/test/api/apis/v1/server/' + this.searchinput).then(response => {
						// console.log(response.data.body ,'server')
						if (response.status >= 200 && response.status < 300) {
							this.serversdata = response.data.body;
						} else {
							console.log(response.message);
						}
					})
				} else {
					this.$axios.get('/test/api/apis/v1/server').then(response => {
						console.log(response, 'server')
						if (response.status >= 200 && response.status < 300) {
							this.serversdata = response.data.body;
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

			additem() {
				this.if_update_flag = true;
				this.if_disable_flag = false;
				this.itemdata = {
					"name": "新增name",
					"port": " ",
					"enable_collect_req": "",
					"customConfig": [],
					"locations": []
				};
			},
			clickitem(item, index) {
				this.itemdata = item;
				this.if_disable_flag = false;
				this.if_update_flag = false;
				console.log(item)
			},
			gotonginx() {
				this.activeName = "-1";
				this.$router.push('/')
				clearInterval(this.setTime)
			},

			departChange(val) {
				// 改变时获取id通过id查询当前部门的人员
				//  API.getHead(val)
				// .then(res => {
				//   this.value10 = res.data;
				// })
				// .catch(err => {
				//   console.error(err);
				// });
				console.log('ss')
				this.$forceUpdate()
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
			deleteitem_location(line) {

				this.$confirm('此操作将删除改行数据, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$message({
						type: 'success',
						message: '删除成功!',
					});
					this.itemdata.locations.splice(line, 1);
					this.$forceUpdate();
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});


			},

			add_customConfig(item) {
				if(item==null){
					this.itemdata.customConfig=[];
					
				}
				console.log("item",item)
				this.itemdata.customConfig.push("");
				this.$forceUpdate()
			},
			addlocation(f) {
				// alert(f);
				// console.log(f)
				var that = this;
				if (this.itemdata.length == 0) {
					that.loctiontitle = "+添加已有loction";
					return 0;
				}
				if (this.itemdata.locations.indexOf(f) > -1) {
					that.loctiontitle = "+添加已有loction";
					return 0;
				}
				// console.log(this.loctiontitle)
				that.loctiontitle = "+添加已有loction";
				this.itemdata.locations.push(f);
				this.$forceUpdate()
			},
			updatedata() {
				if (this.itemdata.length == 0) {
					return 0;
				}
				var that = this;
				that.$confirm('此操作将永久修改改服务器数据, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					
					
					if (that.if_update_flag == false) {
						that.$axios.put('/test/api/apis/v1/server/' + that.itemdata.name, that.itemdata).then(response => {
							console.log(response, 'server')
							if (response.status >= 200 && response.status < 300) {
								that.$message({
									type: 'success',
									message: '修改成功!',
								});
							} else {
								console.log(response.message);
							}
						})
					}
					else{
						that.$axios.post('/test/api/apis/v1/server/' + that.itemdata.name, that.itemdata).then(response => {
							console.log(response, 'server')
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
				that.$confirm('此操作将永久删除该服务器数据, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					that.$axios.delete('/test/api/apis/v1/server/' + that.itemdata.name, ).then(response => {
						console.log(response, 'server')
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
			checkloaction(item, index) {
				console.log(index)
				this.dialogTableVisible = true
				this.checkloactiondata = this.locationsdata[index];
			},


			newpage() {
				let newpage = this.$router.resolve({
					path: '/page2',
					query: {}
				})
				window.open(newpage.href, '_blank');
			},

			handleClick(tab, event) {
				// console.log(panName);
				console.log(tab.paneName);
				console.log(this.activeName);

				var str = '/page' + tab.paneName;
				console.log(str);
				if (this.activeName != 0) {
					this.$router.push(str)
					clearInterval(this.setTime)
				}
			}
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

	/* div {
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

	input::-webkit-input-placeholder {
		font-size: 12px;
		color: red
	}



	/* 整体样式 */
</style>
