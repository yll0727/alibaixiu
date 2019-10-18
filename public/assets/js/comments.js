// 发送ajax请求 向服务器端索要 评论列表 数据
$.ajax({
    type: 'get',
    url: '/comments',
    success: function (response) {
        console.log(response)
        var html = template('commentsTpl', response);
        $('#commentsBox').html(html);
        // 分页的数据
        var page = template('pageTpl', response);
        $('#pageBox').html(page)
    }
});
// 处理日期时间格式
function dateFormat(date) {
    date = new Date(date);
    return date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日'
};
// 分页
function changePage(page) {
    // 发送ajax请求 向服务器端索要 评论列表 数据
    $.ajax({
        type: 'get',
        url: '/comments',
        data: {
            page: page
        },
        success: function (response) {
            console.log(response)
            var html = template('commentsTpl', response);
            $('#commentsBox').html(html);
            // 分页的数据
            var page = template('pageTpl', response);
            $('#pageBox').html(page)
        }
    });
};
// 当审核按钮被点击的时候
$('#commentsBox').on('click', '.status', function () {
    // 获取当前评论的状态
    var status = $(this).parent().attr('data-status');
    // 获取当前要修改的评论id
    var id = $(this).parent().attr('data-id');
    // 向服务器端发送请求 更改评论状态
    $.ajax({
        type: 'put',
        url: `/comments/${id}`,
        data: {
            //当按钮显示是审核，那么当我们点击的时候，需要服务器把状态改变成驳回
            state: status == 1 ? 0 : 1
        },
        success: function (response) {
            console.log(response);
            location.reload();
        }
    });
});
// 删除功能
$('#commentsBox').on('click', '.delete', function () {
    var id = $(this).parent().attr('data-id');
    if (confirm('您确定要删除评论吗')) {
        $.ajax({
            type: 'delete',
            url: `/comments/${id}`,
            success: function () {
                location.reload();
            }
        });
    }
})