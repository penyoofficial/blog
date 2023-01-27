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