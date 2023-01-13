function removeAD() {
    document.getElementsByClassName("ad")[0].remove();
}

var theme = "";
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