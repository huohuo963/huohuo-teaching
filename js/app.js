/*
 * 火火教学 · 站点交互
 * 数据来自 js/curriculum.js（册 → 章 → 节）
 * 路由：#/ 首页，#ch=7 章页，#s=7.2.2 节页，#g=7a 首页定位到某册
 */
(function () {
  "use strict";

  var CURRICULUM = window.CURRICULUM || [];

  var TYPE = {
    sec:        { label: "", mark: "" },
    reading:    { label: "阅读与思考", mark: "阅" },
    experiment: { label: "实验与探究", mark: "验" },
    inquiry:    { label: "观察与猜想", mark: "猜" },
    tech:       { label: "信息技术应用", mark: "技" },
    review:     { label: "数学活动 · 小结 · 复习题", mark: "习" },
    project:    { label: "综合与实践 · 课题学习", mark: "践" }
  };

  function pad2(n) { return (n < 10 ? "0" : "") + n; }

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  function enc(s) { return encodeURIComponent(s); }

  /* ---------- 整理数据 ---------- */
  var grades = [];
  var flat = [];
  var byId = Object.create(null);
  var chapterByNo = Object.create(null);
  var allChapters = [];

  CURRICULUM.forEach(function (rawGrade) {
    var grade = {
      id: rawGrade.id, name: rawGrade.name, short: rawGrade.short,
      chapters: [], count: 0, readyCount: 0
    };
    grades.push(grade);

    rawGrade.chapters.forEach(function (rawChap) {
      var chap = {
        no: rawChap.no, title: rawChap.title, grade: grade,
        sections: [], sectionCount: 0, readyCount: 0
      };
      grade.chapters.push(chap);
      allChapters.push(chap);
      chapterByNo[chap.no] = chap;

      function add(raw, depth, parent) {
        var type = raw.type || "sec";
        var sec = {
          id: raw.id,
          title: raw.title,
          type: type,
          note: raw.note || "",
          ready: !!raw.ready,
          depth: depth,
          parentId: parent ? parent.id : null,
          children: [],
          chapter: chap,
          grade: grade,
          path: "models/" + grade.id + "/" + pad2(chap.no) + "/" + raw.id + ".html"
        };
        if (parent) parent.children.push(sec);
        chap.sections.push(sec);
        flat.push(sec);
        byId[sec.id] = sec;
        return sec;
      }

      rawChap.sections.forEach(function (raw) {
        var sec = add(raw, 0, null);
        if (raw.children) {
          raw.children.forEach(function (child) { add(child, 1, sec); });
        }
      });

      chap.sectionCount = chap.sections.length;
      chap.readyCount = chap.sections.filter(function (s) { return s.ready; }).length;
      grade.count += chap.sectionCount;
      grade.readyCount += chap.readyCount;
    });
  });

  var totalReady = flat.filter(function (s) { return s.ready; }).length;
  var totalSections = flat.length;

  /* ---------- DOM ---------- */
  var tree = document.getElementById("tree");
  var view = document.getElementById("view");
  var sidebar = document.getElementById("sidebar");
  var scrim = document.getElementById("scrim");
  var menuBtn = document.getElementById("menuBtn");
  var searchBox = document.getElementById("searchBox");
  var searchInput = document.getElementById("searchInput");
  var searchResults = document.getElementById("searchResults");
  var topMeta = document.getElementById("topMeta");

  topMeta.textContent = "六册 · " + allChapters.length + " 章 · " + totalSections + " 节";

  /* ---------- 侧栏树 ---------- */
  function buildTree() {
    var html = "";

    grades.forEach(function (g) {
      html += '<div class="tree-grade is-open" data-grade="' + g.id + '">'
        + '<button class="tree-grade__btn" type="button" aria-expanded="true">'
        +   '<span class="caret"></span>'
        +   '<span>' + esc(g.name) + '</span>'
        +   '<span class="count">' + g.chapters.length + ' 章</span>'
        + '</button>'
        + '<div class="tree-grade__body">';

      g.chapters.forEach(function (c) {
        html += '<div class="tree-chap" data-chap="' + c.no + '">'
          + '<div class="tree-chap__row">'
          +   '<button class="tree-chap__caret" type="button" aria-expanded="false" aria-label="展开第 ' + c.no + ' 章目录">'
          +     '<span class="caret"></span>'
          +   '</button>'
          +   '<a class="tree-chap__btn" href="#ch=' + c.no + '">'
          +     '<span class="tree-chap__no">' + pad2(c.no) + '</span>'
          +     '<span class="tree-chap__title">' + esc(c.title) + '</span>'
          +     '<span class="tree-chap__n">' + c.sectionCount + '</span>'
          +   '</a>'
          + '</div>'
          + '<div class="tree-secs">';

        c.sections.forEach(function (s) {
          var t = TYPE[s.type];
          html += '<a class="tree-sec'
            + (s.depth ? " is-sub" : "")
            + (s.ready ? " is-ready" : "")
            + (s.children.length ? " is-parent" : "")
            + '" href="#s=' + enc(s.id) + '" data-sec="' + esc(s.id) + '">'
            + (s.type === "sec"
                ? '<span class="tree-sec__id">' + esc(s.id) + '</span>'
                : '<span class="tree-sec__mark">' + t.mark + '</span>')
            + '<span>' + esc(s.title) + '</span>'
            + '</a>';
        });

        html += '</div></div>';
      });

      html += '</div></div>';
    });

    tree.innerHTML = html;
  }

  function treeSecEl(id) {
    var list = tree.querySelectorAll(".tree-sec");
    for (var i = 0; i < list.length; i++) {
      if (list[i].getAttribute("data-sec") === id) return list[i];
    }
    return null;
  }

  function treeChapEl(no) {
    var list = tree.querySelectorAll(".tree-chap");
    for (var i = 0; i < list.length; i++) {
      if (+list[i].getAttribute("data-chap") === no) return list[i];
    }
    return null;
  }

  function setChapOpen(chapEl, open) {
    chapEl.classList.toggle("is-open", open);
    var btn = chapEl.querySelector(".tree-chap__caret");
    if (btn) btn.setAttribute("aria-expanded", open ? "true" : "false");
  }

  /* 只滚侧栏，不牵动整页 */
  function scrollTree(el) {
    if (!el) return;
    var box = tree.getBoundingClientRect();
    var r = el.getBoundingClientRect();
    if (r.top < box.top + 10) {
      tree.scrollTop -= (box.top + 10 - r.top);
    } else if (r.bottom > box.bottom - 10) {
      tree.scrollTop += (r.bottom - (box.bottom - 10));
    }
  }

  function syncTree(route) {
    var oldSec = tree.querySelector(".tree-sec.is-current");
    if (oldSec) {
      oldSec.classList.remove("is-current");
      oldSec.removeAttribute("aria-current");
    }
    var oldChap = tree.querySelector(".tree-chap.is-active");
    if (oldChap) oldChap.classList.remove("is-active");

    var chap = null;
    if (route.type === "chapter") chap = chapterByNo[route.no];
    if (route.type === "section" && byId[route.id]) chap = byId[route.id].chapter;
    if (!chap) return;

    var gradeEl = tree.querySelector('.tree-grade[data-grade="' + chap.grade.id + '"]');
    if (gradeEl && !gradeEl.classList.contains("is-open")) {
      gradeEl.classList.add("is-open");
      var gb = gradeEl.querySelector(".tree-grade__btn");
      if (gb) gb.setAttribute("aria-expanded", "true");
    }

    var chapEl = treeChapEl(chap.no);
    if (!chapEl) return;

    // 章目录手风琴：只保留当前章展开
    var openChaps = tree.querySelectorAll(".tree-chap.is-open");
    for (var i = 0; i < openChaps.length; i++) {
      if (openChaps[i] !== chapEl) setChapOpen(openChaps[i], false);
    }
    setChapOpen(chapEl, true);
    chapEl.classList.add("is-active");

    var target = chapEl.querySelector(".tree-chap__btn");

    if (route.type === "section") {
      var secEl = treeSecEl(route.id);
      if (secEl) {
        secEl.classList.add("is-current");
        secEl.setAttribute("aria-current", "page");
        target = secEl;
      }
    }

    scrollTree(target);
  }

  tree.addEventListener("click", function (e) {
    var gradeBtn = e.target.closest(".tree-grade__btn");
    if (gradeBtn) {
      var gradeEl = gradeBtn.parentElement;
      var open = gradeEl.classList.toggle("is-open");
      gradeBtn.setAttribute("aria-expanded", open ? "true" : "false");
      return;
    }

    var chapCaret = e.target.closest(".tree-chap__caret");
    if (chapCaret) {
      var chapEl = chapCaret.closest(".tree-chap");
      var willOpen = !chapEl.classList.contains("is-open");
      var openChaps = tree.querySelectorAll(".tree-chap.is-open");
      for (var i = 0; i < openChaps.length; i++) setChapOpen(openChaps[i], false);
      if (willOpen) setChapOpen(chapEl, true);
      return;
    }

    if (e.target.closest("a")) closeSidebar();
  });

  /* ---------- 首页 / 章 / 节 ---------- */
  function homeHTML() {
    var html = '<section class="hero reveal">'
      + '<p class="hero__eyebrow">人教版 · 2024 新版 · 六册</p>'
      + '<h1>把初中数学，<em>按节</em>走一遍。</h1>'
      + '<p>从七上的有理数到九下的投影与视图，六册 ' + allChapters.length + ' 章都已按教材目录排到每一节。已经有模型的节可以直接打开，其余各节先留位置，随教学进度一节节补上。</p>'
      + '<div class="hero__stats">'
      +   '<div class="hero__stat"><b>' + allChapters.length + '</b><span>章</span></div>'
      +   '<div class="hero__stat"><b>' + totalSections + '</b><span>节</span></div>'
      +   '<div class="hero__stat"><b>' + totalReady + '</b><span>节已上线</span></div>'
      + '</div>'
      + '<div class="quick">'
      + grades.map(function (g) {
          return '<a href="#g=' + g.id + '">' + esc(g.short) + '</a>';
        }).join("")
      + '</div>'
      + '</section>';

    grades.forEach(function (g) {
      html += '<section class="grade" id="grade-' + g.id + '">'
        + '<div class="grade__head">'
        +   '<h2 class="grade__name">' + esc(g.name) + '</h2>'
        +   '<span class="grade__meta">' + g.chapters.length + ' 章 · ' + g.count + ' 节'
        +     (g.readyCount ? ' · 已上线 ' + g.readyCount : '') + '</span>'
        + '</div>'
        + '<div class="grade__grid">';

      g.chapters.forEach(function (c) {
        html += '<a class="chapter-card" href="#ch=' + c.no + '">'
          + '<span class="chapter-card__no">第 ' + c.no + ' 章</span>'
          + '<span class="chapter-card__title">' + esc(c.title) + '</span>'
          + '<span class="chapter-card__foot">'
          +   '<span>' + c.sectionCount + ' 节</span>'
          +   (c.readyCount
                ? '<span class="chapter-card__ready">' + c.readyCount + ' 节已上线</span>'
                : '<span>待补充</span>')
          +   '<span class="chapter-card__arrow" aria-hidden="true">→</span>'
          + '</span>'
          + '</a>';
      });

      html += '</div></section>';
    });

    return html;
  }

  function secRowHTML(s) {
    var t = TYPE[s.type];
    return '<a class="sec-row' + (s.depth ? ' is-child' : '') + (s.ready ? ' is-ready' : '')
      + '" href="#s=' + enc(s.id) + '">'
      + '<span class="sec-row__id">' + esc(s.type === "sec" ? s.id : t.mark) + '</span>'
      + '<span class="sec-row__title">' + esc(s.title) + '</span>'
      + (s.type !== "sec" ? '<span class="sec-row__type">' + esc(t.label) + '</span>' : '')
      + '<span class="sec-row__state">' + (s.ready ? "已上线" : "待制作") + '</span>'
      + '</a>';
  }

  function chapterHTML(chap) {
    var idx = allChapters.indexOf(chap);
    var prev = allChapters[idx - 1];
    var next = allChapters[idx + 1];

    var html = '<div class="reveal">'
      + '<nav class="crumb">'
      +   '<a href="#/">首页</a><span class="sep">/</span>'
      +   '<a href="#g=' + chap.grade.id + '">' + esc(chap.grade.name) + '</a>'
      + '</nav>'
      + '<header class="chapter-head">'
      +   '<h1>第 ' + chap.no + ' 章 · ' + esc(chap.title) + '</h1>'
      +   '<div class="chapter-head__meta">'
      +     '<span>' + esc(chap.grade.name) + '</span>'
      +     '<span>' + chap.sectionCount + ' 节</span>'
      +     '<span><b>' + chap.readyCount + '</b> 节已上线</span>'
      +   '</div>'
      + '</header>'
      + '<div class="sec-list">';

    chap.sections.forEach(function (s) { html += secRowHTML(s); });

    html += '</div><nav class="chapter-nav">';
    html += prev
      ? '<a href="#ch=' + prev.no + '">← 第 ' + prev.no + ' 章 ' + esc(prev.title) + '</a>'
      : '<span></span>';
    html += next
      ? '<a href="#ch=' + next.no + '">第 ' + next.no + ' 章 ' + esc(next.title) + ' →</a>'
      : '<span></span>';
    html += '</nav></div>';

    return html;
  }

  function sectionHTML(sec) {
    var t = TYPE[sec.type];
    var idx = flat.indexOf(sec);
    var prev = flat[idx - 1];
    var next = flat[idx + 1];

    var html = '<article class="doc reveal">'
      + '<nav class="crumb">'
      +   '<a href="#/">首页</a><span class="sep">/</span>'
      +   '<a href="#ch=' + sec.chapter.no + '">' + esc(sec.grade.name) + ' · 第 ' + sec.chapter.no + ' 章 ' + esc(sec.chapter.title) + '</a>'
      + '</nav>'
      + '<header class="doc__head">'
      +   '<div class="doc__id">' + esc(sec.type === "sec" ? sec.id : t.label) + '</div>'
      +   '<h1 class="doc__title">' + esc(sec.title) + '</h1>'
      +   '<div class="doc__meta">'
      +     '<span class="chip">' + esc(sec.grade.name) + '</span>'
      +     '<span class="chip">第 ' + sec.chapter.no + ' 章 ' + esc(sec.chapter.title) + '</span>'
      +     (sec.type !== "sec" ? '<span class="chip">' + esc(t.label) + '</span>' : '')
      +     (sec.ready
            ? '<span class="chip chip--accent">已上线</span>'
            : '<span class="chip">待制作</span>')
      +   '</div>'
      + '</header>'
      + '<div class="doc__body">';

    if (sec.children.length) {
      html += '<h2 class="doc__part">本节小节</h2><div class="sec-list">';
      sec.children.forEach(function (c) { html += secRowHTML(c); });
      html += '</div>';
    }

    if (sec.ready) {
      html += '<div class="doc__frame">'
        + '<div class="doc__frame-bar">'
        +   '<span>交互模型 · 单文件离线可用</span>'
        +   '<a href="' + esc(sec.path) + '" target="_blank" rel="noopener">新窗口打开 ↗</a>'
        + '</div>'
        + '<iframe src="' + esc(sec.path) + '?embed=1" title="' + esc(sec.title) + ' 交互模型" loading="lazy"></iframe>'
        + '</div>';
    } else {
      html += '<div class="placeholder">'
        + '<div class="placeholder__mark">待制</div>'
        + '<h2>这一节还没有制作模型</h2>'
        + (sec.note ? '<p>' + esc(sec.note) + '</p>' : '')
        + '<p>目录里已经为它留好位置。把模型文件放进 <code>' + esc(sec.path) + '</code>，打开本页就能看到，首页的「已上线」也会自动加一。</p>'
        + '<a class="btn" href="https://github.com/huohuo963/huohuo-teaching/blob/main/templates/chapter-template.html" target="_blank" rel="noopener">打开章节模板</a>'
        + '</div>';
    }

    html += '<details class="make-note">'
      + '<summary>如何给这一节加模型（给作者）</summary>'
      + '<p>① 复制 <code>templates/chapter-template.html</code> 到 <code>' + esc(sec.path) + '</code>，样式和脚本都写在同一个文件里，不引用外部资源。</p>'
      + '<p>② 打开 <code>js/curriculum.js</code>，找到节号 <code>' + esc(sec.id) + '</code>，给它加上 <code>ready: true</code>。</p>'
      + '<p>路径规则：<code>models/&lt;册&gt;/&lt;两位章号&gt;/&lt;节号&gt;.html</code>，册为 7a、7b、8a、8b、9a、9b。</p>'
      + '</details>';

    if (prev || next) {
      html += '<nav class="doc__pager">';
      if (prev) {
        html += '<a class="pager-link" href="#s=' + enc(prev.id) + '">'
          + '<span>上一节</span>' + esc(prev.id + " " + prev.title) + '</a>';
      }
      if (next) {
        html += '<a class="pager-link pager-link--next" href="#s=' + enc(next.id) + '">'
          + '<span>下一节</span>' + esc(next.id + " " + next.title) + '</a>';
      }
      html += '</nav>';
    }

    html += '</div></article>';
    return html;
  }

  function notFoundHTML(title, text) {
    return '<div class="empty-state reveal">'
      + '<h1>' + esc(title) + '</h1>'
      + '<p>' + esc(text) + '</p>'
      + '<p><a class="btn" href="#/">回到首页</a></p>'
      + '</div>';
  }

  /* ---------- 路由 ---------- */
  function parseRoute() {
    var h = location.hash.replace(/^#/, "");
    if (h.indexOf("s=") === 0) return { type: "section", id: decodeURIComponent(h.slice(2)) };
    if (h.indexOf("ch=") === 0) return { type: "chapter", no: parseInt(h.slice(3), 10) };
    if (h.indexOf("g=") === 0) return { type: "grade", id: h.slice(2) };
    return { type: "home" };
  }

  function instantTop() {
    var root = document.documentElement;
    var prevBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
    root.style.scrollBehavior = prevBehavior;
  }

  var lastKey = "";

  function render() {
    var route = parseRoute();
    closeSearch();
    closeSidebar();

    if (route.type === "section") {
      var sec = byId[route.id];
      if (sec) {
        view.innerHTML = sectionHTML(sec);
        document.title = sec.id + " " + sec.title + " · 火火教学";
      } else {
        view.innerHTML = notFoundHTML("没有找到这一节", "链接里的节号可能已经调整，可以回首页或左侧目录重新查找。");
        document.title = "未找到 · 火火教学";
      }
    } else if (route.type === "chapter") {
      var chap = chapterByNo[route.no];
      if (chap) {
        view.innerHTML = chapterHTML(chap);
        document.title = "第 " + chap.no + " 章 " + chap.title + " · 火火教学";
      } else {
        view.innerHTML = notFoundHTML("没有找到这一章", "章号可能已经调整，可以回首页重新选择。");
        document.title = "未找到 · 火火教学";
      }
    } else {
      view.innerHTML = homeHTML();
      document.title = "火火教学 · 初中数学模型";
    }

    syncTree(route);

    var key = JSON.stringify(route);
    if (route.type === "grade") {
      lastKey = key;
      var gradeTarget = document.getElementById("grade-" + route.id);
      if (gradeTarget) gradeTarget.scrollIntoView({ block: "start" });
    } else if (key !== lastKey) {
      lastKey = key;
      instantTop();
    }
  }

  /* ---------- 搜索 ---------- */
  var searchItems = [];

  allChapters.forEach(function (c) {
    searchItems.push({
      kind: "chapter",
      chap: c,
      title: c.title,
      code: "第" + c.no + "章",
      ctx: c.grade.short + " · " + c.sectionCount + " 节"
    });
  });

  flat.forEach(function (s) {
    searchItems.push({
      kind: "section",
      sec: s,
      title: s.title,
      code: s.type === "sec" ? s.id : TYPE[s.type].label,
      ctx: s.grade.short + " · 第" + s.chapter.no + "章"
    });
  });

  var hits = [];
  var activeHit = -1;

  function runSearch(query) {
    var lower = query.toLowerCase();
    var terms = lower.split(/\s+/).filter(Boolean);
    var scored = [];

    searchItems.forEach(function (item) {
      var hay = (item.title + " " + item.code + " " + item.ctx + " "
        + (item.kind === "section" ? item.sec.id : "")).toLowerCase();
      var ok = terms.every(function (t) { return hay.indexOf(t) >= 0; });
      if (!ok) return;

      var title = item.title.toLowerCase();
      var code = item.code.toLowerCase();
      var score = 10;

      if (title === lower) score = 100;
      else if (title.indexOf(lower) === 0) score = 85;
      else if (title.indexOf(lower) >= 0) score = 70;
      else if (code === lower) score = 90;
      else if (code.indexOf(lower) === 0) score = 60;
      if (item.kind === "section") score += 2;

      scored.push({ item: item, score: score });
    });

    scored.sort(function (a, b) { return b.score - a.score; });
    return scored.slice(0, 12).map(function (x) { return x.item; });
  }

  function highlight(text, terms) {
    var out = esc(text);
    var list = terms.filter(Boolean).sort(function (a, b) { return b.length - a.length; });
    if (!list.length) return out;
    var pattern = list.map(function (t) {
      return t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }).join("|");
    if (!pattern) return out;
    try {
      return out.replace(new RegExp("(" + pattern + ")", "gi"), "<mark>$1</mark>");
    } catch (err) {
      return out;
    }
  }

  function closeSearch() {
    searchResults.hidden = true;
    searchInput.setAttribute("aria-expanded", "false");
    hits = [];
    activeHit = -1;
  }

  function renderResults(raw) {
    var q = raw.trim();
    if (!q) {
      closeSearch();
      return;
    }

    hits = runSearch(q);
    activeHit = hits.length ? 0 : -1;
    var terms = q.toLowerCase().split(/\s+/);

    if (!hits.length) {
      searchResults.innerHTML = '<div class="search-empty">没有找到「' + esc(q) + '」。试试更短的词，比如「平行线」或节号「7.2.2」。</div>';
    } else {
      searchResults.innerHTML = hits.map(function (item, i) {
        var code = item.kind === "chapter"
          ? "第" + item.chap.no + "章"
          : (item.sec.type === "sec" ? item.sec.id : TYPE[item.sec.type].mark);
        var title = item.kind === "chapter" ? item.chap.title : item.sec.title;
        return '<button class="search-hit' + (i === activeHit ? " is-active" : "") + '" type="button" role="option" data-i="' + i + '">'
          + '<span class="search-hit__id">' + esc(code) + '</span>'
          + '<span class="search-hit__title">' + highlight(title, terms) + '</span>'
          + '<span class="search-hit__ctx">' + esc(item.ctx) + '</span>'
          + '</button>';
      }).join("");
    }

    searchResults.hidden = false;
    searchInput.setAttribute("aria-expanded", "true");
  }

  function setActiveHit(i) {
    activeHit = i;
    var buttons = searchResults.querySelectorAll(".search-hit");
    for (var k = 0; k < buttons.length; k++) {
      buttons[k].classList.toggle("is-active", k === i);
    }
    if (buttons[i]) buttons[i].scrollIntoView({ block: "nearest" });
  }

  function openHit(i) {
    var item = hits[i];
    if (!item) return;
    if (item.kind === "section") location.hash = "#s=" + enc(item.sec.id);
    else location.hash = "#ch=" + item.chap.no;
    searchInput.value = "";
    closeSearch();
    searchInput.blur();
  }

  searchInput.addEventListener("input", function () { renderResults(searchInput.value); });

  searchInput.addEventListener("focus", function () {
    if (searchInput.value.trim()) renderResults(searchInput.value);
  });

  searchInput.addEventListener("keydown", function (e) {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      if (!hits.length) return;
      e.preventDefault();
      var i = activeHit + (e.key === "ArrowDown" ? 1 : -1);
      if (i < 0) i = hits.length - 1;
      if (i >= hits.length) i = 0;
      setActiveHit(i);
    } else if (e.key === "Enter") {
      if (activeHit >= 0) {
        e.preventDefault();
        openHit(activeHit);
      }
    } else if (e.key === "Escape") {
      closeSearch();
      searchInput.blur();
    }
  });

  searchResults.addEventListener("click", function (e) {
    var btn = e.target.closest(".search-hit");
    if (btn) openHit(+btn.getAttribute("data-i"));
  });

  document.addEventListener("click", function (e) {
    if (!searchBox.contains(e.target)) closeSearch();
  });

  document.addEventListener("keydown", function (e) {
    var tag = (e.target.tagName || "").toLowerCase();
    if (tag === "input" || tag === "textarea" || e.target.isContentEditable) return;
    if (e.key === "/" && !e.metaKey && !e.ctrlKey) {
      e.preventDefault();
      searchInput.focus();
      searchInput.select();
    }
  });

  /* ---------- 移动端侧栏 ---------- */
  function openSidebar() {
    sidebar.classList.add("is-open");
    scrim.hidden = false;
    document.body.classList.add("is-locked");
    menuBtn.setAttribute("aria-expanded", "true");
  }

  function closeSidebar() {
    if (!sidebar.classList.contains("is-open")) return;
    sidebar.classList.remove("is-open");
    scrim.hidden = true;
    document.body.classList.remove("is-locked");
    menuBtn.setAttribute("aria-expanded", "false");
  }

  menuBtn.addEventListener("click", function () {
    if (sidebar.classList.contains("is-open")) closeSidebar();
    else openSidebar();
  });

  scrim.addEventListener("click", closeSidebar);

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeSidebar();
  });

  if (window.matchMedia) {
    var wide = window.matchMedia("(min-width: 901px)");
    var onChange = function () { if (wide.matches) closeSidebar(); };
    if (wide.addEventListener) wide.addEventListener("change", onChange);
    else if (wide.addListener) wide.addListener(onChange);
  }

  /* ---------- 启动 ---------- */
  buildTree();
  window.addEventListener("hashchange", render);
  render();
})();
