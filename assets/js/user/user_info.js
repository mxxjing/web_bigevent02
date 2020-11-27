$(function () {
    var form = layui.form
    form.verify({
        nickname: function (value) {
            if (value.length > 7) {
                return '昵称长度必须在 1 ~ 7 个字符之间！'
            }
        }
    })

    // 先通过后台数据渲染用户信息
    initUserInfo()
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layui.layer.msg(res.message)
                }
                form.val('formUserInfo', res.data)
            }
        })
    }

    $('#btnReset').on('click', function (e) {
        e.preventDefault()
        $('.layui-form')[0].reset()
        initUserInfo()
    })


    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success:function(res) {
                console.log(res);
                if (res.status !== 0) {
                    return layui.layer.msg(res.message)
                }
                layui.layer.msg(res.message)
                window.parent.getUserInfo()
            }
        })
    })
})