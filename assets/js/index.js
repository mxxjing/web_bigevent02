$(function () {

    getUserInfo()

    $('#btnLogout').on('click', function () {
        layer.confirm('确定退出登录', { icon: 3, title: '提示' }, function (index) {
            //do something
            // 清除token
            localStorage.removeItem('token')
            // 跳转到登陆页面
            location.href = '/login.html'
            // 关闭询问框
            layer.close(index);
        });
    })

})
function getUserInfo() {
    $.ajax({
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            // console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }
            renderavatar(res.data)
        }
    })
}

function renderavatar(user) {
    var name = user.nickname || user.username
    $('#welcome').html("欢迎&nbsp;" + name)
    if (user.user_pic) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
        $('.layui-nav-img').hide()
    }
}

