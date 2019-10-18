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
        //获取分页的数据
        var page = template('pageTpl', response)
        $('#page').html(page);
    }
});
// 处理日期时间格式
function dateFormat(date) {
    date = new Date(date);
    return date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日'
};
// 分页
function changePage(page) {
    // 发送ajax请求 向服务器端索要文章列表数据
    $.ajax({
        type: 'get',
        url: '/posts',
        data: {
            page: page
        },
        success: function (response) {
            console.log(response);
            // 使用模板引擎将数据和HTML字符串进行拼接
            var html = template('postsTpl', response)
            // 将拼接好的字符串显示在页面中
            // 找到需要显示内容的tbody，把内容添加tbody中
            $('#postsBox').html(html);
            //获取分页的数据
            var page = template('pageTpl', response)
            $('#page').html(page);
        }
    });
};
// 发送ajax请求 向服务器端索要分类数据
$.ajax({
    type: 'get',
    url: '/categories',
    success: function (response) {
        console.log(response);
        var html = template('categoryTpl', {
            data: response
        });
        $('#categoryBox').html(html);
    }
});
// 当用户进行文章列表筛选时
$('#filterForm').on('submit', function () {
    // 获取到管理员选择的筛选条件
    var formData = $(this).serialize();
    // 向服务器端发送请求 根据条件索要文章列表数据
    $.ajax({
        type: 'get',
        url: '/posts',
        data: formData,
        success: function (response) {
            console.log(response);
            // 使用模板引擎将数据和HTML字符串进行拼接
            var html = template('postsTpl', response)
            // 将拼接好的字符串显示在页面中
            // 找到需要显示内容的tbody，把内容添加tbody中
            $('#postsBox').html(html);
            //获取分页的数据
            var page = template('pageTpl', response)
            $('#page').html(page);
        }
    });
    // 阻止表单的默认提交
    return false;
});