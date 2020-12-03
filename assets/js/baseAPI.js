
var baseURL = 'http://ajax.frontend.itheima.net'
$.ajaxPrefilter(function (option) {
    option.url = baseURL + option.url

    if (option.url.indexOf('/my/') !== -1) {
        option.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    // 拦截所有响应，判断身份认证信息
    option.complete = function (res) {
        // console.log(res);
        if(res.responseJSON.status !== 0 && res.responseJSON.message == '身份认证失败！') {
            localStorage.removeItem('token')
            location.href = "/login.html"
        }
    }
})