$('#logout').on('click', function() {
    // 弹出提示框，确保用户不是按错了
    var isConfirm = confirm('您真的要退出吗？');
    if (isConfirm) {
        // 用户点击了确定按钮，进行网络请求
        $.ajax({
            type: 'post',
            url: '/logout',
            success: function(response) {
                // 跳转到登录页
                location.href = 'login.html';
            },
            error: function() {
                alert('退出失败')
            }
        })
    }
});