$.ajax({
    type:'get',//get或post
    url:'/comments',//请求的地址
    data:{},//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    dataType:'json',
    success:function(result){//成功的回调函数
        // console.log(result)
        var html = template('commentsTpl', result)
        $('#commentsBox').html(html)
        var pageHtml = template('commentPageTpl',result)
        $('#commentsPage').html(pageHtml)

    }
})

// 实现驳回和批准的功能
$('#commentsBox').on('click','.status',function() {
    var id = $(this).attr('data-id')
    var status = $(this).attr('data-status')
    $.ajax({
        type:'put',//get或post
        url:'/comments/' + id,//请求的地址
        data:{
            state:status == 1? 0:1
        },//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
        dataType:'json',
        success:function(result){//成功的回调函数
            // console.log(result)
            location.reload()
        }
    })
    return false
})

// 实现删除评论功能
$('#commentsBox').on('click','.edit',function() {
    var id = $(this).attr('data-id')
    $.ajax({
        type:'delete',//get或post
        url:'/comments/' + id,//请求的地址
        data:{},//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
        dataType:'json',
        success:function(result){//成功的回调函数
            // console.log(result)
            location.reload()
        }
    })
})

// 分页函数
function changePage(page) {
    $.ajax({
        type:'get',//get或post
        url:'/comments',//请求的地址
        data:{
            page:page
        },//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
        dataType:'json',
        success:function(result){//成功的回调函数
            console.log(result)
            var html = template('commentsTpl', result)
            $('#commentsBox').html(html)
            var pageHtml = template('commentPageTpl',result)
            $('#commentsPage').html(pageHtml)
        }
    })
}
