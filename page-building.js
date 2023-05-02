/** 主题 */
var theme = localStorage.getItem("pb-theme")
/** 广告有无 */
var ad = sessionStorage.getItem("pb-ad")
ad = "false" // 默认关闭广告
/** 搜索显隐 */
var search = "none"
/** \<html\>标签 */
var html = document.documentElement
/** \<body\>标签 */
var body = document.body

window.addEventListener("load", function () {
    setTheme(theme)
    setBG()
    setPublic()
    supplyURL()

    document.querySelector("#main-contain").addEventListener("click", function () {
        if (search != "none")
            searchDisplay()
    })
})

/** 设置主题。接收主题名为参数。 */
function setTheme(now) {
    var goal = ""
    if (html.getAttribute("pagetype") != "pv")
        goal = "../"
    goal += (now + "-theme.css")
    if (now == "light" | now == "dark")
        document.querySelector("#theme").setAttribute("href", goal)
}

/** 随机设置背景。 */
function setBG() {
    var pics = [ // 图片列表
        "https://prts.wiki/images/6/60/立绘_铃兰_skin3.png",
        "https://prts.wiki/images/8/80/立绘_夕_skin1.png",
        "https://prts.wiki/images/e/ea/立绘_澄闪_skin1.png",
        "https://prts.wiki/images/b/ba/立绘_迷迭香_skin1.png",
        "https://prts.wiki/images/0/05/立绘_水月_skin1.png"
    ]
    html.style.cssText += "--bg-pic: url(" + pics[randomNum(0, pics.length - 1)] + ")"
}

/** 设置页面公共部分。 */
function setPublic() {
    // 广告
    var topAd = newEle("div")
    topAd.setAttribute("id", "top-ad")
    {
        var a = newEle("a", undefined, "访问我们的赛博博物馆，阅读有趣的硬件评测！")
        a.setAttribute("href", "https://penyoofficial.github.io/cyber-museum/")
        a.setAttribute("target", "_blank")
        var div = newEle("div", undefined, "×")
        div.setAttribute("onclick", "removeAD()")
    }
    topAd.appendChild(a)
    topAd.appendChild(div)
    if (ad != "false")
        body.appendChild(topAd)
    // 顶部导航栏
    var topNav = newEle("div", "id=top-nav")
    {
        var switchTheme = newEle("div", "id=switch-theme", "💡")
        switchTheme.setAttribute("onclick", "switchTheme()")
        var searchDisplay = newEle("div", "id=search-display", "🔍")
        searchDisplay.setAttribute("onclick", "searchDisplay()")
        var searchBox = newEle("div", "id=search-box")
        {
            var searchContain = newEle("input", "id=search-contain")
            searchContain.setAttribute("type", "text")
            searchContain.setAttribute("placeholder", "搜索标题或正文...")
            var searchSubmit = newEle("input", "id=search-submit")
            searchSubmit.setAttribute("type", "button")
            searchSubmit.setAttribute("value", "搜索")
            searchSubmit.setAttribute("onclick", "searchFuzzy()")
        }
        searchBox.appendChild(searchContain)
        searchBox.appendChild(searchSubmit)
        var topNavTitle = newEle("a", "id=top-nav-title", "Penyo 博客")
        topNavTitle.setAttribute("href", "https://penyoofficial.github.io/blog/")
    }
    topNav.appendChild(switchTheme)
    if (html.getAttribute("pagetype") == "pv")
        topNav.appendChild(searchDisplay)
    topNav.appendChild(searchBox)
    topNav.appendChild(topNavTitle)
    body.appendChild(topNav)
    // 主内容
    var mainContain = newEle("div", "id=main-contain")
    {
        var welcomeActor = newEle("img", "id=welcome-actor")
        welcomeActor.setAttribute("src", "https://i.328888.xyz/2023/01/17/2JlLy.png")
        welcomeActor.setAttribute("alt", "你是想抓到我吗？")
    }
    mainContain.appendChild(welcomeActor)
    try {
        addArticle(mainContain)
    } catch (e) {
        display404(mainContain, "我们与数据库失联了")
    }
    mainContain.appendChild(newEle("div", "id=copyright", "© 2023 Penyo. All rights reserved. "))
    body.appendChild(mainContain)
    // 回顶
    var backToTop = newEle("a", "id=back-to-top", "▲")
    backToTop.setAttribute("href", "#")
    body.appendChild(backToTop)
}

/** 显示空白匹配应对案。 */
function display404(container, errorInfo) {
    var error404 = newEle("div", "class=article error-404")
    error404.appendChild(newEle("h3", undefined, "404"))
    error404.appendChild(newEle("div", undefined, errorInfo + " o(￣ヘ￣o＃)"))
    container.appendChild(error404)
}

/** 添加符合要求的文章结构。 */
function addArticle(container) {
    var data = getJSONObj("https://penyoofficial.github.io/blog-database/articles.json")
    var isEmpty = true
    if (html.getAttribute("pagetype") == "pv") { // 主页
        function addToPv(a) {
            var article = newEle("div", "class=article")
            article.setAttribute("id", a.id)
            {
                var h2 = newEle("h2")
                h2.appendChild(newEle("a", "class=title", a.title))
                var bd = newEle("div", "class=body")
                bd.innerHTML = a.body
                var info = newEle("div", "class=info")
                {
                    var cla = newEle("a", "class=class", a.class)
                    cla.setAttribute("href", "javascript: void(0)")
                    cla.setAttribute("onclick", "setUrlArgu('class', this.innerHTML)")
                }
                info.appendChild(newEle("p", "class=time", a.time))
                info.appendChild(cla)
                info.appendChild(stylify(newEle("p"), "clear: both"))
            }
            article.appendChild(h2)
            article.appendChild(bd)
            article.appendChild(info)
            container.appendChild(article)
            isEmpty = false
        }
        if (getUrlArgu("title") != "")
            data.articles.forEach(a => {
                if (a.title.includes(decodeURIComponent(getUrlArgu("title"))))
                    addToPv(a)
            })
        else if (getUrlArgu("body") != "")
            data.articles.forEach(a => {
                if (a.title.includes(decodeURIComponent(getUrlArgu("body")))
                    || a.body.includes(decodeURIComponent(getUrlArgu("body"))))
                    addToPv(a)
            })
        else if (getUrlArgu("class") != "")
            data.articles.forEach(a => {
                if (a.class == decodeURIComponent(getUrlArgu("class")))
                    addToPv(a)
            })
        else
            data.articles.forEach(a => {
                addToPv(a)
            })
    } else if (html.getAttribute("pagetype") == "body") { // 正文页
        data.articles.forEach(a => {
            if (a.id == getUrlArgu("id")) {
                // 标签页标题
                if (html.getAttribute("pagetype") == "body")
                    document.querySelector("#page-title").innerHTML = a.title + " - " + a.class + " - " + document.querySelector("#page-title").innerHTML
                // 正文
                var article = newEle("div", "class=article")
                {
                    var info = newEle("div", "class=info")
                    info.appendChild(newEle("p", "class=time", a.time))
                    info.appendChild(newEle("a", "class=class", a.class))
                    info.appendChild(stylify(newEle("p"), "clear: both"))
                    var bd = newEle("div", "class=body")
                    bd.innerHTML = a.body
                }
                article.appendChild(newEle("h2", undefined, a.title))
                article.appendChild(info)
                article.appendChild(bd)
                if (isEmpty)
                    container.appendChild(article)
                isEmpty = false
            }
        })
    }
    if (isEmpty) // 空匹配
        display404(container, "未能找到任何文章")
}

/** 为\<a\>型标题补充地址属性。 */
function supplyURL() {
    Array.from(document.getElementsByClassName("article")).forEach(a => {
        Array.from(a.getElementsByClassName("title")).forEach(t => {
            t.setAttribute("href", "articles/index.html?id=" + a.getAttribute("id"))
        })
    })
}