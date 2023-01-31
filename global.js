/** 创建新的HTML元素。接收标签名、类或ID、内嵌文字为参数，其中类或ID（*classOrId*）必须是形如*class=class-name*的字符串。 */
function createElement(tag, classOrId, innerText) {
    var e = document.createElement(tag);
    if (classOrId != undefined)
        e.setAttribute(classOrId.split("=")[0], classOrId.split("=")[1]);
    if (innerText != undefined)
        e.innerText = innerText;
    return e;
}

/** 获取Json对象。 */
function getJSONObj(url) {
    return $.parseJSON($.ajax({
        url: url,
        dataType: "json",
        async: false
    }).responseText);
}

/** 获取超链接携带属性。接收属性名为参数。 */
function getUrlArgu(arguName) {
    var value = "";
    try {
        Array.from(window.location.search.substring(1).split("&")).forEach(argu => {
            if (argu.split("=")[0] == arguName)
                value = argu.split("=")[1];
        });
    }
    finally {
        return value;
    }
}

/** 获取随机数。接收闭区间为参数。 */
function randomNum(minNum, maxNum) {
    switch (arguments.length) {
        case 1:
            return parseInt(Math.random() * minNum + 1, 10);
        case 2:
            return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
        default:
            return 0;
    }
}

/** 移除广告。 */
function removeAD() {
    sessionStorage.setItem("pb-ad", "false");
    stylify(document.getElementById("top-ad"),
        "display: none;");
}

/** 控制搜索模块显隐。 */
function searchDisplay() {
    switch (search) {
        case "none":
            search = "block";
            break;
        case "block":
            search = "none";
            break;
        default:
            search = "none";
    }
    stylify(document.getElementById("search-box"),
        "display: " + search + ";");
}

/** 提交用户输入内容到超链接中。 */
function searchFuzzy() {
    setUrlArgu("body", document.getElementById("search-contain").value);
}

/** 设置超链接携带属性。接收属性键值对为参数。 */
function setUrlArgu(arguName, arguValue) {
    var url = window.location.search, i, j = url.length;
    for (i = 0; i < url.length; i++)
        if (url.slice(i, i + arguName.length) == arguName) {
            for (j = i + arguName.length + 1; j < url.length; j++)
                if (url.slice(j, j + 1) == "&")
                    break;
            break;
        }
    window.location.search =
        window.location.search.slice(0, i) +
        ((i == j && url.length > 1) ? "&" : "") + arguName + "=" + arguValue +
        window.location.search.substring(j);
}

/** 风格化。接收元素和样式文本为参数。 */
function stylify(e, cssText) {
    e.style.cssText += cssText;
    return e;
}

/** 切换主题。 */
function switchTheme() {
    switch (localStorage.getItem("pb-theme")) {
        case "light":
            theme = "dark";
            break;
        case "dark":
            theme = "light";
            break;
        default:
            theme = "dark";
    }
    localStorage.setItem("pb-theme", theme);
    setTheme(theme);
}