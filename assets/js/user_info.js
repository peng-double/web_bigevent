$(function() {
    var form = layui.form;
    var layer = layui.layer;

    form.verify({
            nickname: function(value) {
                if (value.length > 8) {
                    return "昵称长度必须在1 ~ 8 个字符之间"
                }
            }
        })
        // 初始化 用户的基本信息
    inniUserInfo()

    function inniUserInfo() {
        $.ajax({
            type: "GET",
            url: "/my/userinfo",
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg("获取用户信息失败！")
                }
                // 快速给表单元素赋值
                // console.log(res);
                form.val("user_info_from", res.data)
            }
        })
    }
    // 重置按钮
    $("#info_reset").click(function(e) {
        e.preventDefault();
        inniUserInfo()
    })


    //监听表单的提交事件 
    $(".layui-form").on("submit", function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/my/userinfo",
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg("更新用户信息成功！")
                inniUserInfo()
                window.parent.getUserInfo()
            }
        })
    })
})