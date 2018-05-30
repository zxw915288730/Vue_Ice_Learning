import axios from 'axios'
// import qs from 'qs'
axios.defaults.timeout = 5000;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// axios.defaults.headers.post["Content-type"] = "application/json;charset=utf-8"
// axios.defaults.headers.post["Content-type"] = "application/json"
// axios.defaults.baseURL = 'http://127.0.0.1:9966';
axios.defaults.baseURL = 'http://127.0.0.1:8063';
axios.interceptors.request.use((config) => {
    console.log('发送请求拦截！')
    if(config.method  === 'post'){
        // config.data = qs.stringify(config.data); // fuck 这里不能使用  stringify ！
        // fuck stringify 转换结果为  _dob=&_name=&_username=&pageNum=1&pageSize=10&total=&sort=id  传到后台 JSON.parse 解析会失败
        // fuck 不适用 stringify 转换结果为  {"_dob":"","_name":"","_username":"","pageNum":1,"pageSize":10,"total":null,"sort":"id"}  传到后台 JSON.parse 成功解析成map
    }
    console.log(config,'11111111111111111');
    return config;
},(error) =>{
    // _.toast("错误的传参", 'fail');
    console.log('err' + 222)
    return Promise.reject(error);
});

//返回状态判断
axios.interceptors.response.use((res) =>{
    if(!res.data.success){
        console.log('err' + 333)
        // _.toast(res.data.msg);
        return Promise.reject(res);
    }
    return res;
}, (error) => {
    console.log('err' + 444)
    // _.toast("网络异常", 'fail');
    return Promise.reject(error);
});

export const postRequest = (url, params) => {
    return axios({
        method: 'post',
        url: `${url}`,
        data: params,
        transformRequest: [function (data) {
            // Do whatever you want to transform the data
            let ret = ''
            for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            console.log(ret);
            return ret
        }],
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
}