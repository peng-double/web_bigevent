// 每次 调用 ajax时 就会先调用这个函数
// 在 这个函数里 可以拿到我们个ajax 提供的配置对象
$.ajaxPrefilter(function(options) {
    if (options.url.indexOf("/my/") !== -1) {
        options.headers = {
            Authorization: localStorage.getItem("token") || ''
        }
    }
    options.url = "http://api-breakingnews-web.itheima.net" + options.url;
})