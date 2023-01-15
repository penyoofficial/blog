// 移除广告
function removeAD() {
    document.getElementsByClassName("ad")[0].remove();
}

var theme = "";
// 切换主题
function switchTheme() {
    let themeObj = document.getElementById("theme");
    theme = themeObj.getAttribute("href");
    if (theme.length > 15)
        theme = theme == "../../light-theme.css"
            ? "../../dark-theme.css"
            : "../../light-theme.css";
    else
        theme = theme == "light-theme.css"
            ? "dark-theme.css"
            : "light-theme.css";
    themeObj.setAttribute("href", theme);
}