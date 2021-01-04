$(function() {
    // 点击显示登录页面
    $("#link_login").on("click", function() {
            $(".title-login").show();
            $(".title-reg").hide();
        })
        // 点击显示注册页面
    $("#link_reg").on("click", function() {
            $(".title-login").hide();
            $(".title-reg").show();
        })
        // 进行表单的验证 规则
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        // 校验两次密码是否一致的规则
        repwd: function(value) {
            // 通过形参拿到的是确认密码框中的内容
            var pwd = $(".title-reg [name=password]").val()
            if (pwd != value) {
                return "两次密码不一致"
            }
        }
    })

    // 监听注册表单的提交事件
    $("#form_reg").on("submit", function(e) {
        e.preventDefault();
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }
        $.ajax({
            type: "POST",
            url: "/api/reguser",
            data,
            success: function(res) {

                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('注册成功，请登录！')
                    // 模拟人的点击行为
                $('#link_login').click()
            }
        });
    })

    // 监听登录事件
    $('#form_login').submit(function(e) {
        // 阻止默认提交行为
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'POST',
            // 快速获取表单中的数据
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败！')
                }
                layer.msg('登录成功！')
                    // 将登录成功得到的 token 字符串，保存到 localStorage 中
                localStorage.setItem('token', res.token)
                    // 跳转到后台主页
                location.href = '/index.html'
            }
        })
    })
})