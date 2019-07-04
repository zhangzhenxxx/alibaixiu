// 给表单添加提交事件
$('#userForm').on('submit',function() {
    var formdata = $('#userForm').serialize()
    // console.log(formdata);
    
    $.ajax({
        type:'post',//get或post
        url:'/users',//请求的地址
        data:formdata,//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
        dataType:'json',
        success:function(result){//成功的回调函数
            // console.log(result);
            // 刷新当前页面
            location.reload()
        },
        error:function(err) {
            alert('用户添加失败')
        }
    })

    // 防止默认行为
    return false
})

// 头像上传
$('#avatar').on('change',function(){
    console.log(this.files[0]);
    
    var formData = new FormData()
    formData.append('avatar',this.files[0])

    $.ajax({
        type:'post',//get或post
        url:'/upload',//请求的地址
        contentType:false,
        processData:false,
        data:formData,//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
        dataType:'json',
        success:function(result){//成功的回调函数
            // console.log(result)
            // 实现图片缓存
            $('#preview').attr('src',result[0].avatar)
            $('#hiddenImg').val(result[0].avatar)
        }
    })
})

// 展示用户列表页面
$.ajax({
    type:'get',//get或post
    url:'/users',//请求的地址
    // data:{},//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    dataType:'json',
    success:function(result){//成功的回调函数
        console.log(result)
        var html = template('userTpl',{data: result })
        $('#userBox').html(html)
    }
})