var theme = getUrlArgu("theme");
var ad = "false"; // 需要主动展示请更改此值！
var search = "none";

setTheme(getUrlArgu("theme"));
// 设置主题
function setTheme(now) {
    let goal = "";
    if (document.documentElement.getAttribute("pagetype") != "pv")
        goal = "../";
    goal += (now + "-theme.css");
    if (now == "light" | now == "dark")
        document.getElementById("theme").setAttribute("href", goal);
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
    let url = window.location.search, i, j = url.length;
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

setBG();
// 随机设置背景
function setBG() {
    var pics = [
        "https://webstatic.mihoyo.com/upload/contentweb/2022/07/04/6f0ef40157e95b0d59455c12f4d3f270_3262958961633311108.png",
        "https://webstatic.mihoyo.com/upload/contentweb/2022/07/04/6c009f0631eb71e697c2da76b608a51e_1586187959203635452.png",
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

setPublicA();
// 设置页面前半公共部分
function setPublicA() {
    if (ad != "false") {
        document.writeln("<div id=\"top-ad\">");
        document.writeln("    <a href=\"https://penyoofficial.github.io/cyber-museum/\" target=\"_blank\">");
        document.writeln("        访问我们的赛博博物馆，阅读有趣的硬件评测！");
        document.writeln("    </a>");
        document.writeln("    <div onclick=\"removeAD()\">×</div>");
        document.writeln("</div>");
    }
    document.writeln("<div id=\"top-nav\">");
    document.writeln("    <div id=\"switch-theme\" onclick=\"switchTheme()\">💡</div>");
    if (document.documentElement.getAttribute("pagetype") == "pv")
        document.writeln("    <div id=\"search-display\" onclick=\"searchDisplay()\">🔍</div>");
    document.writeln("    <a id=\"top-nav-title\" href=\"https://penyoofficial.github.io/blog/\">Penyo 博客</a>");
    document.writeln("</div>");
    document.writeln("<div id=\"main-contain\">");
    document.writeln("    <img id=\"welcome-actor\" src=\"https://i.328888.xyz/2023/01/17/2JlLy.png\" alt=\"\">");
    document.writeln("    <div id=\"search-box\">");
    document.writeln("        <input type=\"text\" id=\"search-contain\" placeholder=\"搜索标题或正文...\">");
    document.writeln("        <input type=\"button\" value=\"搜索\" onclick=\"searchFuzzy()\">");
    document.writeln("    </div>");
}

addArticle();
// 添加符合要求的文章结构
function addArticle() {
    let root = document.documentElement;
    let id = getUrlArgu("id");
    let isEmpty = true;
    if (root.getAttribute("pagetype") == "pv") {
        let dataObj = getJSONObj("articles/data.json");
        function addToPv(a) {
            document.writeln("<div class=\"article\" id=\"" + a.id + "\">");
            document.writeln("    <h2><a class=\"title\">" + a.title + "</a></h2>");
            document.writeln("    <div class=\"body\">" + a.body + "</div>");
            document.writeln("    <div class=\"info\">");
            document.writeln("        <p class=\"time\">" + a.time + "</p>");
            document.writeln("        <a class=\"class\" href=\"javascript: void(0);\" onclick=\"setUrlArgu(\'class\', this.innerText)\">" + a.class + "</a>");
            document.writeln("        <p style=\"clear: both;\"></p>");
            document.writeln("    </div>");
            document.writeln("</div>");
            isEmpty = false;
        };
        if (getUrlArgu("title") != "")
            dataObj.data.forEach(a => {
                if (a.title.includes.decodeURIComponent(getUrlArgu("title")))
                    addToPv(a);
            });
        else if (getUrlArgu("body") != "")
            dataObj.data.forEach(a => {
                if (a.title.includes(decodeURIComponent(getUrlArgu("body")))
                    || a.body.includes(decodeURIComponent(getUrlArgu("body"))))
                    addToPv(a);
            });
        else if (getUrlArgu("class") != "")
            dataObj.data.forEach(a => {
                if (a.class == decodeURIComponent(getUrlArgu("class")))
                    addToPv(a);
            });
        else
            dataObj.data.forEach(a => {
                addToPv(a);
            });
    } else if (root.getAttribute("pagetype") == "body") {
        let dataObj = getJSONObj("data.json");
        try {
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
                    throw new Error();
                }
            });
        } finally {
            return;
        }
    }
    if (isEmpty) {
        document.writeln("<div class=\"article error-404\">");
        document.writeln("    <h3>404</h3>");
        document.writeln("    <div>暂时没有任何文章呢o(￣ヘ￣o＃)</div>");
        document.writeln("</div>");
    }
}

// 获取Json对象
function getJSONObj(url) {
    return $.parseJSON($.ajax({
        url: url,
        dataType: "json",
        async: false
    }).responseText);
}

setPublicB();
// 设置页面后半公共部分
function setPublicB() {
    document.writeln("    <div id=\"copyright\">");
    document.writeln("        © 2023 Penyo. All rights reserved.");
    document.writeln("    </div>");
    document.writeln("</div>");
    document.writeln("<a href=\"#\" id=\"back-to-top\">▲</a>");
}

supplyURL();
// 为<a>型标题补充地址属性
function supplyURL() {
    let argus = window.location.search.substring(1);
    document.getElementById("top-nav-title").setAttribute("href",
        "https://penyoofficial.github.io/blog/" + (argus == "" ? "" : "?") + argus);
    Array.from(document.getElementsByClassName("article")).forEach(a => {
        Array.from(a.getElementsByClassName("title")).forEach(t => {
            t.setAttribute("href", "articles/index.html?id=" + a.getAttribute("id") +
                (argus == "" ? "" : "&") + argus);
        })
    });
}