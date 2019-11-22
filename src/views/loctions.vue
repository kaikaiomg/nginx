<template>
<div id="app" style="display: flex; flex-flow: row wrap ;width: 100%;margin: 0px;" >
    	<daohang> </daohang>
		<div style="flex-flow: column;width: 20%;">

				<div class="left_menu_1">
					<div style="width: 90%;margin: 20px auto;">
						<el-input placeholder="HTTP Servers Name" v-model="searchinput" class="input-with-select" size="mini">
							<el-button slot="append" icon="el-icon-search" @click="search()"></el-button>
						</el-input>
					</div>
				</div>
				<div class="left_menu_2 topnav_box" :style="'height:'+(winHeight-218)+'px;'">
					<div v-for="(item1,index1) in locationsdata" :key="index1" style="flex-flow: column;margin: 10px auto 20px;width: 85%;">
						<el-button @click="clickitem(item1,index1)" style="width: 100%; background-color: #e7eeff; " size="mini">
							<div style=" font-size: 16px;margin: 20px 12px; font-weight: bold;   word-wrap: break-word ;    white-space: normal ;">{{item1.name}}</div>
						</el-button>
					</div>
				</div>
				<div class="left_menu_3">
					<div style="display: flex; margin: 18px auto 10px;width: 85%;">
						<el-button @click="additem()" style="width: 100%;  background-color: #00c38d; border-radius: 12px; color: white; " size="mini">新增</el-button>
					</div>
				</div>








		</div>
		<div style="width: 80%;display: flex;flex-flow: column;">

		<!-- 	<el-tabs v-model="activeName" type="card" @tab-click="handleClick">
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
					<div style="display: flex; padding: 5px;">| 名称</div>
					<div style="display: flex;">
						<!-- <input style="width:20%;height: 12px;margin: 4px 0px 6px;" v-model="input1"/> -->
						<el-input :disabled="if_disable_flag" v-model="itemdata.name" size="mini" placeholder="Loction Name" style="width: 40%;margin: 4px 0px 6px;"></el-input>
					</div>
					<div style="display: flex; padding: 5px;">| 匹配路径 </div>
					<div style="display: flex;">
						<el-input :disabled="if_disable_flag" v-model="itemdata.path" size="mini" placeholder="/cus/" style="width: 40%;margin: 4px 0px 6px;"></el-input>
					</div>
					<div style="display: flex; padding: 5px;">| 灰度配置 &nbsp; &nbsp;
						<el-checkbox  :disabled="if_disable_flag" v-model="itemdata.enableSwitchFlow" size="mini">开启</el-checkbox>
					</div>
					<div v-show="itemdata.enableSwitchFlow" style="display: flex;padding: 5px;">灰度策略选择 </div>
					<div v-show="itemdata.enableSwitchFlow" style="display: flex;">
						<el-select  :disabled="if_disable_flag" v-model="itemdata.strategyName" multiple filterable allow-create default-first-option placeholder="请选择文章标签"
						 size="medium" style="width: 50%;margin: 4px 0px 6px;">
							<el-option v-for="item in huidudata" :key="item.value" :label="item.name" :value="item.name">
							</el-option>
						</el-select>
					</div>
					<div style="display: flex;padding: 5px;">| 限速配置 &nbsp; &nbsp;
						<el-checkbox  :disabled="if_disable_flag" v-model="itemdata.enableLimit" size="mini">开启</el-checkbox>
					</div>
					<div v-show="itemdata.enableLimit" style="display: flex;padding: 5px;">限流策略选择 </div>
					<div v-show="itemdata.enableLimit" style="display: flex;margin: 4px 0px 6px;">
						<el-select :disabled="if_disable_flag" v-model="itemdata.limitName" clearable placeholder="请选择" size="mini" style="width: 40%; ">
							<el-option v-for="item in limitssdata" :key="item.value" :label="item.name" :value="item.name">
							</el-option>
						</el-select>
					</div>
					<div v-show="itemdata.enableLimit" style="display: flex;padding: 5px;">burst</div>
					<div v-show="itemdata.enableLimit" style="display: flex;">
						<el-input :disabled="if_disable_flag" v-model="itemdata.burst" size="mini" placeholder="10" style="width: 40%;margin: 4px 0px 6px;"></el-input>
					</div>
					<div v-show="itemdata.enableLimit" style="display: flex;padding: 5px;">是否开启 enableNodelay &nbsp; &nbsp;
						<el-checkbox :disabled="if_disable_flag"  v-model="itemdata.enable_no_delay" size="mini">开启</el-checkbox>
					</div>
					<div v-show="itemdata.enableLimit" style="display: flex;padding: 5px;">限制请求状态 </div>
					<div v-show="itemdata.enableLimit" style="display: flex;">
						<el-select  :disabled="if_disable_flag" v-model="itemdata.repStatus" clearable placeholder="429" size="mini" style="width: 40%;margin: 4px 0px 6px;">
							<el-option v-for="item in xzqqzt_options" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</div>

					<div style="display: flex;padding: 5px;">| 代理模式选择 &nbsp; &nbsp;
					 <el-checkbox-group :disabled="if_disable_flag"  :min="0" :max="1" v-model="choice_group" @change="choice_dailimode" >
						   <el-checkbox v-for="choice in choice_Options" :label="choice" :key="choice">{{choice}}</el-checkbox>
					  </el-checkbox-group>
					</div>
					<!-- 	<div style="display: flex;padding: 5px;">| 代理模式选择 &nbsp; &nbsp;
						<template>
						  <el-radio v-model="jingtaiwenjianflag"  size="mini" label="1">静态文件代理</el-radio>
						  <el-radio v-model="wufuqidailiflag"  size="mini" label="2">服务器代理</el-radio>
						</template>
					</div> -->
					<div v-show="choice_group[0]=='静态文件代理'" style="display: flex;padding: 5px;">静态文件代理路径</div>
					<div v-show="choice_group[0]=='静态文件代理'" style="display: flex;">
						<el-input :disabled="if_disable_flag" v-model="itemdata.staticProxyPath" size="mini" placeholder="10" style="width: 40%;margin: 4px 0px 6px;"></el-input>
					</div>
					<div v-show="choice_group[0]=='静态文件代理'" style="display: flex; padding: 5px;">静态文件名称</div>
					<div v-show="choice_group[0]=='静态文件代理'" style="display: flex;">
						<el-input :disabled="if_disable_flag" v-model="itemdata.staticProxyName" size="mini" placeholder="10" style="width: 40%;margin: 4px 0px 6px;"></el-input>
					</div>
					<div v-show="choice_group[0]=='服务器代理'" style="display: flex;padding: 5px;">Host</div>
					<div v-show="choice_group[0]=='服务器代理'" style="display: flex;">
						<!-- 						<el-input v-model="itemdata.serverProxyHost" size="mini" placeholder="10" style="width: 40%;margin: 4px 0px 6px;"></el-input>
 -->					<el-input :disabled="if_disable_flag" v-model="itemdata.serverProxyHost" size="mini" placeholder="" style="width: 40%;margin: 4px 0px 6px;"></el-input>
					</div>
					<div v-show="choice_group[0]=='服务器代理'" style="display: flex;padding: 5px;">代理服务器地址</div>
					<div v-show="choice_group[0]=='服务器代理'" style="display: flex;">
						<el-input :disabled="if_disable_flag" v-model="itemdata.ServerProxyAddress" size="mini" placeholder="10" style="width: 40%;margin: 4px 0px 6px;"></el-input>
					</div>
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
				choice_group: [],
				choice_Options : ['静态文件代理', '服务器代理',],
				searchinput: '',
				locationsdata: [],
				upstreamsdata: [],
				huidudata:[],
				limitssdata:[],
				itemdata: [],
				huiduflag: false,
				xiansuflag: false,
				jingtaiwenjianflag: false,
				wufuqidailiflag: false,
				if_disable_flag: true,
				if_update_flag: false,
				formLabelAlign: {
					name: '',
					region: '',
					type: ''
				},
				value101: [],
				checked: false,
				xzqqzt_options: [{
					value: '4291',
					label: '429'
				}, ],
				upstream_options: [],
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
			this.$axios.get('/test/api/apis/v1/upstream').then(response => {
				console.log(response, 'upstream')
				if (response.status >= 200 && response.status < 300) {
					this.upstreamsdata = response.data.body;
					// console.log(response.message);
				} else {
					// console.log(response.data);
				}
			})
			this.$axios.get('/test/api/apis/v1/strategy').then(response => {
				console.log(response, 'strategy')
				if (response.status >= 200 && response.status < 300) {
					this.huidudata = response.data.body;
				} else {
					// console.log(response.data);
				}
			})
			this.$axios.get('/test/api/apis/v1/location').then(response => {
				console.log(response, 'location')
				if (response.status >= 200 && response.status < 300) {
					this.locationsdata = response.data.body;
					// console.log(response.message);
				} else {
					// console.log(response.data);
				}
			})

			this.$axios.get('/test/api/apis/v1/limit').then(response => {
				console.log(response, 'limit')
				if (response.status >= 200 && response.status < 300) {
					this.limitssdata = response.data.body;
					// console.log(response.message);
				} else {
					// console.log(response.data);
				}
			});

			this.activeName = "2";
			
			
		},
		methods: {
			search() {
				// alert(this.input)
				if (this.searchinput != "") {
					// alert(this.searchinput)
					this.$axios.get('/test/api/apis/v1/location/' + this.searchinput).then(response => {
						// console.log(response.data.body ,'location')
						if (response.status >= 200 && response.status < 300) {
							this.locationsdata = response.data.body;
						} else {
							console.log(response.message);
						}
					})
				} else {
					this.$axios.get('/test/api/apis/v1/location').then(response => {
						console.log(response, 'location')
						if (response.status >= 200 && response.status < 300) {
							this.locationsdata = response.data.body;
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
				// console.log(this.locationsdata[index])
				this.if_disable_flag = false;
				this.if_update_flag = false;
				this.itemdata = item;
				console.log(this.itemdata)
				this.choice_group=[]
				if (this.itemdata.staticProxyPath) {
					this.choice_group[0]=this.choice_Options[0]
				} 
				else if(this.itemdata.serverProxyHost){
					this.choice_group[0]=this.choice_Options[1]
				}
				this.$forceUpdate()
			},

			gotonginx() {
				this.activeName = "-1";
				this.$router.push('/')
				clearInterval(this.setTime)
			},
			
			updatedata() {
				if (this.itemdata.length == 0) {
					return 0;
				}
				var that = this;
				that.$confirm('此操作将永久修改改location数据, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					
					
					if (that.if_update_flag == false) {
						that.$axios.put('/test/api/apis/v1/location/' + that.itemdata.name, that.itemdata).then(response => {
							console.log(response, 'location')
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
						that.$axios.post('/test/api/apis/v1/location/' + that.itemdata.name, that.itemdata).then(response => {
							console.log(response, 'location')
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
				that.$confirm('此操作将永久删除该location数据, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					that.$axios.delete('/test/api/apis/v1/location/' + that.itemdata.name, ).then(response => {
						console.log(response, 'location')
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
			
			choice_dailimode(mode){
				console.log(mode[0])
				if (mode[0]==this.choice_Options[0]) {
					this.itemdata.serverProxyHost=null;
					this.itemdata.ServerProxyAddress=null;
					console.log('deleteServerProxyHost')
				} 
				else if(mode[0]==this.choice_Options[1]){
					this.itemdata.staticProxyName=null;
					this.itemdata.staticProxyPath=null;
					console.log('deletestaticProxyPath')
				}
			},
			additem() {
				this.if_update_flag = true;
				this.if_disable_flag = false;
				this.itemdata = {
					"name": "新增name",
					"path": "",
					"enableSwitchFlow": false,
					"strategyName": [],
					"enableLimit": false,
					"limitName": "",
					"burst": "",
					"repStatus": "",
					"enable_no_delay": false,
					"enableStaticProxy": false,
					"staticProxyPath": "",
					"staticProxyName": "",
					"enableServerProxy": false,
					"serverProxyHost": "",
					"ServerProxyAddress": "",

				};
			},
			handleClick(tab, event) {
				// console.log(panName);
				console.log(tab.paneName);
				console.log(this.activeName);

				var str = '/page' + tab.paneName;
				console.log(str);
				if (this.activeName != 2) {
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
