// 添加分类
$('#addCategory').on('submit', function() {
    var formData = $(this).serialize()
    // console.log(formData);

    $.ajax({
        type:'post',//get或post
        url:'/categories',//请求的地址
        data:formData,//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
        dataType:'json',
        success:function(result){//成功的回调函数
            // console.log(result)
            location.reload()
             
        }
    })
    
    return false
})

// 展示分类
$.ajax({
    type:'get',//get或post
    url:'/categories',//请求的地址
    // data:{},//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    dataType:'json',
    success:function(result){//成功的回调函数
        // console.log(result)
        var html = template('titleTpl', {data:result})
        $('#titleBox').html(html)
    }
})

// 当点击编辑按钮时，让当前这一行的内容展示在左边表单
$('#titleBox').on('click','.edit',function() {
    var id = $(this).attr('data-id')
    console.log(id);

    $.ajax({
        type:'put',//get或post
        url:'/categories/' + id,//请求的地址
        // data:{},//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
        dataType:'json',
        success:function(result){//成功的回调函数
            console.log(result)
            var html = template('modifyFormTpl', result)
            $('#modifyBox').html(html)
        }
    })
    
})

$('#modifyBox').on('submit','#addCategory',function() {
    var formData = $(this).serialize()
    var id = $(this).attr('data-id')
    // console.log(id);
    
    $.ajax({
        type:'put',//get或post
        url:'/categories/' + id,//请求的地址
        data:formData,//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
        dataType:'json',
        success:function(result){//成功的回调函数
            // console.log(result)
            location.reload()
        }
    })
    return false

})


// 删除分类
$('#titleBox').on('click','.delete',function() {
    if(confirm('确定要删除吗')) {
        var id = $(this).attr('data-id')

        $.ajax({
            type:'delete',//get或post
            url:'/categories/' + id,//请求的地址
            data:{},//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
            dataType:'json',
            success:function(result){//成功的回调函数
                // console.log(result)
                location.reload()
            }
        })
    }
})