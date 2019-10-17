// 向服务器端发送请求 索要用户列表数据
$.ajax({
    type: 'get',
    url: '/users',
    success: function (response) {
        console.log(response);
        // 使用模板引擎将数据和HTML字符串进行拼接
        var html = template('userTpl', {
            data: response
        });
        // 将拼接好的字符串显示在页面中
        // 找到需要显示内容的tbody，把内容添加tbody中
        $('#usersBox').html(html);
    }
});
// 当表单发生提交行为的时候
$('#userForm').on('submit', function () {
    // serialize jq 提供的方法，可以自动把当前表单的数据序列化，自动收集
    // 获取到用户在表单中输入的内容并将内容格式化成参数字符串
    var formData = $(this).serialize();
    // 向服务器端发送添加用户的请求
    $.ajax({
        type: 'post',
        url: '/users',
        data: formData,
        success: function (response) {
            console.log(response);
            // 刷新页面
            location.reload();
        },
        error: function () {
            alert('用户添加失败');
        }
    });
    // 阻止表单的默认提交行为
    return false;
});
// 通过事件委托的方式为 头像上传 添加变化事件
$('#modfiyBox').on('change', '#avatar', function () {
    // 用户选择到的文件
    // this.files[0];
    console.dir(this.files[0]);
    var formData = new FormData();
    formData.append('avatar', this.files[0]);
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        // jq默认我们传的是一个对象，他会帮我们转化成key=value&key=value的形式 但是我们现在数据文件上传 multipart/form-data 数据分开传
        // 告诉$.ajax方法不要解析请求参数
        processData: false,
        // jq默认会添加一行代码 xhr.setRequestHeader('content-type',')
        // 告诉$.ajax方法不要设置请求参数的类型
        contentType: false,
        success: function (response) {
            console.log(response);
            // 实现头像预览功能，设置给页面元素即可
            $('#preview').attr('src', response[0].avatar);
            //设置一个隐藏域，这里的路径是需要发送给服务器的
            $('#hiddenAvatar').val(response[0].avatar)
        }
    })
    //上传用户头像// 当用户选择文件的时候
    //原生代码
    // document.getElementById('avatar').onchange = function(){
    //     var fd = new FormData()
    //     fd.append('avatar',this.files[0]);
    //     var xhr = new XMLHttpRequest();
    //     xhr.open('post','/upload');
    //     xhr.send(fd)
    //     xhr.onload = function(){
    //         console.log(xhr.responseText)
    //     }
    // }
});
// 通过事件委托的方式为 编辑按钮 添加点击事件
$('#usersBox').on('click', '.edit', function () {
    // 获取被点击用户的id值
    var id = $(this).attr('data-id');
    // 根据id获取用户的详细信息
    $.ajax({
        type: 'get',
        url: '/users/' + id,
        success: function (response) {
            console.log(response);
            var html = template('modfiyTpl', response)
            $('#modfiyBox').html(html);
        }
    });
});
// 通过事件委托的方式为 修改表单 添加表单提交事件
$('#modfiyBox').on('submit', '#modfiyForm', function () {
    // 获取用户在表单中输入的内容
    var formData = $(this).serialize();
    // 获取要修改的那个用户的id值
    var id = $(this).attr('data-id');
    // 发送请求 修改用户信息
    $.ajax({
        type: 'put',
        // 告诉服务器，我们需要修改哪一个用户
        url: '/users/' + id,
        data: formData,
        success: function (response) {
            console.log(response);
            // 修改用户信息成功 重新加载页面
            location.reload();
        }
    })
    // 阻止表单的默认提交
    return false;
});
// 通过事件委托的方式为 删除按钮 添加点击事件
$('#usersBox').on('click', '.delete', function () {
    // 如果管理员要确定要删除用户
    if (confirm('您真的要删除当前用户吗？')) {
        // 获取到即将要删除的用户id
        var id = $(this).attr('data-id');
        // 向服务器端端发送请求 删除用户
        $.ajax({
            type: 'delete',
            url: '/users/' + id,
            success: function () {
                location.reload();
            }
        })
    }
});
// 批量删除用户的实现
// 当全选按钮的状态发生改变时
$('#selectAll').on('change', function () {
    // 获取到全选按钮当前的状态(获取固有属性是prop)
    var status = $(this).prop('checked');
    // 获取所有的用户,并将用户的状态和全选按钮保持一致
    $('#usersBox').find('input').prop('checked', status);
    if (status == true) {
        // 显示批量删除按钮
        $('#deleteMany').show();
    } else {
        // 隐藏批量删除按钮
        $('#deleteMany').hide();
    }
});
// 当用户前面的复选框状态发生改变时
$('#usersBox').on('change', '.userStatus', function () {
    // 获取所有用户
    var inputs = $('#usersBox').find('input');
    // var inputAll = $('#usersBox input[type="checkbox"]').length;
    // var inputCheckBox = $('#usersBox input[type="checkbox"]:checked').length;
    if (inputs.length == inputs.filter(':checked').length) {
        // alert('所有用户都是选中的')
        $('#selectAll').prop('checked', true);
    } else {
        // alert('不是所有用户都是选中的')
        $('#selectAll').prop('checked', false);
    }
    // 如果选中的复选框的数量大于0 就说明有选中的复选框
    if (inputs.filter(':checked').length > 0) {
        // 显示批量删除按钮
        $('#deleteMany').show();
    } else {
        // 隐藏批量删除按钮
        $('#deleteMany').hide();
    }
});
// 为 批量删除按钮 添加点击事件
$('#deleteMany').on('click', function () {
    var ids = [];
    // 获取选中的用户
    var checkedUser = $('#usersBox').find('input').filter(':checked');
    // var checkedUser = $('#usersBox input[type="checkbox"]:checked');
    // 循环复选框 从复选框元素的身上获取data-id属性的值
    checkedUser.each(function (index, element) {
        ids.push($(element).attr('data-id'));
    });
    if (confirm('您真要确定要进行批量删除操作吗')) {
        $.ajax({
            type: 'delete',
            url: '/users/' + ids.join('-'),
            success: function () {
                location.reload();
            }
        })
    }
});