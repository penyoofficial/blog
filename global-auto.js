/** 主题 */
var theme = getUrlArgu("theme");
/** 广告有无 */
var ad = "false"; // 需要主动展示请更改值为：getUrlArgu("ad")
/** 搜索显隐 */
var search = "none";
/** \<html\>标签 */
var html = document.documentElement;
/** \<body\>标签 */
var body = document.body;

setTheme(getUrlArgu("theme"));
/** 设置主题。接收主题名为参数。 */
function setTheme(now) {
    var goal = "";
    if (html.getAttribute("pagetype") != "pv")
        goal = "../";
    goal += (now + "-theme.css");
    if (now == "light" | now == "dark")
        document.getElementById("theme").setAttribute("href", goal);
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

setBG();
/** 随机设置背景。 */
function setBG() {
    var pics = [ // 图片列表
        "https://webstatic.mihoyo.com/upload/contentweb/2022/07/04/6f0ef40157e95b0d59455c12f4d3f270_3262958961633311108.png",
        "https://webstatic.mihoyo.com/upload/contentweb/2022/07/04/6c009f0631eb71e697c2da76b608a51e_1586187959203635452.png",
        "https://webstatic.mihoyo.com/upload/contentweb/2022/06/30/494f7aa4668cb7fe2d6d0463e7cc835f_3323890008016600534.png",
        "https://webstatic.mihoyo.com/upload/contentweb/2022/08/29/9b5c8d26504c19154056175bbb7e287a_7101312865137287700.png"
    ];
    document.documentElement.style.cssText += "--bg-pic: url(" + pics[randomNum(0, pics.length - 1)] + ");";
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

setPublic();
/** 设置页面公共部分。 */
function setPublic() {
    // 广告
    var topAd = createElement("div");
    topAd.setAttribute("id", "top-ad"); {
        var a = createElement("a", undefined, "访问我们的赛博博物馆，阅读有趣的硬件评测！");
        a.setAttribute("href", "https://penyoofficial.github.io/cyber-museum/");
        a.setAttribute("target", "_blank");
        var div = createElement("div", undefined, "×");
        div.setAttribute("onclick", "removeAD();")
    }
    topAd.appendChild(a);
    topAd.appendChild(div);
    if (ad != "false")
        body.appendChild(topAd);
    // 顶部导航栏
    var topNav = createElement("div", "id=top-nav"); {
        var switchTheme = createElement("div", "id=switch-theme", "💡");
        switchTheme.setAttribute("onclick", "switchTheme();");
        var searchDisplay = createElement("div", "id=search-display", "🔍");
        searchDisplay.setAttribute("onclick", "searchDisplay();");
        var topNavTitle = createElement("a", "id=top-nav-title", "Penyo 博客");
        topNavTitle.setAttribute("href", "https://penyoofficial.github.io/blog/");
    }
    topNav.appendChild(switchTheme);
    if (html.getAttribute("pagetype") == "pv")
        topNav.appendChild(searchDisplay);
    topNav.appendChild(topNavTitle);
    body.appendChild(topNav);
    // 主内容
    var mainContain = createElement("div", "id=main-contain"); {
        var welcomeActor = createElement("img", "id=welcome-actor");
        welcomeActor.setAttribute("src", "https://i.328888.xyz/2023/01/17/2JlLy.png");
        welcomeActor.setAttribute("alt", "你是想抓到我吗？");
        var searchBox = createElement("div", "id=search-box"); {
            var searchContain = createElement("input", "id=search-contain");
            searchContain.setAttribute("type", "text");
            searchContain.setAttribute("placeholder", "搜索标题或正文...");
            var input = createElement("input");
            input.setAttribute("type", "button");
            input.setAttribute("value", "搜索");
            input.setAttribute("onclick", "searchFuzzy();");
        }
        searchBox.appendChild(searchContain);
        searchBox.appendChild(input);
    }
    mainContain.appendChild(welcomeActor);
    mainContain.appendChild(searchBox);
    try {
        addArticle(mainContain);
    } catch (e) {
        console.log("我们与数据库失联了！");
        display404(mainContain);
    }
    mainContain.appendChild(createElement("div", "id=copyright", "© 2023 Penyo. All rights reserved. "));
    body.appendChild(mainContain);
    // 回顶
    var backToTop = createElement("a", "id=back-to-top", "▲");
    backToTop.setAttribute("href", "#");
    body.appendChild(backToTop);
}

/** 创建新的HTML元素。接收标签名、类或ID、内嵌文字为参数，其中类或ID（*classOrId*）必须是形如*class=class-name*的字符串。 */
function createElement(tag, classOrId, innerText) {
    var e = document.createElement(tag);
    if (classOrId != undefined)
        e.setAttribute(classOrId.split("=")[0], classOrId.split("=")[1]);
    if (innerText != undefined)
        e.innerText = innerText;
    return e;
}

/** 显示空白匹配应对案。 */
function display404(container) {
    var error404 = createElement("div", "class=article error-404");
    error404.appendChild(createElement("h3", undefined, "404"));
    error404.appendChild(createElement("div", undefined, "暂时没有任何文章呢o(￣ヘ￣o＃)"));
    container.appendChild(error404);
}

/** 添加符合要求的文章结构。 */
function addArticle(container) {
    var data = getJSONObj("https://raw.githubusercontent.com/penyoofficial/blog-database/main/articles.json");
    var isEmpty = true;
    if (html.getAttribute("pagetype") == "pv") { // 主页
        function addToPv(a) {
            var article = createElement("div", "class=article");
            article.setAttribute("id", a.id); {
                var h2 = createElement("h2");
                h2.appendChild(createElement("a", "class=title", a.title));
                var bd = createElement("div", "class=body");
                bd.innerHTML = a.body;
                var info = createElement("div", "class=info"); {
                    var cla = createElement("a", "class=class", a.class);
                    cla.setAttribute("href", "javascript: void(0);")
                    cla.setAttribute("onclick", "setUrlArgu('class', this.innerText);")
                }
                info.appendChild(createElement("p", "class=time", a.time));
                info.appendChild(cla);
                info.appendChild(stylify(createElement("p"), "clear: both;"));
            }
            article.appendChild(h2);
            article.appendChild(bd);
            article.appendChild(info);
            container.appendChild(article);
            isEmpty = false;
        };
        if (getUrlArgu("title") != "")
            data.articles.forEach(a => {
                if (a.title.includes.decodeURIComponent(getUrlArgu("title")))
                    addToPv(a);
            });
        else if (getUrlArgu("body") != "")
            data.articles.forEach(a => {
                if (a.title.includes(decodeURIComponent(getUrlArgu("body")))
                    || a.body.includes(decodeURIComponent(getUrlArgu("body"))))
                    addToPv(a);
            });
        else if (getUrlArgu("class") != "")
            data.articles.forEach(a => {
                if (a.class == decodeURIComponent(getUrlArgu("class")))
                    addToPv(a);
            });
        else
            data.articles.forEach(a => {
                addToPv(a);
            });
    } else if (html.getAttribute("pagetype") == "body") { // 正文页
        data.articles.forEach(a => {
            if (a.id == getUrlArgu("id")) {
                var article = createElement("div", "class=article"); {
                    var info = createElement("div", "class=info");
                    info.appendChild(createElement("p", "class=time", a.time));
                    info.appendChild(createElement("a", "class=class", a.class));
                    info.appendChild(stylify(createElement("p"), "clear: both;"));
                    var bd = createElement("div", "class=body");
                    bd.innerHTML = a.body;
                }
                article.appendChild(createElement("h2", undefined, a.title));
                article.appendChild(info);
                article.appendChild(bd);
                if (isEmpty)
                    container.appendChild(article);
                isEmpty = false;
            }
        });
    }
    if (isEmpty) // 空匹配
        display404(container);
}

/** 获取Json对象。 */
function getJSONObj(url) {
    return $.parseJSON($.ajax({
        url: url,
        dataType: "json",
        async: false
    }).responseText);
}

/** 风格化。接收元素和样式文本为参数。 */
function stylify(e, cssText) {
    e.style.cssText += cssText;
    return e;
}

supplyURL();
/** 为\<a\>型标题补充地址属性。 */
function supplyURL() {
    var argus = window.location.search.substring(1);
    document.getElementById("top-nav-title").setAttribute("href",
        "https://penyoofficial.github.io/blog/" + (argus == "" ? "" : "?") + argus);
    Array.from(document.getElementsByClassName("article")).forEach(a => {
        Array.from(a.getElementsByClassName("title")).forEach(t => {
            t.setAttribute("href", "articles/index.html?id=" + a.getAttribute("id") +
                (argus == "" ? "" : "&") + argus);
        })
    });
}