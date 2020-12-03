$(function () {

    var form = layui.form

    initArtCateList()

    function initArtCateList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                var htmlStr = template('tpl-art-cate', res)
                $('tbody').html(htmlStr)
            }
        })
    }

    var indexAdd = null
    $('#btnAdd').on('click', function () {
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#tpl-add').html()
        });

    })

    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                initArtCateList()
                layer.close(indexAdd)
            }
        })
    })

    var indexEdit = null
    $('tbody').on('click', '.btnEdit', function () {
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $('#tpl-edit').html()
        });
        var id = $(this).attr('data-id')
        // console.log(id);
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                form.val('form-edit', res.data)
            }
        })
        $('body').on('submit', '#form-edit', function (e) {
            e.preventDefault()
            $.ajax({
                method: 'POST',
                url: '/my/article/updatecate',
                data: $(this).serialize(),
                success: function (res) {
                    // console.log(res);
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    }
                    initArtCateList()
                    layer.close(indexEdit)
                }
            })
        })
    })


    $('tbody').on('click','.btnDelete', function () {
        var id = $(this).attr('data-id')
        layer.confirm('确定删除?', { icon: 3, title: '提示' }, function (index) {
            //do something
            $.ajax({
                method:'GET',
                url:'/my/article/deletecate/'+id,
                success:function(res){
                    console.log(res);
                }
            })
            layer.close(index);
            initArtCateList()
        });
    })
})