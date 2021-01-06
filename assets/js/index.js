$(function() {
        const layer = layui.layer;
        getUserInfo();
        $(".layui-nav-itemself").on("click", function(e) {
            layer.confirm('确认退出?', { icon: 3, title: '提示' }, function(index) {
                //do something
                localStorage.removeItem("token");
                location.href = "/login.html"
                layer.close(index);
            });
        })
    })
    //获取 用户的基本信息
function getUserInfo(param) {
    $.ajax({
        type: "GET",
        url: "/my/userinfo",
        success: function(res) {
            if (res.status !== 0) {
                return layer.msg("获取用户信息失败")
            }
            renderAvatar(res.data);
        },
        complete: function(res) {
            if (res.responseJSON.status == 1 && res.responseJSON.message == "身份认证失败！") {
                location.href = "/login.html";
                localStorage.removeItem("token");
            }
        }

    })
}
// 渲染用户的头像
function renderAvatar(user) {
    let name = user.nickname || user.username
    $(".welcome").html("欢迎&nbsp;&nbsp;" + name);
    if (user.user_pic) {
        $(".layui-nav-img").show();
        $(".title_avatar").hide();
    } else {
        let userName = user.username[0].toUpperCase();

        $(".title_avatar").html(userName);
        $(".layui-nav-img").hide();
        $(".title_avatar").show();
    }
}