// 展示文章列表
$.ajax({
    type:'get',//get或post
    url:'/posts',//请求的地址
    data:{},//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    dataType:'json',
    success:function(result){//成功的回调函数
        // console.log(result)
        var html = template('postsTpl', {data:result})
        $('#postsBox').html(html)
        var pageHtml = template('pageTpl' ,result)
        $('#pageBox').html(pageHtml)
    }
})
// 处理时间函数
function formData(data) {
    var date = new Date()
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
}
// 分页函数 
function changePage(page) {
    $.ajax({
        type:'get',//get或post
        url:'/posts',//请求的地址
        data:{
            page:page
        },//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
        dataType:'json',
        success:function(result){//成功的回调函数
            // console.log(result)
            var html = template('postsTpl', {data:result})
            $('#postsBox').html(html)
            var pageHtml = template('pageTpl' ,result)
            $('#pageBox').html(pageHtml)
        }
    
    })
}

// 文章分类展示
$.ajax({
    type:'get',//get或post
    url:'/categories',//请求的地址
    data:{},//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    dataType:'json',
    success:function(result){//成功的回调函数
        // console.log(result)
        var html = template('categoryTpl', {data:result})
        $('#categoryBox').html(html)
    }
})

// 查询文章分类
$('#filterForm').on('submit',function() {
    var formData = $(this).serialize()
    // alert(111)
    $.ajax({
        type:'get',//get或post
        url:'/posts',//请求的地址
        data:formData,//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
        dataType:'json',
        success:function(result){//成功的回调函数
            // console.log(result)
            var html = template('postsTpl', {data:result})
            $('#postsBox').html(html)
            var pageHtml = template('pageTpl' ,result)
            $('#pageBox').html(pageHtml)
        }
    })

    return false
})


 
// })
// 删除文章
$('#postsBox').on('click','.delete',function() {
    var id = $(this).attr('data-id')
    $.ajax({
        type:'delete',//get或post
        url:'/posts/' + id,//请求的地址
        data:{},//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
        dataType:'json',
        success:function(result){//成功的回调函数
            // console.log(result)
            location.reload()

        }
    })
})
