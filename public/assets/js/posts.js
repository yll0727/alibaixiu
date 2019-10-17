// 发送ajax请求 向服务器端索要文章列表数据
$.ajax({
    type: 'get',
    url: '/posts',
    success: function (response) {
        console.log(response);
        // 使用模板引擎将数据和HTML字符串进行拼接
        var html = template('postsTpl', response)
        // 将拼接好的字符串显示在页面中
        // 找到需要显示内容的tbody，把内容添加tbody中
        $('#postsBox').html(html);
    }
});
// 处理日期时间格式
function dateFormat(date) {
    date = new Date(date);
    return date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日'
}