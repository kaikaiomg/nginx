<template>
<div id="app" style="display: flex; flex-flow: row wrap ;width: 100%;margin: 0px;" >
    	<daohang> </daohang>
		<div style="flex-flow: column;width: 20%;">
		<!-- 	<div @click="gotonginx()" style="width: 95%;height:40px; font-weight: bold; font-size: 20px;background-color: #F0F0F0;margin: 0 auto;align-items: center; justify-content: center; line-height:40px;">
				PaaS Nginx
			</div> -->
				
				
				
				<div class="left_menu_1">
					<div style="width: 90%;margin: 20px auto;">
						<el-input placeholder="HTTP Servers Name" v-model="searchinput" class="input-with-select" size="mini">
							<el-button slot="append" icon="el-icon-search" @click="search()"></el-button>
						</el-input>
					</div>
				</div>
				<div class="left_menu_2 topnav_box" :style="'height:'+(winHeight-218)+'px;'">
					<div v-for="(item1,index1) in limitssdata" :key="index1" style="flex-flow: column;margin: 10px auto 20px;width: 85%;">
						<el-button @click="clickitem(item1,index1)" style="width: 100%; background-color: #e7eeff; " size="mini">
							<div style=" font-size: 16px;margin: 20px 12px; font-weight: bold;   word-wrap: break-word ;    white-space: normal ;">{{item1.name}}</div>
						</el-button>
					</div>
				</div>
				<div class="left_menu_3">
					<div style="display: flex; margin: 18px auto 10px;width: 85%;">
						<el-button @click="additem()" style="width: 100%; background-color: #00c38d; border-radius: 12px; color: white; " size="mini">新增</el-button>
					</div>
				</div>
				
				
				<!-- <div style="flex-flow: column nowrap; margin: 12px auto;width: 85%;border: 1px solid black;background-color: #FFFFFF; border-radius: 3px;">
					<div style="font-size: 16px;margin: 8px 12px; font-weight: 300; ">HTTP Servers 2</div>
					<div style="font-size: 12px;margin:  0px 12px 16px; ;color: #808080;">侦听接口：8081</div>
				</div> -->




		</div>
		<div style="width: 80%;display: flex;flex-flow: column;">

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

				<form>
					<div style="display: flex;padding: 5px;">| 限流区域名称</div>
					<div  style="display: flex;">
						<!-- <input style="width:20%;height: 12px;margin: 4px 0px 6px;" v-model="input1"/> -->
						<el-input  :disabled="if_disable_flag"  v-model="itemdata.name" size="mini" placeholder="User Name" style="width: 40%;margin: 4px 0px 6px;"></el-input>
					</div>
					<div style="display: flex;padding: 5px;">| 限流匹配类型 </div>
					<div  style="display: flex;">
						<el-select  :disabled="if_disable_flag" v-model="itemdata_limitfield.type" placeholder="请选择" size="mini" style="width: 40%;margin: 4px 0px ;" >
							<el-option v-for="item in options_limitFeild" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</div>
					<div style="display: flex;padding: 5px;">| 匹配header名称</div>
					<div  style="display: flex;">
						<el-input  :disabled="if_disable_flag" v-model="itemdata_limitfield.headerName" size="mini" placeholder="logs/error.log;" style="width: 40%;margin: 4px 0px 6px;"></el-input>
					</div>
					<div style="display: flex;padding: 5px;">| 限流匹配规则</div>
					<div  style="display: flex;" v-for="(item4,index4) in itemdata_limitfield.value" :key="index4" >
						<el-input  :disabled="if_disable_flag" v-model="itemdata_limitfield.value[index4]" size="mini" placeholder="logs/error.log;" style="width: 40%;margin: 4px 0px 6px;"></el-input>
						<i class="el-icon-close" style="padding: 10px;" @click="deleteitem_xlppgz(index4)"></i>
					</div>
					<div style="display: flex;  ">
						<!-- <button  style="width:30.4%;height: 18px;margin: 4px 0px 10px;font-size: 10px;">+添加自定义配置</button> -->
						<el-button  :disabled="if_disable_flag"  @click="add_itemdata_limitfield_value(itemdata_limitfield.value)" type="primary" size="mini" style="width:40%;margin: 4px 0px 10px;background-color: #FFFFFF;color: #000000;">+添加限流匹配规则</el-button>
						<i class="el-icon-question" style="padding: 10px;"></i>
					</div>
					
					
					
					<div style="display: flex;padding: 5px;">| 限流内存区大小 </div>
					<div  style="display: flex;">
						<el-input  :disabled="if_disable_flag"  v-model="itemdata_limitfield.size" size="mini" placeholder="8192" style="width: 40%;margin: 4px 0px 6px;"></el-input>
					</div>
					
					
					
					<div style="display: flex;padding: 5px;">| 访问频次 </div>
					<div  style="display: flex;">
						<el-input  :disabled="if_disable_flag" v-model="itemdata_limitfield.rate" size="mini" placeholder="8192" style="width: 25%;margin: 4px 0px 6px;"></el-input>
					    <el-select  :disabled="if_disable_flag"  v-model="options_rate_default" placeholder="请选择" size="mini" style="width: 14%;margin: 4px 7px; " >
					    	<el-option v-for="item in options_rate" :key="item.value" :label="item.label" :value="item.value">
					    	</el-option>
					    </el-select>
					</div >
					
					
					<div style=" display: flex;  padding-top:22px;">
						<el-button type="primary" @click="updatedata()" size="mini">保存</el-button>
						<el-button type="primary" @click="deletedata()" plain size="mini">删除</el-button>
					
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
				activeName: 'first',
				setTime: null,
				input: '',
				searchinput:'',
				options_rate_default:'次/秒',
				formLabelAlign: {
					name: '',
					region: '',
					type: ''
				},
				itemdata: [],
				itemdata_limitfield:{},
				limitssdata:[],
				checked: false,
				if_disable_flag: true,
				if_update_flag: false,
				options_limitFeild:[
					{value: '选项1',label: 'head'},
					{value: '选项2',label: 'ip'}, 
				],
				options_rate: [{
					value: '选项1',
					label: '次/秒'
				}, {
					value: '选项2',
					label: '次/分钟'
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
			
			this.$axios.get('/test/api/apis/v1/limit').then(response => {
				console.log(response, 'limit')
				if (response.status >= 200 && response.status < 300) {
					this.limitssdata = response.data.body;
					console.log(response.message);
				} else {
					console.log(response.data);
				}
			});
			this.activeName = "3";
			console.log('limit')
		
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
					this.$axios.get('/test/api/apis/v1/limit/' + this.searchinput).then(response => {
						// console.log(response.data.body ,'limit')
						if (response.status >= 200 && response.status < 300) {
							this.limitssdata = response.data.body;
						} else {
							console.log(response.message);
						}
					})
				} else {
					this.$axios.get('/test/api/apis/v1/limit').then(response => {
						console.log(response, 'limit')
						if (response.status >= 200 && response.status < 300) {
							this.limitssdata = response.data.body;
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
				this.itemdata_limitfield=item.limitFeild
				console.log(item)
			},
			gotonginx() {
				this.activeName = "-1";
				this.$router.push('/')
				clearInterval(this.setTime)
			},
			additem() {
				this.if_update_flag = true;
				this.if_disable_flag = false;
				this.itemdata = {
					"name": "新增name",
					"limitFeild": {
						"type":"",
						"limitName":"",
						"headerName":"",
						"value":[],
						"rate":"",
						"size":"",
						"enable":"",
					},
				};
				this.itemdata_limitfield=this.itemdata.limitFeild
			},
		   add_itemdata_limitfield_value(item) {
		   	item.push("");
		   },
		   
		   
		   deleteitem_xlppgz(line) {
		   	this.$confirm('此操作将删除改行数据, 是否继续?', '提示', {
		   		confirmButtonText: '确定',
		   		cancelButtonText: '取消',
		   		type: 'warning'
		   	}).then(() => {
		   		this.$message({
		   			type: 'success',
		   			message: '删除成功!',
		   		});
		   		this.itemdata_limitfield.value.splice(line, 1);
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
				item.push([]);
			},



			handleClick(tab, event) {
				// console.log(panName);
				console.log(tab.paneName);
				console.log(this.activeName);

				var str = '/page' + tab.paneName;
				console.log(str);
				if (this.activeName!=3) {
					this.$router.push(str)
					clearInterval(this.setTime)
				}
			},
			
			updatedata() {
				if (this.itemdata.length == 0) {
					return 0;
				}
				var that = this;
				that.$confirm('此操作将永久修改改限流配置数据, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					
					
					if (that.if_update_flag == false) {
						that.$axios.put('/test/api/apis/v1/limit/' + that.itemdata.name, that.itemdata).then(response => {
							console.log(response, 'limit')
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
						that.$axios.post('/test/api/apis/v1/limit/' + that.itemdata.name, that.itemdata).then(response => {
							console.log(response, 'limit')
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
					that.itemdata_limitfield=[];
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
				that.$confirm('此操作将永久删除该限流配置数据, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					that.$axios.delete('/test/api/apis/v1/limit/' + that.itemdata.name, ).then(response => {
						console.log(response, 'limit')
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
					that.itemdata_limitfield=[];
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
