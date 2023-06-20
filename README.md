<div style="text-align: center">
    <img src="./assets/favicon.png" style="border: 1px solid #eee; border-radius: 10px">
    <h1>Penyo Blog <b style="color: grey">1.5</b></h1>
    <p style="transform: translateY(-10px)"><i>轻量级、扁平化的个人博客框架</i></p>
</div>

## 项目介绍

**Penyo Blog** 是基于 Web 原生技术构建的博客式框架，为用户提供伪动态的交互式服务。

项目有以下特点：

- 低性能消耗。无论是建立索引、构建还是挂载，都在一瞬间完成，对机能并不挑剔。
- 可用于如 Github Pages 的静态托管服务。避开了 Node.js 或 SpringBoot 等重量级框架的使用，牺牲了一定兼容性，但是换来了良好的静态表现。
- 结构简单，易于扩展。项目采用模块化设计，用户可在基础上快捷二次开发。

## 项目部署

您需要按照以下步骤部署项目：

1. 参照[标准](https://penyoofficial.github.io/blog-database/sample.json)，初始化 JSON 文档式数据库。
2. 打开[常量池](./constant.js)，配置个性化信息。
3. 使用 浏览器/Node.js/Tomcat 挂载 *index.html*。

## 现在与未来

Penyo Blog 于 2023 年年初立项，至今已发布若干小版本。

本次 1.5 版本主要更新内容：

- 引入 ESM 设计。
- 移除了 jQuery 并使用先进的 ES 语法将其替代。
- 引入了常量池设计。
- 将广告变为了标语。

下个大版本 2.0 将基于 Vue3 + TS 编写，大改样式，增加若干功能：

- 相册（gallery）、
- 标语墙（slogan wall）、
- 置顶文章（pinned article）等......

预计最快 2023 年 9 月发布预览版。
