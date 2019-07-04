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
$('#formBox').on('change','#avatar',function() {
    // console.log(this.files[0]);
    
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


// $('.aside').on('change','#avatar',function() {
//     // console.log(this.files[0]);
    
//     var formData = new FormData()
//     formData.append('avatar',this.files[0])

//     $.ajax({
//         type:'post',//get或post
//         url:'/upload',//请求的地址
//         contentType:false,
//         processData:false,
//         data:formData,//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
//         dataType:'json',
//         success:function(result){//成功的回调函数
//             // console.log(result)
//             // 实现图片缓存
//             $('#preview').attr('src',result[0].avatar)
//             $('#hiddenImg').val(result[0].avatar)
//         }
//     })
// })
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

// 修改用户
$('#userBox').on('click', '.edit', function() {
    var id = $(this).attr('data-id')
    // alert(id)

    $.ajax({
        type:'get',//get或post
        url:'/users/' + id,//请求的地址
        data:{},//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
        dataType:'json',
        success:function(result){//成功的回调函数
            console.log(result)
            var html = template('modifyTpl', result)
            $('#formBox').html(html)
            
        }
    })

  
})

$('#formBox').on('submit','#userForm',function() {
    var formdata = $('#userForm').serialize()
    var id = $(this).attr('data-id')
    console.log(id);
    
    $.ajax({
        type:'put',//get或post
        url:'/users/' + id,//请求的地址
        data:formdata,//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
        dataType:'json',
        success:function(result){//成功的回调函数
            console.log(result)
            location.reload()

        }
    })

    return false
})


// 删除用户
$('#userBox').on('click','.delete',function() {
    var id = $(this).attr('data-id')
    // console.log(id);
    $.ajax({
        type:'delete',//get或post
        url:'/users/' + id,//请求的地址
        data:{},//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
        dataType:'json',
        success:function(result){//成功的回调函数
            // console.log(result)
            location.reload()

        }
    })

})

// 当选中全选框是，用户列表的选中框处于全部被选中状态
$('#selectAll').on('change',function() {
    var bool = $(this).prop('checked')
    $('#userBox').find('.status').prop('checked',bool)
    if(bool == true) {
        $('#deleteMany').show()
    }else{
        $('#deleteMany').hide()
    }
})

// 当用户的勾选框被全部选中后，上面对的全选框也会被选中
$('#userBox').on('change','.status',function() {
    if($('#userBox').find('.status').length == $('#userBox').find('.status').filter(':checked').length) {
        $('#selectAll').prop('checked',true)
    }else {
        $('#selectAll').prop('checked',false)

    }
    if($('#userBox').find('.status').filter(':checked').length >=2) {
        $('#deleteMany').show()

    }else{
        $('#deleteMany').hide()
    }
})

// 批量删除
$('#deleteMany').on('click',function() {
    if(confirm('确定要删？')) {
        var selectAll = $('#userBox').find('.status').filter(':checked')
        var arr = []
        selectAll.each(function(index,element) {
        console.log($(element).attr('data-id')); 
        arr.push($(element).attr('data-id'))
        })
        $.ajax({
            type:'delete',//get或post
            url:'/users/' + arr.join('-'),//请求的地址
            data:{},//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
            dataType:'json',
            success:function(result){//成功的回调函数
                location.reload();
            }
        })
    }

})