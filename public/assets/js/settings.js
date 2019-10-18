// 当管理员选择logo图片时
$('#logo').on('change', function () {
    var file = this.files[0];
    var formData = new FormData();
    formData.append('logo', file);
    // 向服务器端发送请求 实现文件上传
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
            console.log(response);
            // 将logo图片显示在页面中
            $('#preview').attr('src', response[0].logo);
            //设置一个隐藏域，这里的路径是需要发送给服务器的
            $('#hiddenLogo').val(response[0].logo);
        }
    });
});