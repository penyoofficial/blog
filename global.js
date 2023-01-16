// 切换主题
function switchTheme() {
    switch (getUrlArgu("theme")) {
        case "light":
            theme = "dark";
            break;
        case "dark":
            theme = "light";
            break;
        default:
            theme = "dark";
    }
    supplyURL();
    setUrlArgu("theme", theme);
    setTheme(getUrlArgu("theme"));
}

// 移除广告
function removeAD() {
    supplyURL();
    setUrlArgu("ad", "false");
    document.getElementById("top-ad").style.cssText =
        "display: none;";
}

// 显隐搜索模块
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
    document.getElementById("search-box").style.cssText =
        "display: " + search + ";";
}

// 模糊搜索
function searchFuzzy() {
    setUrlArgu("body", document.getElementById("search-contain").value);
}