# 火火教学 · 初中数学模型

初中数学各章节的交互模型站点。每章一个**单文件 HTML**，可离线运行，部署在 GitHub Pages。

- 线上站点（已部署）：<https://huohuo963.github.io/huohuo-teaching/>
- 仓库名：`huohuo-teaching`（站点标题与页面品牌为「火火教学」；仓库用英文名是因为中文仓库名会让 Pages 链接变成 `%E7%81%AB%E7%81%AB%E6%95%99%E5%AD%A6` 这类编码串）

## 目录结构

```
.
├── index.html                 首页：按年级 / 章节组织的导航
├── css/style.css              首页样式
├── js/
│   ├── chapters.js            章节清单（章节名、简介、是否已上线）
│   └── site.js                首页渲染与模型弹层
├── models/                    所有章节模型
│   ├── 7a/  七年级上册
│   ├── 7b/  七年级下册
│   ├── 8a/  八年级上册
│   ├── 8b/  八年级下册
│   ├── 9a/  九年级上册
│   └── 9b/  九年级下册
├── templates/chapter-template.html   新章节模板
└── .nojekyll                  跳过 Jekyll 处理
```

## 命名约定

- 年级目录：`7a` 七上、`7b` 七下、`8a` 八上、`8b` 八下、`9a` 九上、`9b` 九下
- 模型文件：`models/<年级目录>/<两位章号>-<英文短名>.html`
- 章号沿用教材章序，例如 `models/8b/17-pythagorean.html`（八下第 17 章勾股定理）
- 每个模型文件自带样式与脚本，不引用任何外部 CDN 或图片，双击即可离线打开

## 新增一章（三步）

1. 复制 `templates/chapter-template.html` 到对应目录并按约定重命名
2. 完成页面内容，顶部保留 `← 返回章节列表` 链接（`../../index.html`）
3. 打开 `js/chapters.js`，找到对应章节，把 `ready: false` 改成 `ready: true`

刷新首页即可看到该章从「待补充」变为「已上线」，点击后在站内弹层中打开，也可右上角新窗口打开。

## 本地预览

直接双击 `index.html` 即可（模型通过 iframe 载入，`file://` 下同样可用）。
如需与线上行为完全一致，在项目根目录执行 `python -m http.server 8080`，访问 <http://localhost:8080>。

## 发布到 GitHub Pages

> 本机已登录 `huohuo963`，并在 `C:\Users\24178\.local\gh-cli\bin\gh.exe` 放有便携版 GitHub CLI；仓库已创建、Pages 已开启。日常只需提交并推送。

1. 登录 GitHub CLI（只需做一次）：

   ```powershell
   winget install --id GitHub.cli
   gh auth login
   ```

   依次选择：GitHub.com → HTTPS → Yes（用 Git 凭据）→ Login with a web browser → 复制 8 位设备码 → 在浏览器打开 <https://github.com/login/device> 输入并授权。

2. 建仓并推送：

   ```powershell
   git init -b main
   git add .
   git commit -m "初始化：火火教学站点骨架"
   gh repo create huohuo-teaching --public --source=. --remote=origin --push
   ```

3. 开启 Pages：

   ```powershell
   gh api -X POST repos/huohuo963/huohuo-teaching/pages `
     -f "source[branch]=main" -f "source[path]=/"
   ```

   也可在网页端操作：仓库 **Settings → Pages → Source 选 Deploy from a branch → main / (root)**。

4. 等待 1–2 分钟，访问 <https://huohuo963.github.io/huohuo-teaching/>。

## 版本差异（待确认）

当前 `js/chapters.js` 用的是旧版（2012 人教版）**29 章**目录；用户提到新版为 **34 章**。两者差异如下，确认版本后再统一改数据与文件路径。

| 册次 | 当前（29 章） | 2024 新版（34 章） | 主要差异 |
| --- | --- | --- | --- |
| 七上 | 有理数、整式的加减、一元一次方程、几何图形初步（4） | 有理数、有理数的运算、代数式、整式的加减、一元一次方程、几何图形初步（6） | 「有理数」拆成「有理数 + 有理数的运算」，新增「代数式」 |
| 七下 | 相交线与平行线、实数、平面直角坐标系、二元一次方程组、不等式与不等式组、数据的收集整理与描述（6） | 同名 6 章，章号改为 7–12 | 内容无变化，仅章号顺延 |
| 八上 | 三角形、全等三角形、轴对称、整式的乘法与因式分解、分式（5） | 三角形、全等三角形、轴对称、整式的乘法、因式分解、分式（6） | 「整式的乘法与因式分解」拆成两章 |
| 八下 | 二次根式、勾股定理、平行四边形、一次函数、数据的分析（5） | 二次根式、勾股定理、四边形、函数、一次函数、数据的分析（6） | 「平行四边形」扩为「四边形」，新增「函数」 |
| 九上 | 一元二次方程、二次函数、旋转、圆、概率初步（5） | 一元二次方程、二次函数、反比例函数、旋转、圆、直线与圆的位置关系（6） | 反比例函数从九下移入；「圆」拆成「圆」+「直线与圆的位置关系」；概率移出 |
| 九下 | 反比例函数、相似、锐角三角函数、投影与视图（4） | 相似、锐角三角函数、投影与视图、随机事件的概率（4） | 反比例函数移出，概率移入并更名「随机事件的概率」 |

切换版本时注意：章号会整体变化，`models/` 下已建好的模型文件需同步改名，`js/chapters.js` 中的 `no`、`slug` 也要一起改。

## 当前进度

- 已上线：七上第 1 章《有理数》（数轴 · 相反数与绝对值，示例模型）
- 其余章节已预留入口，显示为「待补充」
