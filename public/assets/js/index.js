// 发送ajax请求 向服务器端获取 文章数量 数据
$.ajax({
    type: 'get',
    url: '/posts/count',
    success: function (response) {
        $('#postsBox').html(`<strong>${response.postCount}</strong>篇文章（<strong>${response.draftCount}</strong>篇草稿）`);
    }
});
// 发送ajax请求 向服务器端获取 分类数量 数据
$.ajax({
    type: 'get',
    url: '/categories/count',
    success: function (response) {
        $('#category').html(`<strong>${response.categoryCount}</strong>个分类`);
    }
});
// 发送ajax请求 向服务器端获取 评论数量 数据
$.ajax({
    type: 'get',
    url: '/comments/count',
    success: function (response) {
        $('#comment').html(`<strong>5</strong>条评论（<strong>${response.commentCount}</strong>条待审核）`);
    }
});