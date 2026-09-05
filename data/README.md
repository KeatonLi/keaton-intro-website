# 个人网站内容配置

网站的视觉样式与页面结构保留在 Vue 文件中，持续变化的内容全部放在 `data/` 目录的 JSON 配置里。以后更新简历、项目或外站文章时，不需要修改页面代码。

## 配置文件

- `profile.json`：品牌、全站导航、单页首页、个人简介、教育经历、工作经历、项目经历与联系信息。
- `portfolio.json`：作品集入口页的标题、说明和当前状态。确定作品集方向后可继续扩展数组字段。
- `blog.json`：外站文章的预览与摘要。本站不承载文章正文。

## 给维护者或 AI 的修改说明

- 只修改合法 JSON，不要添加注释或尾随逗号。
- `profile.json` 中的 `site.navigation` 控制全站导航与顺序；站点 Logo 点击后返回首页，“简历”直接定位到首页中的个人简介章节。
- `home` 控制首页标题、说明和“云原生 / DevOps / SRE”三类技术能力。
- `metrics` 控制首页四项关键数据。
- `featuredProjectId` 必须对应 `projects` 中某个项目的 `id`。
- `education`、`workExperience`、`projects` 的数组顺序就是简历页面的展示顺序。
- `projects[].icon` 使用 Nuxt Icon 名称；`projects[].visual`、`workExperience[].logo`、`education[].logo` 使用本地图片路径。
- 图片放入 `public/` 目录，在 JSON 中使用以 `/` 开头的访问路径。
- 新增字段前先确认页面模板是否已读取该字段；修改现有文字、数组或图片路径不需要改代码。

## 外站文章配置格式

在 `blog.json` 的 `articles` 数组中加入以下结构，页面会自动生成可点击的摘要卡片，并在新窗口打开正文：

```json
{
  "title": "文章标题",
  "summary": "文章摘要",
  "platform": "发布平台",
  "date": "2026-09-05",
  "url": "https://example.com/article",
  "tags": ["云原生", "SRE"]
}
```

本地开发时保存 JSON 后页面会自动刷新。正式网站更新配置后仍需重新构建并部署静态资源，但不需要修改页面代码。
