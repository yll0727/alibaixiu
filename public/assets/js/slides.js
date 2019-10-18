// 发送ajax请求 向服务器端获取 轮播图列表 数据
$.ajax({
    type: 'get',
    url: '/slides',
    success: function (response) {
        console.log(response);
        var html = template('slidesTpl', {
            data: response
        });
        $('#slidesBox').html(html);
    }
});
// 实现文章封面图片上传 当管理员选择文件的时候 触发事件
$('#file').on('change', function () {
    // 用户选择到的文件
    var file = this.files[0]; // 原生不需要加$(this)
    // 创建formData对象实现二进制文件上传
    var formData = new FormData;
    // 将管理员选择到的文件添加到forData对象中
    formData.append('image', file);
    // 向服务器端发送请求 实现图片上传
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        // 告诉$.(ajax)方法不要处理data属性对应的参数
        processData: false,
        // 诉$.(ajax)方法不要设置参数类型
        contentType: false,
        success: function (response) {
            console.log(response);
            // 实现头像预览功能，设置给页面元素即可
            // $('.thumbnail').attr('src', response[0].image).show();
            //设置一个隐藏域，这里的路径是需要发送给服务器的
            $('#hiddenImage').val(response[0].image);
        }
    });
});
// 当轮播图表单发生提交行为时
$('#slidesForm').on('submit', function () {
    // 获取管理员在表单中输入的内容
    var formData = $(this).serialize();
    // 向服务器端发送请求 添加轮播图数据
    $.ajax({
        type: 'post',
        url: '/slides',
        data: formData,
        success: function () {
            //当请求成功，让页面刷新
            location.reload();
        }
    });
    // 阻止表单默认提交行为
    return false;
});
// 删除功能
$('#slidesBox').on('click', '.delete', function () {
    // 获取即将要删除的分类数据的id
    var id = $(this).attr('data-id');

    if (confirm('您真的要删除当前图片吗？')) {
        // 向服务器端端发送请求 删除用户
        $.ajax({
            type: 'delete',
            url: `/slides/${id}`,
            success: function () {
                location.reload();
            }
        });
    }
});