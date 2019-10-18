// 发送ajax请求 向服务器端索要 文章分类 数据
$.ajax({
    type: 'get',
    url: '/categories',
    success: function (response) {
        console.log(response);
        var html = template('categoryTpl', {
            data: response
        });
        $('#category').html(html);
    }
});
// 实现文章封面图片上传 当管理员选择文件的时候 触发事件
$('#feature').on('change', function () {
    // 获取到管理员选择到的文件 不管用户上传多少个文件，这个文件的信息都存储在files中
    var file = this.files[0];
    // console.dir(this);
    // 创建formData对象 实现二进制文件上传
    var formData = new FormData();
    // 将管理员选择到的文件追加到formData对象中
    formData.append('cover', file);
    // 实现文章封面图片上传
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
            $('.thumbnail').attr('src', response[0].cover).show();
            //设置一个隐藏域，这里的路径是需要发送给服务器的
            $('#thumbnail').val(response[0].cover);
        }
    });
});
// 当添加文章表单发生提交行为的时候
$('#addForm').on('submit', function () {
    // 获取管理员在表单中输入的内容
    var formData = $(this).serialize();
    // 向服务器端发送请求 实现添加文章功能
    $.ajax({
        type: 'post',
        url: '/posts',
        data: formData,
        success: function (response) {
            console.log(response);
            // 文章添加成功 跳转到文章列表页面
            location.href = 'posts.html'
        }
    });
    // 阻止表单默认提交
    return false;
});