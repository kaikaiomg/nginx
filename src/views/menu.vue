<template>

	<div id="app" style="display: flex; flex-flow: row wrap ;width: 100%;margin: 0px;">
		<daohang> </daohang>

		<div style="flex-flow: column;width: 20%;">
			<!-- 	<div @click="gotonginx()" style="width: 95%;height:40px; font-weight: bold; font-size: 20px;background-color: #F0F0F0;margin: auto;align-items: center; justify-content: center; line-height:40px;">
				PaaS Nginx
			</div> -->

			<div class="bac_white border8" style="width: 92%;margin: 0px 2% 0px 8%;flex-flow: column nowrap; font-size: 10px; text-align: left;height: 170px;justify-content: center;">
				<div class="z1">{{niguxdata.name}}({{niguxdata.version}})</div>
				<div class="z1">状态: &nbsp; &nbsp; {{niguxdata.status}})</div>
				<div class="z1">PID: &nbsp; &nbsp; &nbsp; {{niguxdata.pid}})</div>
				<div class="z1">启动时间: {{niguxdata.uptime}})</div>
				<div class="z1"> IP地址:&nbsp; {{niguxdata.version}})</div>

			</div>
			<div class="bac_white border8" style="width: 92%;margin:10px 2% 0px 8%;flex-flow: column nowrap;font-size: 10px; padding-top: 10px;padding-bottom: 10px; 	text-align: left; height: 280px;">
				<div style=" padding: 10px 0px 10px 20px; font-size: 18px;font-weight: 900;">Nginx操作</div>
				<div style="flex-flow:row nowrap; margin:4px auto;width: 90%;padding-left: 20px;">
					<div class="but1 bac_SkyBlue" @click="apipush('start')">启动</div>
					<div class="but1 bac_red" @click="apipush('stop')" style="margin-left: 6px;">停止</div>
				</div>
				<div style="flex-flow:row nowrap; margin:4px auto;width: 90%;padding-left: 20px;">
					<div class="but1 bac_orange" @click="apipush('reload')">Reload</div>
					<div class="but1 bac_SeaGreen" @click="apipush('restart')" style="margin-left: 6px;">重启</div>
				</div>
				<div style="flex-flow:column nowrap; margin:4px auto;width: 90%;padding-left: 20px;">
					<!-- <div class="but2">Reload</div> -->
					<div class="but2 icontext" @click="apipush('log')">&#xe602;&nbsp;原始配置 
					   <a style="color: #0000FF;position: relative; left: 7px; font-weight: bold;top: 1px; font-size: 11px;">&#xe639;</a>
					</div>
					<div class="but2 icontext" @click="apipush('')">&#xe601;&nbsp;访问日志;&nbsp;</div>
					<div class="but2 icontext" @click="apipush('')">&#xe60f;&nbsp;错误日志;&nbsp;</div>
					<div class="but2 icontext" @click="apipush('actiontrail')">&#xe602;&nbsp;操作审计;&nbsp;</div>
				</div>

			</div>
		</div>
		<div style="width: 80%;display: flex;flex-flow: column;">

			<!-- 	<el-tabs v-model="activeName"  @tab-click="handleClick" style="background-color: green;height: 130px;">
				<el-tab-pane label="HTTP Servers"></el-tab-pane>
				<el-tab-pane label="HTTP Upstreams"></el-tab-pane>
				<el-tab-pane label="Loctions"></el-tab-pane>
				<el-tab-pane label="限流配置"></el-tab-pane>
				<el-tab-pane label="灰度策略"></el-tab-pane>
				<el-tab-pane label="全局配置"></el-tab-pane>


			</el-tabs> -->
			<div style="flex-flow: column nowrap;margin: 0 1.5% 0 0.5%; width: 98%; ">
				<!-- <router-view /> -->

				<div style="   width: 100%;flex-flow: row nowrap; justify-content: space-around; margin-bottom: 10px;height: 170px;">
					<div class="bac_white border8" style=" width: 70%; flex-flow: column;padding-bottom: 3px;">
						<div style=" width: 95%;justify-content: space-between;flex-flow: row nowrap;margin: 0 auto;padding: 15px 0px;font-size: 15px;">
							<div>
								<span style=" font-weight: bold;">Connections&nbsp;&nbsp;</span>
								<span style="text-decoration:underline">SSL</span>
							</div>
							<!-- <div style="color: #E0E0E0;"> Accepted:90762007</div> -->
							<div style="color: dimgrey;"> totalHandledRequests:{{statusdata.connection.HandledRequests}}</div>
						</div>
						<div style="width: 90%;justify-content: space-around;flex-flow: row;margin: 0 auto;">
							<div class="box1" style=" background: linear-gradient(to top right, #31e4ff 0%,#437eff  100%);">
								<div class="xfk1"> ActiveConnections</div><!-- (活跃的连接数量) -->
								<div class="xfk2"> {{statusdata.connection.ActiveConnections}}</div>
							</div>
							<div class="box1" style=" background: linear-gradient(to top right,#efe438 0%,#f05120 100%);">
								<div class="xfk1"> Server</div><!-- (处理链接总量) -->
								<div class="xfk2"> {{statusdata.connection.Server}}</div>
								<!--处理链接总量-->
							</div>
							<div class="box1" style=" background: linear-gradient(to top right,#69d170 0%,#00bb9e 100%);">
								<div class="xfk1"> Accepts</div><!-- (成功次数) -->
								<div class="xfk2"> {{statusdata.connection.active}}</div>
							</div>
							<div class="box1" style=" background: linear-gradient(to top right,#eb6ad1 0%,#ff4c4c 100%);">
								<div class="xfk1"> Reading</div><!-- (当前正在读取客户端的连接数.) -->
								<div class="xfk2"> {{statusdata.connection.Reading}}</div>
							</div>
						</div>
					</div>
					<div class="bac_white border8" style="width: 28%;flex-flow: column; font-size: 15px;padding-bottom: 3px;">
						<div style=" width: 90%;justify-content: space-between;flex-flow: row nowrap;margin: 0 auto; padding: 15px 0px;">
							<div style="font-weight: bold;"> Requests</div>
							<!-- <div> totalHandledRequests:{{statusdata.connection.HandledRequests}}</div> -->
						</div>
						<div style="width: 90%;justify-content: space-around;flex-flow: row;margin:0 auto;">
							<div class="box2">
								<div class="xfk1"> Writing</div>
								<div class="xfk2"> {{statusdata.connection.Writing}}</div>
							</div>
							<div class="box2">
								<!-- 响应数据到客户端的数量 -->
								<div class="xfk1"> Waiting</div>
								<div class="xfk2"> {{statusdata.connection.Waiting}}</div><!-- 表示 Nginx 已经处理完正在等候下一次请求指令的驻留连接数 -->
							</div>

						</div>

					</div>
				</div>


				<div style="   width: 100%;flex-flow: row nowrap; justify-content: space-around;">


					<div class="bac_white border8" style="height: 300px;flex-flow: column; font-size: 12px;width: 23.5%;">
						<div class="box3">
							<div class="title1" >HTTP Zones</div>
							<div class="icontext title2" style="color: red; ">&#xe685;</div>
						</div>
						<div style="width: 90%;justify-content:flex-start;flex-flow: row;padding:20px 10px ;">
							<div style="flex-flow: column;justify-content: center;">
								<div style="font-size: 13px;font-weight: bold;padding:4px 0px;  "> Total</div>
								<div>
									<div style="font-size: 17px;font-weight: bold;padding: 0.1em 0.3em;"> {{maindata.zone.total}} </div>
								</div>
							</div>
							<div style="font-size: 17px;font-weight: bold; align-items:flex-end;padding: 0.1em 0.6em 0.1em 0.1em; ">/</div>
							<div style="flex-flow: column;justify-content: center;">
								<div style="font-size: 13px;font-weight: bold;padding:4px 0px;"> Warngings</div>
								<div>
									<div :class="maindata.zone.warning>0?'bac_orange':'bac_SeaGreen'" style="font-size: 17px;fonts-weight: bold;padding: 0.1em 0.3em;color: white;">
										{{maindata.zone.warning}}
									</div>
								</div>
							</div>

						</div>


						<div style="padding: 10px;">Traffic</div>
						<div style="padding: 10px;">In: {{maindata.zone.in}} B/s</div>
						<div style="padding: 10px;">Out:{{maindata.zone.out}} B/s</div>
					</div>


					<div class="bac_white border8" style="height: 300px;flex-flow: column; font-size: 12px;width: 23.5%;">
						<div class="box3">
							<div class="title1" >HTTP Upstreams</div>
							<div class="icontext title2" style="color: #009100;">&#xe630;</div>
						</div>
						<div style="width: 90%;justify-content:flex-start;flex-flow: row;padding:20px 10px ;">
							<div style="flex-flow: column;justify-content: center;">
								<div style="font-size: 13px;font-weight: bold;padding:4px 0px;  "> Total</div>
								<div>
									<div style="font-size: 17px;font-weight: bold;padding: 0.1em 0.3em;"> {{maindata.upstream.total}}</div>
								</div>
							</div>
							<div style="font-size: 17px;font-weight: bold; align-items:flex-end;padding: 0.1em 0.6em 0.1em 0.1em; ">/</div>
							<div style="flex-flow: column;justify-content: center;">
								<div style="font-size: 13px;font-weight: bold;padding:4px 0px;"> Problems</div>
								<div>
									<div :class="maindata.upstream.problem>0?'bac_orange':'bac_SeaGreen'" style="font-size: 17px;fonts-weight: bold;padding: 0.1em 0.3em;color: white;">
										{{maindata.upstream.problem}}
									</div>
								</div>
							</div>
						</div>
						<div style="padding: 10px;">Severs</div>
						<div style="padding: 10px;">All：{{maindata.upstream.serverAll}}/Up：{{maindata.upstream.up}}</div>
						<div style="padding: 10px;">Failed:{{maindata.upstream.failed}}</div>
					</div>



					<div class="bac_white border8" style="height: 300px;flex-flow: column; font-size: 12px;width: 23.5%;">
						<div class="box3">
							<div class="title1" > 灰度策略</div>
							<div class="icontext title2" style="color: #009100;">&#xe630;</div>
						</div>
						<div style="width: 90%;justify-content:flex-start;flex-flow: row;padding:20px 10px ;">
							<div style="flex-flow: column;justify-content: center;">
								<div style="font-size: 13px;font-weight: bold;padding:4px 0px;  "> Total</div>
								<div>
									<div style="font-size: 17px;font-weight: bold;padding: 0.1em 0.3em;">{{maindata.strategy.total}}</div>
								</div>
							</div>
							<div style="font-size: 17px;font-weight: bold; align-items:flex-end;padding: 0.1em 0.6em 0.1em 0.1em; ">/</div>
							<div style="flex-flow: column;justify-content: center;">
								<div style="font-size: 13px;font-weight: bold;padding:4px 0px;"> Problems</div>
								<div>
									<div style="font-size: 17px;fonts-weight: bold;padding: 0.1em 0.3em;">
										{{maindata.strategy.problem}}
									</div>
								</div>
							</div>
						</div>
						<div style="padding: 10px;">Severs</div>
						<div style="padding: 10px;">Location总个数：{{maindata.strategy.locationCount}}</div>
						<div style="padding: 10px;">正在使用个数:{{maindata.strategy.use}}</div>
					</div>


					<div class="bac_white border8" style="height: 300px;flex-flow: column; font-size: 12px;width: 23.5%;">
						<div class="box3">
							<div class="title1" >限流策略</div>
							<div class="icontext title2" style="color: #009100;">&#xe630;</div>
						</div>
						<div style="width: 90%;justify-content:flex-start;flex-flow: row;padding:20px 10px ;">
							<div style="flex-flow: column;justify-content: center;">
								<div style="font-size: 13px;font-weight: bold;padding:4px 0px;  "> Total</div>
								<div>
									<div style="font-size: 17px;font-weight: bold;padding: 0.1em 0.3em;"> {{maindata.limit.total}}</div>
								</div>
							</div>
							<div style="font-size: 17px;font-weight: bold; align-items:flex-end;padding: 0.1em 0.6em 0.1em 0.1em; ">/</div>
							<div style="flex-flow: column;justify-content: center;">
								<div style="font-size: 13px;font-weight: bold;padding:4px 0px;"> Problems</div>
								<div>
									<div style="font-size: 17px;fonts-weight: bold;padding: 0.1em 0.3em;">
										{{maindata.limit.problem}}
									</div>
								</div>
							</div>
						</div>
						<div style="padding: 10px;">Severs</div>
						<div style="padding: 10px;">Location总个数：{{maindata.limit.locationCount}}</div>
						<div style="padding: 10px;">正在使用个数:{{maindata.limit.use}}</div>
					</div>




				</div>


			</div>




		</div>




		<!-- <img src="./assets/logo.png"> -->
		<el-dialog :title="rizhititle" :visible.sync="dialogTableVisible" :center="true" width="80%" :style="'height:640px'">
			<!-- <div style="display: flex; padding: 5px;">| {{rizhititle}} </div> -->
			<!-- <div style="display: flex;">
			<el-input disabled v-model="dialogTabledata" size="mini" placeholder="/cus/" style="width: 40%;margin: 4px 0px 6px;"></el-input>
		</div> -->
			<!-- 			<div :style="'display: flex; flex-flow: column nowrap; width: 95%;margin: 0px auto 0px; overflow-y: scroll; background-color: #BEBEBE;height:'+(winHeight-188)+'px;'">
-->
			<div :style="' overflow-y: scroll; height:300px'">
				<el-table :data="dialogTabledata" border :style="'display: table-cell; width: 100%; height:'+ dialogTabledatalength*42.5+'px;'"
				 size='mini' :fit='true'>
					<el-table-column prop="id" label="id" :width='screenWidth/7'>
						<template slot-scope="scope">
							<el-input v-model="scope.row.id" size="mini" placeholder=""></el-input>
						</template>
					</el-table-column>
					<el-table-column prop="msg" label="信息" :width='screenWidth/3.2'>
						<template slot-scope="scope">
							<el-input :rows="2" v-model="scope.row.msg" size="mini" placeholder=""></el-input>

						</template>
					</el-table-column>
					<el-table-column prop="time" label="时间" :width='screenWidth/5.6'>
						<template slot-scope="scope">
							<el-input v-model="scope.row.time" size="mini" placeholder=""></el-input>
						</template>
					</el-table-column>
					<el-table-column prop="cahozuo" label="操作" :width='screenWidth/9'>
						<template slot-scope="scope">
							<el-button @click="dianjirizhi(scope.$index)" type="text" size="mini">查看</el-button>
						</template>
					</el-table-column>

				</el-table>
			</div>
			<div style="margin: 15px auto;">
				<el-input type="textarea" :rows="3" v-model="dialogTabledatamsg" size="mini" placeholder=""></el-input>
			</div>


		</el-dialog>
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
				activeName: '-1',
				setTime: null,
				statusdata: {
					"connection": {},
					"request": {},
				},
				maindata: {
					"zone": {},
					"upstream": {},
					"strategy": {},
					"limit": {},
				},
				rizhititle: "",
				niguxdata: {},
				dialogTabledata: {},
				dialogTabledatalength: 10,
				dialogTableVisible: false,
				dialogTabledatamsg: "",
				screenWidth: document.body.clientWidth, // 屏幕尺寸
				screenHeight: document.body.clientHeight, // 屏幕尺寸

			};
		},
		mounted() {
			window.onresize = () => {
				this.screenWidth = document.body.clientWidth;
				this.screenHeight = document.body.clientHeight;
			}
		},
		created() {

			var that = this;
			that.api_get();
			that.setTime = setInterval(function() {
				that.api_get();
			}, 100000);


			this.activeName = "-1";
			console.log('hhh')



			// alert(this.winHeight)



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

			dianjirizhi(index) {

				this.dialogTabledatamsg = this.dialogTabledata[index].msg

			},
			gotonginx() {
				if (this.activeName != "-1") {
					this.$router.push(str)
					clearInterval(this.setTime)
				}
			},

			handleClick(tab, event) {
				// console.log(panName);
				console.log(tab.paneName);
				console.log(this.activeName);

				var str = '/page' + tab.paneName;
				console.log(str);
				if (this.activeName != "-1") {
					this.$router.push(str)
					clearInterval(this.setTime)
				}
			},

			apipush(url) {
				// this.$api.get(url, {},
				// response => {if (response.status >= 200 && response.status < 300) {alert(response.data.message);	} 
				// else {alert(response.data.message);}});
				this.$axios.get('/test/api/apis/v1/' + url).then(response => {
					console.log(response.data.body, 'url')
					console.log(response.data.body.length)
					if (response.status >= 200 && response.status < 300) {
						this.dialogTabledata = response.data.body;
						this.dialogTabledatalength = this.dialogTabledata.length
					} else {
						console.log(response.data);
					}
				})
				switch (url) {
					case 'actiontrail':
						this.rizhititle = "审计日志"
						this.dialogTableVisible = true;
						break;
					case 'log':
						this.rizhititle = "原始配置"

						break;
					default:
						this.rizhititle = ""
						break;
				}



			},
			api_get() {


				// this.$axios.get('/test/api/apis/v1/status').then(response => {
				// 	console.log(response, 'status')
				// 	if (response.status >= 200 && response.status < 300) {
				// 		this.statusdata = response.data.body;
				// 	} else {
				// 		console.log(response.data);
				// 	}
				// })

				this.$axios.get('/test/api/apis/v1/monitor').then(response => {
					console.log(response, 'monitor')
					if (response.status >= 200 && response.status < 300) {
						this.maindata = response.data.body;
					} else {
						console.log(response.data);
					}
				})
				// this.$axios.get('/test/api/apis/v1/details').then(response => {
				// 	console.log(response, 'details')
				// 	if (response.status >= 200 && response.status < 300) {
				// 		this.niguxdata = response.data.body;
				// 	} else {
				// 		console.log(response.data);
				// 	}
				// })


				// this.$api.get('http://10.4.31.211:9512/apis/v1/monitor', {},
				// response => {if (response.status >= 200 && response.status < 300) {this.maindata=response.data.body;	} 
				// else {console.log(response.message);}});
				// this.$api.get('http://10.4.31.211:9512/apis/v1/details', {},
				// response => {if (response.status >= 200 && response.status < 300) {this.niguxdata=response.data.body;	} 
				// else {console.log(response.message);}});
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
		height: 23px;
		padding-left: 34px;
	}

	.but1 {
		display: inline-block;

		margin: 2px 2px 0px;
		padding: .5em .5em;
		width: 35%;
		border-radius: 12px;
		/* background-color: white; */
		color: white;
		/* border: 1px solid black; */
		text-align: center;

	}

	.but1:hover {
		background-color: #DCDCDC;
		/* color: red; */
		box-shadow: #000000
	}


	.but2 {
		display: inline-block;
		margin: 2px 2px 6px;
		padding: .5em .5em;
		width: 80%;
		border-radius: 12px;
		/* background-color: white; */
		color: #000000;
		border: 1px solid black;
		text-align: center;
	}

	.but2:hover {
		background-color: #DCDCDC;
		color: red;
	}

	div {
		display: flex;
	}


	.xfk1 {
		font-weight: bold;
		font-size: 14px;
	}

	.xfk2 {
		font-weight: bold;
		font-size: 18px;


	}

	.box1 {
		flex-flow: column;
		justify-content: center;
		width: 140px;
		height: 100px;
		color: white;
		border-radius: 5px;
		align-items: center;
		justify-content: center;
	}

	.box2 {
		flex-flow: column;
		border: 1px grey solid;
		border-radius: 5px;
		width: 90px;
		height: 90px;
		justify-content: center;
		align-items: center;
	}

	.box3 {
		height: 50px;
		width: 100%;
		justify-content: space-between;
		align-items: center;

		flex-flow: row nowrap;
		margin: 0 auto;
		background: linear-gradient(to bottom, #e9eefa 0%, #c4cde2 100%);
		border-top-right-radius: 8px;
		border-top-left-radius: 8px;
	}

	.title1 {

		font-size: 16px;
		padding: 0px 20px;
		font-weight: bold;
	}
	.title2{
		 font-size: 22px;
		 padding: 20px;
	}
	
	
</style>
