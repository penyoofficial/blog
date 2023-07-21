import { Host, DBOptions } from './constant.js'
import * as Util from './utility.js'

/** 主题 */
var theme = localStorage.getItem("pb-theme")
/** 标语有无 */
var slogan = sessionStorage.getItem("pb-slogan") === "false" ? false : true
/** 搜索显隐 */
var search = "none"
/** \<html\>标签 */
var html = document.documentElement
/** \<body\>标签 */
var body = document.body

/** 移除标语。 */
function removeSlogan() {
    sessionStorage.setItem("pb-slogan", false)
    Util.stylify(document.querySelector("#top-slogan"), "display: none")
}

/** 设置主题。接收主题名为参数。 */
function setTheme(now) {
    if (now == "light" || now == "dark")
        html.setAttribute("theme", now)
}

/** 切换主题。 */
function switchTheme() {
    switch (localStorage.getItem("pb-theme")) {
        case "light":
            theme = "dark"
            break
        case "dark":
            theme = "light"
            break
        default:
            theme = "dark"
    }
    localStorage.setItem("pb-theme", theme)
    setTheme(theme)
}

/** 控制搜索模块显隐。 */
function searchDisplay() {
    switch (search) {
        case "none":
            search = "block"
            break
        case "block":
            search = "none"
            break
        default:
            search = "none"
    }
    Util.stylify(document.querySelector("#search-box"), "display: " + search + "")
}

/** 提交用户输入内容到超链接中。 */
function searchFuzzy() {
    Util.setUrlArgu("body", document.querySelector("#search-contain").value)
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
    Util.stylify(html, "--bg-pic: url(" + pics[Util.randomNumber(pics.length - 1)] + ")")
}

/** 设置页面公共部分。 */
async function setPublic() {
    // 标语
    var topSlogan = Util.newEle("div")
    topSlogan.setAttribute("id", "top-slogan")
    {
        const SLOGANS = await Util.getObjFromJSON(DBOptions.URL + "slogans.json")
        if (!SLOGANS)
            SLOGANS = [{ value: "最坏的情况......" }]
        const i = SLOGANS.length
        var a = Util.newEle("a", undefined, SLOGANS[Util.randomNumber(i)].value)
        var div = Util.newEle("div", "id=remove-slogan", "×")
    }
    topSlogan.appendChild(a)
    topSlogan.appendChild(div)
    if (slogan)
        body.appendChild(topSlogan)
    // 顶部导航栏
    var topNav = Util.newEle("div", "id=top-nav")
    {
        var switchTheme = Util.newEle("div", "id=switch-theme", "💡")
        var searchDisplay = Util.newEle("div", "id=search-display", "🔍")
        var searchBox = Util.newEle("div", "id=search-box")
        {
            var searchContain = Util.newEle("input", "id=search-contain")
            searchContain.setAttribute("type", "text")
            searchContain.setAttribute("placeholder", "搜索标题或正文...")
            var searchSubmit = Util.newEle("input", "id=search-submit")
            searchSubmit.setAttribute("type", "button")
            searchSubmit.setAttribute("value", "搜索")
        }
        searchBox.appendChild(searchContain)
        searchBox.appendChild(searchSubmit)
        var topNavTitle = Util.newEle("a", "id=top-nav-title", Host.NAME + " 博客")
        topNavTitle.setAttribute("href", Host.BLOG_PAGE)
    }
    topNav.appendChild(switchTheme)
    if (html.getAttribute("pagetype") == "pv")
        topNav.appendChild(searchDisplay)
    topNav.appendChild(searchBox)
    topNav.appendChild(topNavTitle)
    body.appendChild(topNav)
    // 主内容
    var mainContain = Util.newEle("div", "id=main-contain")
    {
        var welcomeActor = Util.newEle("img", "id=welcome-actor")
        welcomeActor.setAttribute("src", "https://i.imgloc.com/2023/06/20/V8pDKx.png")
        welcomeActor.setAttribute("alt", "你是想抓到我吗？")
    }
    mainContain.appendChild(welcomeActor)
    try {
        await addArticle(mainContain)
    } catch (e) {
        display404(mainContain, "我们与数据库失联了")
    }
    mainContain.appendChild(Util.newEle("div", "id=copyright", "© 2023 " + Host.NAME + ". All rights reserved. "))
    body.appendChild(mainContain)
    // 回顶
    var backToTop = Util.newEle("a", "id=back-to-top", "▲")
    backToTop.setAttribute("href", "#")
    body.appendChild(backToTop)
}

/** 显示空白匹配应对案。 */
function display404(container, errorInfo) {
    var error404 = Util.newEle("div", "class=article error-404")
    error404.appendChild(Util.newEle("h3", undefined, "404"))
    error404.appendChild(Util.newEle("div", undefined, errorInfo + " o(￣ヘ￣o＃)"))
    container.appendChild(error404)
}

/** 添加符合要求的文章结构。 */
async function addArticle(container) {
    const ARTICLES = await Util.getObjFromJSON(DBOptions.URL + "articles.json")
    var isEmpty = true
    if (html.getAttribute("pagetype") == "pv") { // 主页
        function addToPv(a) {
            var article = Util.newEle("div", "class=article")
            article.setAttribute("id", a.id)
            {
                var h2 = Util.newEle("h2")
                h2.appendChild(Util.newEle("a", "class=title", a.title))
                var bd = Util.newEle("div", "class=body")
                bd.innerHTML = Util.getPlainText(a.body).slice(0, 200) + "......"
                var info = Util.newEle("div", "class=info")
                {
                    var cg = Util.newEle("a", "class=category", a.category)
                    cg.setAttribute("href", "javascript: void(0)")
                }
                info.appendChild(Util.newEle("p", "class=time", new Date(a.time.$date).toISOString().slice(0, 10)))
                info.appendChild(cg)
                info.appendChild(Util.stylify(Util.newEle("p"), "clear: both"))
            }
            article.appendChild(h2)
            article.appendChild(bd)
            article.appendChild(info)
            container.appendChild(article)
            isEmpty = false
        }
        if (Util.getUrlArgu("title") != "")
            ARTICLES.forEach(a => {
                if (a.title.includes(decodeURIComponent(Util.getUrlArgu("title"))))
                    addToPv(a)
            })
        else if (Util.getUrlArgu("body") != "")
            ARTICLES.forEach(a => {
                if (a.title.includes(decodeURIComponent(Util.getUrlArgu("body")))
                    || a.body.includes(decodeURIComponent(Util.getUrlArgu("body"))))
                    addToPv(a)
            })
        else if (Util.getUrlArgu("category") != "")
            ARTICLES.forEach(a => {
                if (a.category == decodeURIComponent(Util.getUrlArgu("category")))
                    addToPv(a)
            })
        else
            ARTICLES.forEach(a => {
                addToPv(a)
            })
    } else if (html.getAttribute("pagetype") == "body") { // 正文页
        ARTICLES.forEach(a => {
            if (a.id == Util.getUrlArgu("id")) {
                // 标签页标题
                if (html.getAttribute("pagetype") == "body")
                    document.querySelector("#page-title").innerHTML = a.title + " - " + a.category + " - " + document.querySelector("#page-title").innerHTML
                // 正文
                var article = Util.newEle("div", "class=article")
                {
                    var info = Util.newEle("div", "class=info")
                    info.appendChild(Util.newEle("p", "class=time", new Date(a.time.$date).toISOString().slice(0, 10)))
                    info.appendChild(Util.newEle("a", "class=category", a.category))
                    info.appendChild(Util.stylify(Util.newEle("p"), "clear: both"))
                    var bd = Util.newEle("div", "class=body")
                    bd.innerHTML = a.body
                }
                article.appendChild(Util.newEle("h2", undefined, a.title))
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

/** 为\<a\>型 DOM 补充动态属性。 */
function supplyURL() {
    Array.from(document.getElementsByClassName("article")).forEach(a => {
        a.querySelector(".title").setAttribute("href", "article.html?id=" + a.getAttribute("id"))
        let cg = a.querySelector(".category")
        cg.addEventListener("click", function () {
            Util.setUrlArgu("category", cg.innerHTML)
        })
    })
}

window.addEventListener("load", async function () {
    setTheme(theme)
    setBG()
    await setPublic()
    if (html.getAttribute("pagetype") == "pv")
        supplyURL()

    if (slogan)
        document.querySelector("#remove-slogan").addEventListener("click", function () {
            removeSlogan()
        })
    document.querySelector("#switch-theme").addEventListener("click", function () {
        switchTheme()
    })
    if (html.getAttribute("pagetype") == "pv") {
        document.querySelector("#search-display").addEventListener("click", function () {
            searchDisplay()
        })
        document.querySelector("#search-submit").addEventListener("click", function () {
            searchFuzzy()
        })
    }
    document.querySelector("#main-contain").addEventListener("click", function () {
        if (search != "none")
            searchDisplay()
    })
    window.addEventListener('scroll', function () {
        var backToTop = document.getElementById('back-to-top')
        if (window.scrollY > 800)
            Util.stylify(backToTop, "display: block")
        else
            Util.stylify(backToTop, "display: none")

    })
})