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
            break;
        case 2:
            return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
            break;
        default:
            return 0;
            break;
    }
}

setPublicA();
// 设置页面前半公共部分
function setPublicA() {
    document.writeln("<div class=\"ad\">");
    document.writeln("    <a href=\"https://penyoofficial.github.io/cyber-museum/\" target=\"_blank\">");
    document.writeln("        访问我们的赛博博物馆，阅读有趣的硬件评测！");
    document.writeln("    </a>");
    document.writeln("    <div onclick=\"removeAD()\">×</div>");
    document.writeln("</div>");
    document.writeln("<div class=\"nav\">");
    document.writeln("    <div class=\"switch-theme\" onclick=\"switchTheme()\">💡</div>");
    document.writeln("    <div class=\"search\">🔍</div>");
    document.writeln("    <a href=\"https://penyoofficial.github.io/blog/\">Penyo 博客</a>");
    document.writeln("</div>");
    document.writeln("<div class=\"main-contain\">");
}

addArticle();
// 添加符合要求的文章结构
function addArticle() {
    let root = document.documentElement;
    let id = window.location.search.split("=")[1];
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

supplyURL();
// 为<a>型标题补充地址属性（只对主页有效）
function supplyURL() {
    Array.from(document.getElementsByClassName("article")).forEach(a => {
        Array.from(a.getElementsByClassName("title")).forEach(t => {
            t.setAttribute("href", "articles/index.html?id=" + a.getAttribute("id"));
            t.setAttribute("target", "_blank");
        })
    });
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