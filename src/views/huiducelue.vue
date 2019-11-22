<template>
<div id="app" style="display: flex; flex-flow: row wrap ;width: 100%;margin: 0px;" >
    	<daohang> </daohang>

		<div style="display: flex;  flex-flow: column;width: 20%;">
<!-- 			<div @click="gotonginx()" style="width: 95%;height:40px; font-weight: bold; font-size: 20px;background-color: #F0F0F0;margin: 0 auto;align-items: center; justify-content: center; line-height:40px;">
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
					<div v-for="(item1,index1) in huidudata" :key="index1" style="flex-flow: column;margin: 10px auto 20px;width: 85%;">
						<el-button @click="clickitem(item1,index1)" style="width: 100%;  background-color: #e7eeff; " size="mini">
							<div style=" font-size: 16px;margin: 20px 12px; font-weight: bold;   word-wrap: break-word ;    white-space: normal ;">{{item1.name}}</div>
						</el-button>
					</div>
				</div>
				<div class="left_menu_3">
					<div style="display: flex; margin: 18px auto 10px;width: 85%;">
						<el-button @click="additem()" style="width: 100%;background-color: #00c38d; border-radius: 12px; color: white; " size="mini">新增</el-button>
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

				<div style="display: flex;align-content: flex-start; padding: 5px;">| 策略名称</div>
				<div style="display: flex;align-content: flex-start; ">
					<!-- <input style="width:20%;height: 12px;margin: 4px 0px 6px;" v-model="input1"/> -->
					<el-input :disabled="if_disable_flag"  v-model="itemdata.name" size="mini" placeholder="灰度策略名称" style="width: 40%;margin: 4px 0px 6px;"></el-input>
				</div>
				<div style="display: flex;align-content: flex-start;  padding: 5px;">| 策略模式 </div>
				<div style="display: flex;">
					<el-select  :disabled="if_disable_flag" v-model="itemdata.mode" placeholder="请选择" size="mini" style="width: 40%;margin: 4px 0px ;">
						<el-option v-for="item in options_mode" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</div>
				<div style="display: flex;align-content: flex-start;  padding: 5px;">| 变量配置</div>
				<div style="display: flex;align-content: flex-start; padding: 5px;">变量名</div>
				<div style="display: flex;">
					<el-input  :disabled="if_disable_flag" v-model="itemdata.varName" size="mini" placeholder="upstreamenv" style="width: 40%;margin: 4px 0px 6px;"></el-input>
				</div>
				<div style="display: flex;align-content: flex-start; padding: 5px;">值定义</div>
				<div style="display: flex;">
					<el-select  @change="changedefaultValue" :disabled="if_disable_flag" v-model="itemdata.varValue" multiple filterable allow-create placeholder="请选择文章标签" size="medium" style="width: 40%;margin: 4px 0px 6px;">
						<el-option v-for="item in options5" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</div>
				<div style="display: flex;align-content: flex-start; padding: 5px;">| 规则配置 </div>
				<div style="display: flex;align-content: flex-start; padding: 5px;">默认值</div>
				<div style="display: flex;">
					<el-select  :disabled="if_disable_flag"  v-model="itemdata.defaultValue" placeholder="请选择" size="mini" style="width: 40%;margin: 4px 0px 6px;">
						<el-option v-for="item in options_defaultValue" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</div>
				<div style="display: flex;align-content: flex-start;  padding: 5px;">规则列表</div>

				<el-table :data="itemdata.rules" border style="display: table-cell;width: 751px; ">
					<el-table-column prop="enable" label="启动" width="100">
						<template slot-scope="scope">
							<el-checkbox  :disabled="if_disable_flag"  v-model="scope.row.enable" size="mini">开启</el-checkbox>
						</template>
					</el-table-column>
					<el-table-column prop="headerName" label="header" width="150">
						<template slot-scope="scope">
							<el-input  :disabled="if_disable_flag" v-model="scope.row.headerName" size="mini" placeholder=""></el-input>
						</template>
					</el-table-column>
					<el-table-column prop="compareType" label="比较" width="100">
						<template slot-scope="scope">
							<el-select :disabled="if_disable_flag"  v-model="scope.row.compareType" placeholder="请选择" size="mini" style="" clearable filterable >
								<el-option v-for="item in options_formale" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</template>
					</el-table-column>
					<el-table-column prop="compareValue" label="匹配值" width="150">
						<template slot-scope="scope">
							<el-input  :disabled="if_disable_flag" v-model="scope.row.compareValue" size="mini" placeholder=""></el-input>
						</template>
					</el-table-column>
					<el-table-column prop="value" label="变量设置为" width="150">
						<template slot-scope="scope">
							<el-select  :disabled="if_disable_flag" v-model="scope.row.value" placeholder="请选择" size="mini" >
								<el-option v-for="item in options_defaultValue" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</template>
					</el-table-column>
					<el-table-column prop="cahozuo" label="操作" width="100">
						<template slot-scope="scope">
							<!-- <el-button @click="xiugaicaozuo(scope.row)" type="text" size="small">修改</el-button>
								<span style="font-size: 13px;padding: 10px 10px 10px 8px; color: blue;">|</span> -->
							<el-button  :disabled="if_disable_flag" @click="shanchucaozuo(scope.$index)" type="text" size="small">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
				<div style="display: flex; align-content: flex-start; ">
					<el-button   :disabled="if_disable_flag"  type="primary" size="mini" style="width: 750px; background-color: #FFFFFF;color: grey;border:#F5F5F5 1px solid "
					 @click="addline()">+新增</el-button>
				</div>



				<div style=" display: flex;  padding-top:22px;">
					<el-button type="primary" @click="updatedata()" size="mini">保存</el-button>
					<el-button type="primary" @click="deletedata()" plain size="mini">删除</el-button>

				</div>






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
				formLabelAlign: {
					name: '',
					region: '',
					type: ''
				},
				huidudata: [],
				searchinput: '',
				if_disable_flag: true,
				if_update_flag: false,
				itemdata: [],
				checked: false,
				options_mode: [{
						value: '选项1',
						label: 'variable'
					},
				],
				options_defaultValue: [],


				options_formale: [{
					value: '选项1',
					label: '='
				}, {
					value: '选项2',
					label: '>'
				}, {
					value: '选项3',
					label: '<'
				}, {
					value: '选项4',
					label: '~*'
				}, ],
				options5: [{
					value: '',
					label: ''
				}, ],
				value10: '',
				value100: [],
				value11: '',
				tableData: [{
					qidong: true,
					header: 'reqorgcode',
					bijiao: '正则匹配',
					pipeizhi: 'code1',
					bianliang: 'prod',
					cahozuo: '1'
				}, {
					qidong: true,
					header: 'reqorgcode',
					bijiao: '正则匹配',
					pipeizhi: 'code1',
					bianliang: 'prod',
					cahozuo: '1'
				}, ]
			};
		},

		created() {
			var that = this;
			this.$axios.get('/test/api/apis/v1/strategy').then(response => {
				console.log(response, 'strategy')
				if (response.status >= 200 && response.status < 300) {
					this.huidudata = response.data.body;
					that.options_defaultValue=[];
					for (var i = 0; i < that.itemdata.defaultValue.length; i++) {
						that.options_defaultValue.push({
						value: i,
						label: that.itemdata.defaultValue[i]
					})
					}
				} else {
					console.log(response.data);
				}
			})

			that.activeName = "4";
			console.log('strategy')
			
			
			
		},


		methods: {
			search() {
				// alert(this.input)
				if (this.searchinput != "") {
					// alert(this.searchinput)
					this.$axios.get('/test/api/apis/v1/strategy/' + this.searchinput).then(response => {
						// console.log(response.data.body ,'strategy')
						if (response.status >= 200 && response.status < 300) {
							this.huidudata = response.data.body;
						} else {
							console.log(response.message);
						}
					})
				} else {
					this.$axios.get('/test/api/apis/v1/strategy').then(response => {
						console.log(response, 'strategy')
						if (response.status >= 200 && response.status < 300) {
							this.huidudata = response.data.body;
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
				var that=this;
				this.if_disable_flag = false;
				this.if_update_flag = false;
				this.itemdata = item;
				console.log(item)
				that.options_defaultValue=[];
				for (var i = 0; i < that.itemdata.varValue.length; i++) {
					that.options_defaultValue.push({
					value: i,
					label: that.itemdata.varValue[i]
				})
				}
				console.log(that.options_defaultValue)
			},

			gotonginx() {
				this.activeName = "-1";
				this.$router.push('/')
				// clearInterval(this.setTime)
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
					this.itemdata.rules.splice(line, 1);

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
				this.itemdata.rules.push([])
			},
			changedefaultValue(selval){
				// console.log(selval);
				this.options_defaultValue=[];
				for (var i = 0; i < selval.length; i++) {
					this.options_defaultValue.push({
					value: i,
					label: selval[i]
				})
				}
				
				
			},
			handleClick(tab, event) {
				// console.log(panName);
				console.log(tab.paneName);
				console.log(this.activeName);

				var str = '/page' + tab.paneName;
				console.log(str);
				if (this.activeName != 4) {
					this.$router.push(str)
					clearInterval(this.setTime)
				}


			},
			xiugaicaozuo(hh) {
				console.log(hh)
				console.log(this.tableData)
			},

			departChange() {

			},
			
			updatedata() {
				if (this.itemdata.length == 0) {
					return 0;
				}
				var that = this;
				that.$confirm('此操作将永久修改改灰度策略, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					
					
					if (that.if_update_flag == false) {
						that.$axios.put('/test/api/apis/v1/strategy/' + that.itemdata.name, that.itemdata).then(response => {
							console.log(response, 'strategy')
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
						that.$axios.post('/test/api/apis/v1/strategy/' + that.itemdata.name, that.itemdata).then(response => {
							console.log(response, 'strategy')
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
				that.$confirm('此操作将永久删除该灰度策略, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					that.$axios.delete('/test/api/apis/v1/strategy/' + that.itemdata.name, ).then(response => {
						console.log(response, 'strategy')
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
			// ----------------------------------------
			
			
			
			
			
			
			additem() {
				this.if_update_flag = true;
				this.if_disable_flag = false;
				this.itemdata = {
					"name": "",
					"enable": "",
					"mode": "variable",
					"varName": "",
					"varValue": [],
					"defaultValue": "",
					"rules": [],
				};
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

	/* 	div {
		display: flex;
	}
 */

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

	/* .el-table th.gutter {
	  display: table-cell !important;
	}
	
	.el-table colgroup.gutter {
	  display: table-cell !important;
	}
	.el-table .warning-row {
	  background: oldlace;
	}
	
	.el-table .success-row {
	  background: #f0f9eb;
	} */
</style>
