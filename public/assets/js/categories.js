// 发送ajax请求 向服务器端索要分类列表数据
$.ajax({
    type: 'get',
    url: '/categories',
    success: function (response) {
        // 将服务器端返回的数据和HTML模板进行拼接
        var html = template('categoryListTpl', {
            data: response
        });
        // 将拼接好的内容放到页面中
        $('#categoryBox').html(html);
    }
})
// 当添加分类表单发生 提交行为 时
$('#addCategory').on('submit', function () {
    // 获取用户在表单中输入的内容
    var formData = $(this).serialize();
    // 向服务器端发送请求 添加分类
    $.ajax({
        type: 'post',
        url: '/categories',
        data: formData,
        success: function () {
            location.reload();
        }
    });
    // 阻止表单的默认提交行为
    return false;
});
// 为 编辑按钮 添加点击事件
$('#categoryBox').on('click', '.edit', function () {
    // 获取要修改的分类数据的id
    var id = $(this).attr('data-id');
    // 根据id获取分类数据的详细信息
    $.ajax({
        type: 'get',
        url: '/categories/' + id,
        success: function (response) {
            console.log(response);
            var html = template('modifyCategoryTpl', response)
            $('#modifyBox').html(html);
        }
    });
});
// 当分类数据表单发生 提交行为 时
$('#modifyBox').on('submit', '#modifyCategory', function () {
    // 获取管理员在表单中输入的内容
    var formData = $(this).serialize();
    // 获取要修改的分类id
    var id = $(this).attr('data-id')
    // 发送请求 修改分类数据
    $.ajax({
        type: 'put',
        url: '/categories/' + id,
        data: formData,
        success: function () {
            location.reload();
        }
    })
    // 阻止表单的默认提交行为
    return false;
});
// 为 删除按钮 添加点击事件
$('#categoryBox').on('click', '.delete', function () {
    // 获取即将要删除的分类数据的id
    var id = $(this).attr('data-id');
    if (confirm('您真的要删除当前分类吗？')) {
        // 向服务器端端发送请求 删除用户
        $.ajax({
            type: 'delete',
            url: '/categories/' + id,
            success: function () {
                location.reload();
            }
        });
    }
});