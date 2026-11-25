(function () {
  var data = window.CHAPTER_DATA || [];
  var navEl = document.getElementById("gradeNav");
  var secEl = document.getElementById("sections");
  var viewer = document.getElementById("viewer");
  var frame = document.getElementById("viewerFrame");
  var viewerTitle = document.getElementById("viewerTitle");
  var viewerTag = document.getElementById("viewerTag");
  var viewerNew = document.getElementById("viewerNew");
  var viewerClose = document.getElementById("viewerClose");
  var toastEl = document.getElementById("toast");
  var toastTimer = null;
  var lastFocus = null;

  var total = 0;
  var ready = 0;
  data.forEach(function (g) {
    total += g.chapters.length;
    g.chapters.forEach(function (c) { if (c.ready) ready++; });
  });

  document.getElementById("statTotal").textContent = total;
  document.getElementById("statReady").textContent = ready;
  document.getElementById("statPercent").textContent = Math.round(ready / total * 100) + "%";

  data.forEach(function (g) {
    var link = document.createElement("a");
    link.href = "#" + g.id;
    link.className = "grade-nav__item";
    link.style.setProperty("--accent", g.accent);
    link.innerHTML = '<i class="dot"></i>' + g.name;
    navEl.appendChild(link);
  });

  data.forEach(function (g) {
    var done = g.chapters.filter(function (c) { return c.ready; }).length;

    var sec = document.createElement("section");
    sec.className = "grade";
    sec.id = g.id;
    sec.style.setProperty("--accent", g.accent);
    sec.innerHTML =
      '<div class="grade__head">' +
        '<h2 class="grade__title">' + g.name + '<span class="grade__sub">' + g.term + ' · 共 ' + g.chapters.length + ' 章</span></h2>' +
        '<span class="grade__count">已上线 ' + done + ' / ' + g.chapters.length + '</span>' +
      '</div>' +
      '<div class="grid"></div>';

    var grid = sec.querySelector(".grid");

    g.chapters.forEach(function (c) {
      var card = document.createElement("button");
      card.type = "button";
      card.className = "chapter-card" + (c.ready ? "" : " is-planned");
      card.innerHTML =
        '<span class="chapter-card__top">' +
          '<span class="num">第 ' + c.no + ' 章</span>' +
          '<span class="tag" data-tag="' + c.tag + '">' + c.tag + '</span>' +
        '</span>' +
        '<span class="chapter-card__title">' + c.title + '</span>' +
        '<span class="chapter-card__desc">' + c.desc + '</span>' +
        '<span class="chapter-card__foot">' +
          '<span class="status' + (c.ready ? " is-ready" : "") + '">' + (c.ready ? "已上线" : "待补充") + '</span>' +
          '<span class="go">' + (c.ready ? "进入模型 →" : "制作中") + '</span>' +
        '</span>';

      card.addEventListener("click", function () {
        if (!c.ready) {
          toast("「" + c.title + "」模型正在制作中，敬请期待");
          return;
        }
        openViewer("models/" + g.id + "/" + c.slug + ".html", c, g);
      });

      grid.appendChild(card);
    });

    secEl.appendChild(sec);
  });

  function openViewer(path, c, g) {
    lastFocus = document.activeElement;
    viewerTitle.textContent = g.name + " · 第" + c.no + "章 " + c.title;
    viewerTag.textContent = c.tag;
    viewerNew.href = path;
    frame.src = path;
    viewer.hidden = false;
    document.body.classList.add("is-locked");
    viewerClose.focus();
  }

  function closeViewer() {
    viewer.hidden = true;
    frame.src = "about:blank";
    document.body.classList.remove("is-locked");
    if (lastFocus) lastFocus.focus();
  }

  viewerClose.addEventListener("click", closeViewer);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !viewer.hidden) closeViewer();
  });

  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add("is-show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove("is-show"); }, 2200);
  }

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var items = navEl.querySelectorAll(".grade-nav__item");
        for (var i = 0; i < items.length; i++) {
          items[i].classList.toggle("is-active", items[i].getAttribute("href") === "#" + en.target.id);
        }
        var active = navEl.querySelector(".grade-nav__item.is-active");
        if (active) active.scrollIntoView({ block: "nearest", inline: "center" });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });

    data.forEach(function (g) {
      var sec = document.getElementById(g.id);
      if (sec) io.observe(sec);
    });
  }
})();
