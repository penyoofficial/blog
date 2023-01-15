// 移除广告
function removeAD() {
    document.getElementsByClassName("ad")[0].remove();
    isAdAvailable = false;
}

// 切换主题
function switchTheme() {
    let theme;
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
    setUrlArgu("theme", theme);
    supplyURL(theme);
    setTheme();
}