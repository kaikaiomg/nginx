import axios from 'axios';

let http = axios.create({
  baseURL: 'http://localhost:8010/',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  },
  transformRequest: [function (data) {
    let newData = '';
    for (let k in data) {
      if (data.hasOwnProperty(k) === true) {
        newData += encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) + '&';
      }
    }
    return newData;
  }]
});

function apiAxios(method, url, params, response) {
  http({
    method: method,
    url: url,
    data: method === 'POST' || method === 'PUT' ? params : null,
    params: method === 'GET' || method === 'DELETE' ? params : null,
  }).then(function (res) {
    response(res);
	// return res;
	
  }).catch(function (err) {
	  console.log(err,111)
    response(err);
  })
}

export default {
  get: function (url, params, response) {
    return apiAxios('GET', url, params, response)
  },
  post: function (url, params, response) {
    return apiAxios('POST', url, params, response)
  },
  put: function (url, params, response) {
    return apiAxios('PUT', url, params, response)
  },
  delete: function (url, params, response) {
    return apiAxios('DELETE', url, params, response)
  },
  patch: function (url, params, response) {
    return apiAxios('PATCH', url, params, response)
  },
  // main_get_monitor: function(){
	  
	 //  get('http://10.4.31.211:9512/apis/v1/monitor', {
	 //  	"limitReqZones": "1"
	 //  }, response => {
	 //  	if (response.status >= 200 && response.status < 300) {
	 //  		console.log(response.data.body);
	 //  		this.maindata=response.data.body;
	 //  		//请求成功， response为成功信息参数
	 //  	} else {
	 //  		console.log(response.message);
	 //  		//请求失败， response为失败信息
	 //  	}
	 //  })
	  
  // }
  
  
  
  
}