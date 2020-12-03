$(function () {

    var form = layui.form
    var laypage = layui.laypage
    function padZero(n) {
        return n > 9 ? n : '0' + n
    }

    template.defaults.imports.dateFormat = function (date) {
        var dt = new Date(date)

        var y = dt.getFullYear()
        var m = padZero(dt.getMonth() + 1)
        var d = padZero(dt.getDate())

        var hh = padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())
        var ss = padZero(dt.getSeconds())

        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
    }


    var q = {
        pagenum: 1,
        pagesize: 3,
        cate_id: '',
        state: '',
    }


    initTable()
    initCate()


    function initTable() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                var htmlStr = template('tpl-art-list', res)
                $('tbody').html(htmlStr)
                renderPage(res.total)
            }
        })
    }


    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                console.log(res);
                var htmlStr = template('tpl-cate', res)
                $('[name=cate_name]').html(htmlStr)
                form.render()
            }
        })
    }

    $('#form-search').on('submit', function (e) {
        e.preventDefault()
        q.cate_id = $('[name=cate_name]').val()
        q.state = $('[name=state]').val()
        initTable()
    })

    function renderPage(total) {
        laypage.render({
            elem: 'pageBox', //注意，这里的 test1 是 ID，不用加 # 号
            count: total, //数据总数，从服务端得到
            curr: q.pagenum,
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10],
            limit: q.pagesize,
            jump: function (obj, first) {
                console.log(obj.curr);
                console.log(first);
                q.pagenum = obj.curr
                q.pagesize = obj.limit
                if (!first) {
                    initTable()
                }
            }
        });
    }


    $('tbody').on('click', '.btnDelete', function () {
        var id = $(this).attr('data-id')
        layer.confirm('确定删除?', { icon: 3, title: '提示' }, function (index) {
            //do something
            $.ajax({
                method: 'GET',
                url: '/my/article/delete/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    }
                    layer.msg(res.message)
                    if ($('.btnDelete').length === 1 && q.pagenum > 1) q.pagenum--
                    initTable()
                }
            })
            layer.close(index);
        });
    })

    
})