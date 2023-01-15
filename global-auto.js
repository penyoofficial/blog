setTheme();
// 设置主题
function setTheme() {
    let theme = "";
    if (document.documentElement.getAttribute("pagetype") != "pv")
        theme = "../";
    theme += (getUrlArgu("theme") + "-theme.css");
    if (getUrlArgu("theme") != "")
        document.getElementById("theme").setAttribute("href", theme);
}

// 获取超链接携带属性
function getUrlArgu(arguName) {
    let value = "";
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

// 设置超链接携带属性
function setUrlArgu(arguName, arguValue) {
    let url = window.location.search, i, j;
    for (i = 0; i < url.length - arguName.length - 1; i++)
        if (url.slice(i, i + arguName.length) == arguName) {
            for (j = i + arguName.length + 1; j < url.length; j++)
                if (url.slice(j, j + 1) == "&")
                    break;
            break;
        }
    window.location.search =
        window.location.search.slice(0, i) +
        arguName + "=" + arguValue +
        window.location.search.substring(j);
}

setBG();
// 随机设置背景
function setBG() {
    var pics = [
        "https://webstatic.mihoyo.com/upload/contentweb/2022/07/04/6f0ef40157e95b0d59455c12f4d3f270_3262958961633311108.png",
        "https://webstatic.mihoyo.com/upload/contentweb/2022/07/04/6c009f0631eb71e697c2da76b608a51e_1586187959203635452.png",
        "https://webstatic.mihoyo.com/upload/contentweb/2022/06/30/300df2aed5060579f08d7db601d8710d_118206614584398576.png",
        "https://webstatic.mihoyo.com/upload/contentweb/2022/06/30/494f7aa4668cb7fe2d6d0463e7cc835f_3323890008016600534.png",
        "https://webstatic.mihoyo.com/upload/contentweb/2022/08/29/9b5c8d26504c19154056175bbb7e287a_7101312865137287700.png"
    ];
    document.documentElement.style.cssText += "--bg-pic: url(" + pics[randomNum(0, pics.length - 1)] + ");";
}

// 获取随机数
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

var isAdAvailable = false;
setPublicA(isAdAvailable);
// 设置页面前半公共部分
function setPublicA(isAdAvailable) {
    if (isAdAvailable) {
        document.writeln("<div class=\"ad\">");
        document.writeln("    <a href=\"https://penyoofficial.github.io/cyber-museum/\" target=\"_blank\">");
        document.writeln("        访问我们的赛博博物馆，阅读有趣的硬件评测！");
        document.writeln("    </a>");
        document.writeln("    <div onclick=\"removeAD()\">×</div>");
        document.writeln("</div>");
    }
    document.writeln("<div class=\"nav\">");
    document.writeln("    <div class=\"switch-theme\" onclick=\"switchTheme()\">💡</div>");
    document.writeln("    <div class=\"search\">🔍</div>");
    document.writeln("    <a id=\"title\" href=\"https://penyoofficial.github.io/blog/\">Penyo 博客</a>");
    document.writeln("</div>");
    document.writeln("<div class=\"main-contain\">");
}

addArticle();
// 添加符合要求的文章结构
function addArticle() {
    let root = document.documentElement;
    let id = getUrlArgu("id");
    if (root.getAttribute("pagetype") == "pv") {
        let dataObj = $.parseJSON($.ajax({
            url: "articles/data.json",
            dataType: "json",
            async: false
        }).responseText);
        dataObj.data.forEach(article => {
            document.writeln("<div class=\"article\" id=\"" + article.id + "\">");
            document.writeln("    <h2><a class=\"title\">" + article.title + "</a></h2>");
            document.writeln("    <div class=\"body\">" + article.body + "</div>");
            document.writeln("    <div class=\"info\">");
            document.writeln("        <p class=\"time\">" + article.time + "</p>");
            document.writeln("        <a class=\"class\">" + article.class + "</a>");
            document.writeln("        <p style=\"clear: both;\"></p>");
            document.writeln("    </div>");
            document.writeln("</div>");
        });
    } else if (root.getAttribute("pagetype") == "body") {
        let dataObj = $.parseJSON($.ajax({
            url: "data.json",
            dataType: "json",
            async: false
        }).responseText);
        dataObj.data.forEach(article => {
            if (article.id == id) {
                document.writeln("<div class=\"article\" id=\"" + article.id + "\">");
                document.writeln("    <h2>" + article.title + "</h2>");
                document.writeln("    <div class=\"info\">");
                document.writeln("        <p class=\"time\">" + article.time + "</p>");
                document.writeln("        <a class=\"class\">" + article.class + "</a>");
                document.writeln("        <p style=\"clear: both;\"></p>");
                document.writeln("    </div>");
                document.writeln("    <div class=\"body\">" + article.body + "</div>");
                document.writeln("</div>");
            }
        });
    }
}

setPublicB();
// 设置页面后半公共部分
function setPublicB() {
    document.writeln("    <div class=\"copyright\">");
    document.writeln("        © 2023 Penyo. All rights reserved.");
    document.writeln("    </div>");
    document.writeln("</div>");
    document.writeln("<a href=\"#\" class=\"back-to-top\">▲</a>");
}

supplyURL(getUrlArgu("theme"));
// 为<a>型标题补充地址属性（只对主页有效）
function supplyURL(theme) {
    document.getElementById("title").setAttribute("href",
        "https://penyoofficial.github.io/blog/?theme=" + theme);
    Array.from(document.getElementsByClassName("article")).forEach(a => {
        Array.from(a.getElementsByClassName("title")).forEach(t => {
            t.setAttribute("href", "articles/index.html?theme=" + theme + "&id=" + a.getAttribute("id"));
            t.setAttribute("target", "_blank");
        })
    });
}