/** 对 JSON 结构化。 */
export async function getObjFromJSON(filePath) {
    try {
        const response = await fetch(filePath)
        return await response.json()
    } catch (e) {
    }
}

/** 获取 GET 参数。接收属性名为参数。 */
export function getUrlArgu(arguName) {
    var value = ""
    try {
        Array.from(window.location.search.substring(1).split("&")).forEach(argu => {
            if (argu.split("=")[0] == arguName)
                value = argu.split("=")[1]
        })
    }
    finally {
        return value
    }
}

/** 设置 GET 参数。接收属性键值对为参数。 */
export function setUrlArgu(arguName, arguValue) {
    var url = window.location.search, i, j = url.length
    for (i = 0; i < url.length; i++)
        if (url.slice(i, i + arguName.length) == arguName) {
            for (j = i + arguName.length + 1; j < url.length; j++)
                if (url.slice(j, j + 1) == "&")
                    break
            break
        }
    window.location.search =
        window.location.search.slice(0, i) +
        ((i == j && url.length > 1) ? "&" : "") + arguName + "=" + arguValue +
        window.location.search.substring(j)
}

/** 创建新的 HTML 元素。接收标签名、类或 ID、内嵌文字为参数，其中类或 ID（*classOrId*）必须是形如 *class=class-name* 的字符串。 */
export function newEle(tag, classOrId, innerHTML) {
    var e = document.createElement(tag)
    if (classOrId != undefined)
        e.setAttribute(classOrId.split("=")[0], classOrId.split("=")[1])
    if (innerHTML != undefined)
        e.innerHTML = innerHTML
    return e
}

/** 风格化。接收元素和样式文本为参数。 */
export function stylify(e, cssText) {
    e.style.cssText += cssText
    return e
}

/** 获取一个 [0, limit) 的随机数。 */
export function randomNumber(limit) {
    return Math.floor(Math.random() * 100 % limit)
}