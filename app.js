/*
 * ATHENA Leadership Circle Workbook: presentation, state and navigation.
 * Content comes from content.js (window.WORKBOOK). Responses are stored in this
 * browser only (localStorage) and are never uploaded.
 */
(function () {
  "use strict";

  var WB = window.WORKBOOK;
  var STORE_KEY = "athena-lc-workbook:v1";
  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  /* ------------------------------------------------------------------ state */
  var storageOk = true;
  var state = load();

  function blank() { return { v: 1, name: "", f: {}, visited: {}, last: null, updated: null }; }
  function load() {
    try {
      var raw = window.localStorage.getItem(STORE_KEY);
      if (!raw) return blank();
      var s = JSON.parse(raw);
      if (!s || s.v !== 1) return blank();
      s.f = s.f || {}; s.visited = s.visited || {};
      return s;
    } catch (e) { storageOk = false; return blank(); }
  }
  var saveTimer = null;
  function save(immediate) {
    state.updated = new Date().toISOString();
    clearTimeout(saveTimer);
    var run = function () {
      try { window.localStorage.setItem(STORE_KEY, JSON.stringify(state)); storageOk = true; }
      catch (e) { storageOk = false; }
      paintSaveStatus();
    };
    if (immediate) run(); else saveTimer = setTimeout(run, 250);
  }
  function setField(key, val) {
    if (val === "" || val === null || val === undefined || (Array.isArray(val) && !val.length)) delete state.f[key];
    else state.f[key] = val;
    save();
    refreshProgress();
  }

  /* ------------------------------------------------------------ utilities */
  function el(tag, attrs, kids) {
    var n = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) {
      var v = attrs[k];
      if (v === null || v === undefined || v === false) return;
      if (k === "html") n.innerHTML = v;
      else if (k === "text") n.textContent = v;
      else if (k === "cls") n.className = v;
      else if (k.slice(0, 2) === "on") n.addEventListener(k.slice(2), v);
      else n.setAttribute(k, v === true ? "" : v);
    });
    (kids || []).forEach(function (c) { if (c) n.appendChild(typeof c === "string" ? document.createTextNode(c) : c); });
    return n;
  }
  function plain(html) { var d = document.createElement("div"); d.innerHTML = html; return d.textContent.replace(/\s+/g, " ").trim(); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;" }[c]; }); }
  var uid = 0;
  function nextId(p) { uid += 1; return (p || "f") + "-" + uid; }

  function bandFor(total) {
    for (var i = 0; i < WB.bands.length; i++) if (total >= WB.bands[i].min && total <= WB.bands[i].max) return WB.bands[i];
    return null;
  }
  function principleScore(phase, pid) {
    var p = WB.principles.filter(function (x) { return x.id === pid; })[0];
    var sum = 0, n = 0;
    p.statements.forEach(function (_, i) { var v = state.f["a." + phase + "." + pid + "." + i]; if (v) { sum += v; n += 1; } });
    return { total: n === 5 ? sum : null, partial: sum, answered: n };
  }

  var ICON = {
    empty: '<svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="7.5" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>',
    partial: '<svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="7.5" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M10 2.5a7.5 7.5 0 0 1 0 15z" fill="currentColor"/></svg>',
    complete: '<svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="8.3" fill="currentColor"/><path d="M6 10.2l2.6 2.6L14.2 7" fill="none" stroke="#FEFFF8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
  };
  var STATUS_TEXT = { empty: "Not started", partial: "In progress", complete: "Complete" };

  /* ------------------------------------------------------- field builders */
  function autosize(t) { t.style.height = "auto"; t.style.height = Math.max(t.scrollHeight + 2, 0) + "px"; }

  function textField(key, labelHtml, o) {
    o = o || {};
    var id = nextId("q");
    var multi = o.size !== "short";
    var input = el(multi ? "textarea" : "input", {
      id: id, cls: multi ? "journal" : "line", rows: multi ? (o.rows || 3) : null, type: multi ? null : "text",
      "data-key": key, "data-req": o.opt ? "0" : "1", "data-kind": "text", "data-label": plain(labelHtml),
      "aria-label": o.hideLabel ? plain(labelHtml) : null, placeholder: o.placeholder || "Write your response…"
    });
    input.value = state.f[key] || "";
    input.addEventListener("input", function () { setField(key, input.value.trim() ? input.value : ""); if (multi) autosize(input); markField(input); });
    if (multi) requestAnimationFrame(function () { autosize(input); });
    markField(input);
    var label = o.hideLabel ? null : el("label", { "for": id, cls: "q-label", html: labelHtml });
    var wrap = el("div", { cls: "q" + (o.commit ? " is-commit" : "") + (o.opt ? " is-opt" : "") }, [label, input]);
    if (o.commit) input.setAttribute("data-commit", "1");
    return wrap;
  }
  function markField(input) {
    var wrap = input.closest ? input.closest(".q") : null;
    if (wrap) wrap.classList.toggle("is-filled", !!(input.value && input.value.trim()));
  }

  /* --------------------------------------------------------- block renderers */
  var R = {};
  var ctx = null; // { step, n }

  function render(blocks, parent) { blocks.forEach(function (b) { var n = R[b.t](b); if (n) parent.appendChild(n); }); return parent; }
  function qKey() { ctx.n += 1; return ctx.step.id + ".q" + ctx.n; }


  R.banner = function (b) {
    var inst = /LEADERSHIP INSTITUTE/.test(b.title);
    if (inst) {
      return el("header", { cls: "chapter" }, [
        el("p", { cls: "chapter-eyebrow" }, [el("span", { html: b.title.replace(/<br\s*\/?>/g, " ") })]),
        el("h2", { cls: "chapter-title", id: "h-" + ctx.step.id, html: b.sub }),
        b.pi ? el("p", { cls: "chapter-pi" }, [el("img", { src: "assets/icons/pi.png", alt: "Predictive Index", width: 26, height: 26 })]) : null
      ]);
    }
    return el("header", { cls: "chapter solo" }, [
      el("h2", { cls: "chapter-title", id: "h-" + ctx.step.id, html: b.title }),
      b.sub ? el("p", { cls: "chapter-credit", html: b.sub }) : null
    ]);
  };
  function heading(tag) {
    return function (b) { return el(tag, { cls: [b.center ? "center" : "", b.u ? "u" : ""].join(" ").trim() || null, html: b.text }); };
  }
  R.h2 = heading("h2"); R.h3 = heading("h3"); R.h4 = heading("h4");
  R.p = function (b) { return el("p", { cls: b.center ? "center" : null, html: b.html }); };
  R.ul = function (b) { return el("ul", { cls: "bullets" + (b.bold ? " bold" : "") }, b.items.map(function (i) { return el("li", { html: i }); })); };
  R.lines = function (b) { return el("div", { cls: "lines" }, b.items.map(function (i) { return el("div", { html: i }); })); };
  R.note = function (b) { return el("div", { cls: "note" + (b.light ? " light" : ""), html: b.html }); };
  R.quote = function (b) { return el("p", { cls: "pull", html: b.html }); };
  R.foot = function (b) { return el("p", { cls: "foot", html: b.text }); };
  R.lead = function (b) { return el("div", { cls: "lead" }, [el("h3", { html: b.title }), el("p", { html: b.html })]); };
  R.metaphor = function (b) { return el("div", { cls: "metaphor" }, [el("p", { cls: "metaphor-title", html: b.title }), el("p", { html: b.html })]); };
  R.mindwire = function () { return el("div", { cls: "mindwire" }, [el("img", { src: "assets/icons/mindwire.webp", alt: "MindWire", width: 396, height: 126, loading: "lazy" })]); };
  R.img = function (b) {
    var img = el("img", { src: b.src, alt: b.alt, width: b.w, height: b.h, loading: "lazy", decoding: "async" });
    var btn = el("button", { type: "button", cls: "zoom", "aria-label": "Enlarge image: " + b.alt.slice(0, 60), onclick: function () { openLightbox(b.src, b.alt); } }, [img]);
    return el("figure", { cls: "figure" + (b.cls ? " " + b.cls : "") }, [btn]);
  };
  R.outline = function (b) {
    return el("figure", { cls: "outline" }, [
      el("ol", { cls: "outline-list" }, b.items.map(function (it, i) {
        return el("li", null, [el("span", { cls: "ol-num", text: (i + 1 < 10 ? "0" : "") + (i + 1) }), el("span", { cls: "ol-t", html: it })]);
      })),
      el("figcaption", { text: b.credit })
    ]);
  };
  R.q = function (b) { return textField(qKey(), b.text, b); };
  R.qs = function (b) {
    var list = el("ul", { cls: "prompts" + (b.plain ? " plain" : "") + (b.bold ? " bold" : "") });
    b.items.forEach(function (t) { list.appendChild(el("li", null, [textField(qKey(), t, b)])); });
    return list;
  };
  R.panel = function (b) {
    var head = [];
    if (b.tone === "pi") head.push(el("img", { src: "assets/icons/pi.png", alt: "Predictive Index", cls: "panel-pi-logo", width: 34, height: 34 }));
    head.push(el("p", { cls: "panel-title", html: b.title }));
    if (b.sub) head.push(el("p", { cls: "panel-sub", html: b.sub }));
    var box = el("section", { cls: "panel panel-" + b.tone }, [el("div", { cls: "panel-head" }, head)]);
    render(b.blocks, box);
    return box;
  };
  R.divider = function (b) {
    var idx = WB.principles.map(function (p) { return p.id; }).indexOf(b.icon) + 1;
    return el("section", { cls: "opener" }, [
      el("div", { cls: "opener-inner" }, [
        el("p", { cls: "opener-eyebrow" }, [el("span", { cls: "opener-num", text: "0" + idx }), el("span", { text: "Principle " + idx + " of 8" })]),
        el("h2", { cls: "opener-title", id: "h-" + ctx.step.id, html: b.title }),
        el("p", { cls: "opener-sub", html: b.sub })
      ]),
      el("div", { cls: "opener-body" }, [
        el("span", { cls: "opener-icon" }, [el("img", { src: "assets/icons/principles/" + b.icon + ".webp", alt: "", width: 160, height: 160 })]),
        el("ul", { cls: "opener-list" }, b.items.map(function (i) { return el("li", { html: i }); }))
      ]),
      el("p", { cls: "opener-foot", html: b.foot })
    ]);
  };
  R.profiles = function (b) {
    return el("section", { cls: "profiles" }, [
      el("h3", { cls: "center u", html: b.title }),
      el("p", { cls: "gold-sub center", html: b.sub }),
      el("dl", null, b.items.reduce(function (acc, it) { acc.push(el("dt", { html: it[0] })); acc.push(el("dd", { html: it[1] })); return acc; }, []))
    ]);
  };
  R.needs = function (b) {
    var t = el("table", { cls: "needs" });
    t.appendChild(el("caption", { html: b.title }));
    t.appendChild(el("thead", null, [el("tr", null, [el("td"), el("th", { scope: "col", html: b.head[0] }), el("th", { scope: "col", html: b.head[1] })])]));
    var tb = el("tbody");
    b.rows.forEach(function (r) {
      tb.appendChild(el("tr", null, [el("th", { scope: "row", html: r[0] }), el("td", null, [el("ul", null, r[1].map(function (i) { return el("li", { html: i }); }))]), el("td", null, [el("ul", null, r[2].map(function (i) { return el("li", { html: i }); }))])]));
    });
    t.appendChild(tb);
    return el("div", { cls: "table-wrap" }, [t]);
  };
  R.picard = function (b) {
    var tabs = el("div", { cls: "pi-tabs", role: "presentation" }, b.tabs.map(function (tb, i) {
      return el("span", { cls: "pi-tab" + (i === b.sel ? " on" : ""), html: tb || "&nbsp;" }, i === b.sel ? [el("i", { cls: "pi-dot", text: b.letter })] : null);
    }));
    function col(title, items, cls) { return el("div", { cls: "pi-col " + (cls || "") }, [el("p", { cls: "pi-col-title", text: title }), el("ul", null, items.map(function (i) { return el("li", { html: i }); }))]); }
    var side = el("div", { cls: "pi-side" }, [
      el("p", { cls: "pi-factor", html: "" + b.factor + " = <span class=\"em\">" + b.letter + "</span>" }),
      el("p", { html: "These are examples of strengths, challenges, and self-coaching tips for your <span class=\"em\">" + b.factor + "</span> factors." }),
      el("p", { html: "Obviously not your results. However, the outcomes are the same if your “" + b.letter + "” falls to the <span class=\"em\">" + b.side + "</span> of Mid-point on the graph." })
    ]);
    var card = el("div", { cls: "pi-card" }, [tabs, el("div", { cls: "pi-cols" }, [col("STRENGTHS", b.strengths), col("CAUTIONS", b.cautions)]), col("SELF-COACHING TIPS", b.tips, "tips")]);
    return el("section", { cls: "picard side-" + b.side.toLowerCase() }, [
      el("p", { cls: "pi-arrow", html: (b.side === "Left" ? "<span aria-hidden=\"true\">←</span> " : "") + b.arrow + (b.side === "Right" ? " <span aria-hidden=\"true\">→</span>" : "") }),
      el("div", { cls: "picard-grid" }, [card, side])
    ]);
  };
  R.table = function (b) {
    var t = el("table", { cls: "grid " + (b.cls || "") });
    t.appendChild(el("thead", null, [el("tr", null, b.head.map(function (h) { return el("th", { scope: "col", html: h }); }))]));
    var tb = el("tbody");
    b.rows.forEach(function (r) { tb.appendChild(el("tr", null, r.map(function (c, i) { return i === 0 ? el("th", { scope: "row", html: c }) : el("td", { html: c }); }))); });
    t.appendChild(tb);
    return el("div", { cls: "table-wrap" }, [t]);
  };
  R.combo = function (b) {
    function col(h, items) { return el("div", { cls: "combo-col" }, [el("p", { cls: "combo-h", text: h }), el("div", { cls: "combo-card" }, items.map(function (i) { return el("p", { html: i }); }))]); }
    return el("section", { cls: "combo" }, [
      el("div", { cls: "combo-head" }, [el("span", { cls: "combo-label", text: b.label }), el("h3", { html: b.title }), el("p", { cls: "combo-formula", html: b.formula })]),
      el("div", { cls: "combo-cols" }, [col("Split By Mid-point", b.split), col("Both Left of Mid-point", b.left), col("Both Right of Mid-point", b.right)])
    ]);
  };
  R.behav = function (b) {
    return el("section", { cls: "behav" }, b.items.map(function (it) {
      return el("div", null, [el("p", { cls: "behav-title", html: it.title }), el("ul", null, it.rows.map(function (r) { return el("li", { html: "<b>" + r[0] + "</b> " + r[1] }); }))]);
    }));
  };
  R.defs = function (b) {
    return el("div", { cls: "defs" }, b.items.map(function (it) {
      return el("div", { cls: "def" + (it[3] ? " wide" : "") }, [el("h3", { html: it[0] + " <span class=\"bar\">|</span> <span class=\"gold\">" + it[1] + "</span>" }), el("p", { html: it[2] })]);
    }));
  };
  R.values5 = function (b) {
    var key = ctx.step.id + ".values";
    var t = el("table", { cls: "values5" });
    t.appendChild(el("caption", { html: b.title }));
    t.appendChild(el("thead", null, [el("tr", null, [el("th", { scope: "col", html: "<u>Core Value</u>" }), el("th", { scope: "col", html: "<u>What This Value Means To Me</u>" })])]));
    var tb = el("tbody");
    for (var i = 0; i < 5; i++) {
      var nk = key + "." + i + ".name", mk = key + "." + i + ".mean";
      var name = el("input", { type: "text", cls: "line", "data-key": nk, "data-req": "1", "data-kind": "text", "data-label": "Core Value " + (i + 1), "aria-label": "Core value " + (i + 1), placeholder: "Value " + (i + 1) });
      var mean = el("textarea", { cls: "journal", rows: 2, "data-key": mk, "data-req": "1", "data-kind": "text", "data-label": "What This Value Means To Me (" + (i + 1) + ")", "aria-label": "What core value " + (i + 1) + " means to me", placeholder: "What this value means to me…" });
      [name, mean].forEach(function (inp) {
        inp.value = state.f[inp.getAttribute("data-key")] || "";
        inp.addEventListener("input", function () { setField(inp.getAttribute("data-key"), inp.value.trim() ? inp.value : ""); if (inp.tagName === "TEXTAREA") autosize(inp); });
      });
      tb.appendChild(el("tr", null, [el("td", null, [name]), el("td", null, [mean])]));
    }
    t.appendChild(tb);
    return el("div", { cls: "table-wrap", id: "core-values-table" }, [t]);
  };
  R.chips = function (b) {
    var key = ctx.step.id + ".chips", coreKey = ctx.step.id + ".core";
    var box = el("section", { cls: "chips", "data-key": key, "data-req": "1", "data-kind": "chips", "data-min": b.min, "data-label": "Core values chosen (Step 1)" });
    var tray = el("div", { cls: "chip-tray", "aria-live": "polite" });
    function sel() { return state.f[key] || []; }
    function core() { return state.f[coreKey] || []; }
    function paintTray() {
      var s = sel(), c = core();
      tray.innerHTML = "";
      var status = s.length < b.min ? "Step 1: " + s.length + " selected. Choose " + b.min + "–" + b.max + "."
        : s.length > b.max ? "Step 1: " + s.length + " selected. Narrow to " + b.max + " or fewer."
        : "Step 1 complete: " + s.length + " selected.";
      tray.appendChild(el("p", { cls: "chip-status" + (s.length >= b.min && s.length <= b.max ? " ok" : ""), text: status }));
      if (s.length) {
        tray.appendChild(el("p", { cls: "chip-hint", text: "Step 2: mark your top " + b.core + " with the star (" + c.length + " of " + b.core + ")." }));
        var row = el("div", { cls: "chip-sel" });
        s.forEach(function (w) {
          var on = c.indexOf(w) > -1;
          row.appendChild(el("button", { type: "button", cls: "star" + (on ? " on" : ""), "aria-pressed": on ? "true" : "false", "aria-label": (on ? "Remove " : "Mark ") + w + (on ? " from" : " as") + " a top " + b.core + " core value", onclick: function () {
            var cc = core().slice(), i = cc.indexOf(w);
            if (i > -1) cc.splice(i, 1); else if (cc.length < b.core) cc.push(w); else return flash(tray, "You already have " + b.core + " core values. Remove one first.");
            setField(coreKey, cc); paintTray();
          } }, [el("span", { "aria-hidden": "true", text: on ? "★" : "☆" }), " " + w]));
        });
        tray.appendChild(row);
        if (c.length === b.core) tray.appendChild(el("button", { type: "button", cls: "btn btn-gold", onclick: function () {
          var target = "la-1.values";
          c.forEach(function (w, i) { if (!state.f[target + "." + i + ".name"]) state.f[target + "." + i + ".name"] = w; });
          save(true); syncInputs(); refreshProgress();
          flash(tray, "Added to your Top Five Core Values table in Pre-Live Session.");
        } }, ["Add my 5 to the Core Values table"]));
      }
    }
    b.groups.forEach(function (g) {
      var list = el("div", { cls: "chip-list", role: "group", "aria-label": g.title });
      g.words.forEach(function (w) {
        var on = sel().indexOf(w) > -1;
        list.appendChild(el("button", { type: "button", cls: "chip" + (on ? " on" : ""), "aria-pressed": on ? "true" : "false", "data-word": w, text: w, onclick: function (e) {
          var s = sel().slice(), i = s.indexOf(w);
          if (i > -1) { s.splice(i, 1); setField(coreKey, core().filter(function (x) { return x !== w; })); } else s.push(w);
          setField(key, s);
          $$(".chip[data-word=\"" + w.replace(/"/g, "") + "\"]", box).forEach(function (c) { var o = s.indexOf(w) > -1; c.classList.toggle("on", o); c.setAttribute("aria-pressed", o ? "true" : "false"); });
          paintTray();
        } }));
      });
      box.appendChild(el("div", { cls: "chip-group" }, [el("h3", { cls: "u", html: g.title }), list]));
    });
    paintTray();
    return el("div", { cls: "chips-wrap" }, [el("div", { cls: "chip-panel" }, [tray]), box]);
  };
  R.checks = function (b) {
    ctx.n += 1;
    var key = ctx.step.id + ".c" + ctx.n;
    var box = el("fieldset", { cls: "checks" + (b.highlight ? " highlight" : ""), "data-key": key, "data-req": "1", "data-kind": "checks", "data-label": "Selected", "data-items": JSON.stringify(b.items) });
    box.appendChild(el("legend", { cls: "sr-only", text: b.highlight ? "Forms of courage most relevant to you" : "Most relevant dimension" }));
    b.items.forEach(function (it, i) {
      var id = nextId("c");
      var cb = el("input", { type: "checkbox", id: id, value: String(i) });
      cb.checked = (state.f[key] || []).indexOf(i) > -1;
      cb.addEventListener("change", function () {
        var cur = (state.f[key] || []).slice(), at = cur.indexOf(i);
        if (cb.checked && at < 0) cur.push(i); if (!cb.checked && at > -1) cur.splice(at, 1);
        cur.sort(); setField(key, cur);
      });
      box.appendChild(el("div", { cls: "check" }, [cb, el("label", { "for": id, html: it })]));
    });
    return box;
  };

  /* Assessment (1-4 ratings) */
  R.assess = function (b) {
    var wrap = el("div", { cls: "assess" });
    wrap.appendChild(el("div", { cls: "scale-key" }, [el("p", { cls: "scale-title", text: "HOW TO RESPOND" })].concat(WB.ratingLabels.map(function (l) { return el("p", { text: l }); }))));
    WB.principles.forEach(function (p) {
      var t = el("section", { cls: "assess-block", "data-principle": p.id });
      var totalEl = el("span", { cls: "assess-total" });
      t.appendChild(el("header", { cls: "assess-head" }, [
        el("span", { cls: "hash", text: "#" }),
        el("div", { cls: "assess-name" }, [el("p", { cls: "an", text: p.name }), el("p", { cls: "at", text: p.tag })]),
        el("div", { cls: "assess-score" }, [el("span", { cls: "lbl", text: "Score" }), totalEl])
      ]));
      p.statements.forEach(function (s, i) {
        var key = "a." + b.phase + "." + p.id + "." + i;
        var fs = el("fieldset", { cls: "rating", "data-key": key, "data-req": "1", "data-kind": "rating", "data-label": s });
        fs.appendChild(el("legend", null, [el("span", { cls: "num", text: String(i + 1) }), el("span", { cls: "stmt", text: s })]));
        var opts = el("div", { cls: "rating-opts" });
        var name = nextId("r");
        [1, 2, 3, 4].forEach(function (v) {
          var id = nextId("o");
          var inp = el("input", { type: "radio", name: name, id: id, value: String(v) });
          inp.checked = state.f[key] === v;
          inp.addEventListener("change", function () { setField(key, v); paintTotal(); fs.classList.add("is-filled"); });
          opts.appendChild(inp);
          opts.appendChild(el("label", { "for": id, title: WB.ratingLabels[v - 1] }, [el("span", { cls: "v", text: String(v) }), el("span", { cls: "sr-only", text: WB.ratingLabels[v - 1].slice(4) })]));
        });
        if (state.f[key]) fs.classList.add("is-filled");
        fs.appendChild(opts);
        t.appendChild(fs);
      });
      function paintTotal() {
        var sc = principleScore(b.phase, p.id);
        if (sc.total !== null) { var bd = bandFor(sc.total); totalEl.innerHTML = "<b>" + sc.total + "</b>/20<small>" + bd.label + "</small>"; }
        else totalEl.innerHTML = sc.answered ? "<b>" + sc.partial + "</b><small>" + sc.answered + " of 5 rated</small>" : "<small>Not rated</small>";
        if (b.phase === "post") {
          var pre = principleScore("pre", p.id);
          if (pre.total !== null) totalEl.insertAdjacentHTML("beforeend", "<small class=\"pre\">Pre-course: " + pre.total + "/20</small>");
        }
      }
      paintTotal();
      t.addEventListener("change", paintTotal);
      wrap.appendChild(t);
    });
    wrap.appendChild(el("p", { cls: "hint", text: "Totals and interpretation are calculated automatically on the next step." }));
    return wrap;
  };
  R.scores = function (b) {
    var ul = el("ul", { cls: "scores", "data-phase": b.phase });
    function paint() {
      ul.innerHTML = "";
      WB.principles.forEach(function (p) {
        var sc = principleScore(b.phase, p.id), bd = sc.total !== null ? bandFor(sc.total) : null;
        var val = sc.total !== null ? "<b>" + sc.total + "</b> / 20" : "<span class=\"blank\">_____</span> / 20";
        var badge = bd ? "<span class=\"band band-" + bd.label.split(" ")[0].toLowerCase() + "\">" + bd.label + "</span>" : "<span class=\"band band-none\">" + (sc.answered ? sc.answered + " of 5 rated" : "Not rated yet") + "</span>";
        var delta = "";
        if (b.phase === "post" && sc.total !== null) {
          var pre = principleScore("pre", p.id);
          if (pre.total !== null) { var d = sc.total - pre.total; delta = "<span class=\"delta\">Pre-course " + pre.total + " · " + (d > 0 ? "+" : "") + d + "</span>"; }
        }
        ul.appendChild(el("li", { html: "<span class=\"sn\">" + p.name + ":</span> <span class=\"sv\">" + val + "</span> " + badge + delta }));
      });
    }
    paint();
    ul._paint = paint;
    return ul;
  };
  R.eiq = function (b) {
    var post = b.phase === "post";
    var wrap = el("div", { cls: "eiq eiq-" + b.phase, "data-phase": b.phase });
    wrap.appendChild(el("div", { cls: "scale-key" }, [el("p", { cls: "scale-title", text: "Proficiency Rating Scale" })].concat(WB.eiqLabels.map(function (l) { return el("p", { text: l }); }))));
    WB.eiq.forEach(function (g, gi) {
      var sec = el("section", { cls: "eiq-group" });
      sec.appendChild(el("h3", { cls: "eiq-title", html: "<b>" + g.group + "</b> - " + (g.strong ? "<b>" + g.sub + "</b>" : g.sub) }));
      var t = el("table", { cls: "eiq-table" });
      t.appendChild(el("thead", null, [el("tr", null, (post ? ["Skill", "Behavior Indicators", "Pre", "Post", "Progress Reflection"] : ["Skill", "Behavior Indicators", "Pre", "Reflection"]).map(function (h) { return el("th", { scope: "col", html: "<u>" + h + "</u>" }); }))]));
      var tb = el("tbody");
      g.skills.forEach(function (s, si) {
        var base = "e." + gi + "." + si;
        function sel(phase) {
          var k = base + "." + phase;
          var s1 = el("select", { "data-key": k, "data-req": "1", "data-kind": "select", "data-label": s[0] + " (" + phase + ")", "aria-label": s[0] + ": " + (phase === "pre" ? "Pre-Program" : "Post-Program") + " rating" });
          s1.appendChild(el("option", { value: "", text: "–" }));
          [1, 2, 3, 4].forEach(function (v) { s1.appendChild(el("option", { value: String(v), text: String(v), title: WB.eiqLabels[v - 1] })); });
          s1.value = state.f[k] ? String(state.f[k]) : "";
          s1.classList.toggle("is-filled", !!s1.value);
          s1.addEventListener("change", function () { setField(k, s1.value ? Number(s1.value) : ""); s1.classList.toggle("is-filled", !!s1.value); });
          return s1;
        }
        var nk = base + (post ? ".note" : ".prenote"), note = null;
        note = el("textarea", { cls: "journal", rows: 2, "data-key": nk, "data-req": "1", "data-kind": "text", "data-label": s[0] + (post ? " Progress Reflection" : " Reflection"), "aria-label": s[0] + (post ? ": Progress Reflection" : ": Reflection"), placeholder: post ? "Insights, shifts, application…" : "Where you are today, examples, what you notice…" });
        if (note) {
          note.value = state.f[nk] || "";
          note.addEventListener("input", function () { setField(nk, note.value.trim() ? note.value : ""); autosize(note); });
        }
        var cells = [el("th", { scope: "row", text: s[0] }), el("td", { cls: "ind", text: s[1] })];
        if (post) {
          var pv = state.f[base + ".pre"];
          cells.push(el("td", { cls: "rt", "data-h": "Pre" }, [el("span", { cls: "pre-read" + (pv ? "" : " none"), "data-pre": gi + "." + si, title: pv ? WB.eiqLabels[pv - 1] : "Not rated in the Pre-Program assessment", "aria-label": s[0] + ": Pre-Program rating " + (pv || "not rated"), text: pv ? String(pv) : "–" })]));
          cells.push(el("td", { cls: "rt", "data-h": "Post" }, [sel("post")]));
          cells.push(el("td", { cls: "pr" }, [note]));
        } else {
          cells.push(el("td", { cls: "rt", "data-h": "Pre" }, [sel("pre")]));
          cells.push(el("td", { cls: "pr" }, [note]));
        }
        tb.appendChild(el("tr", null, cells));
      });
      t.appendChild(tb);
      sec.appendChild(el("div", { cls: "table-wrap" }, [t]));
      wrap.appendChild(sec);
    });
    return wrap;
  };

  function refreshPreRead(root) {
    WB.eiq.forEach(function (g, gi) { g.skills.forEach(function (s, si) {
      var n = $("[data-pre=\"" + gi + "." + si + "\"]", root); if (!n) return;
      var pv = state.f["e." + gi + "." + si + ".pre"];
      n.textContent = pv ? String(pv) : "–";
      n.classList.toggle("none", !pv);
      n.title = pv ? WB.eiqLabels[pv - 1] : "Not rated in the Pre-Program assessment";
    }); });
  }

  /* ------------------------------------------------------------- build app */
  var STEPS = [];      // flat list { m, s, mi, si, el, req:[{key,kind,min}] }
  var mainEl, navEl;

  function buildSteps() {
    var host = $("#steps");
    WB.modules.forEach(function (m, mi) {
      m.steps.forEach(function (s, si) {
        ctx = { step: s, n: 0 };
        var art = el("article", { cls: "step", id: "step-" + s.id, hidden: true, "aria-labelledby": "h-" + s.id });
        var paper = el("div", { cls: "paper" });
        render(s.blocks, paper);
        art.appendChild(paper);
        host.appendChild(art);
        var req = $$("[data-req=\"1\"]", art).map(function (n) { return { key: n.getAttribute("data-key"), kind: n.getAttribute("data-kind"), min: Number(n.getAttribute("data-min") || 1) }; });
        STEPS.push({ m: m, s: s, mi: mi, si: si, el: art, req: req, fields: $$("[data-key]", art) });
      });
    });
    ctx = null;
  }

  function filled(r) {
    var v = state.f[r.key];
    if (r.kind === "chips") return Array.isArray(v) && v.length >= r.min;
    if (Array.isArray(v)) return v.length > 0;
    if (typeof v === "number") return true;
    return typeof v === "string" && v.trim() !== "";
  }
  function stepStatus(st) {
    if (!st.req.length) return state.visited[st.s.id] ? "complete" : "empty";
    var n = st.req.filter(filled).length;
    return n === 0 ? "empty" : n === st.req.length ? "complete" : "partial";
  }
  function stepCounts(st) { return { done: st.req.filter(filled).length, total: st.req.length }; }
  function moduleSteps(mi) { return STEPS.filter(function (x) { return x.mi === mi; }); }
  function moduleStatus(mi) {
    var ss = moduleSteps(mi).map(stepStatus);
    if (ss.every(function (x) { return x === "complete"; })) return "complete";
    if (ss.every(function (x) { return x === "empty"; })) return "empty";
    return "partial";
  }
  function overall() {
    var done = 0, total = 0;
    STEPS.forEach(function (st) {
      if (!st.req.length) { total += 1; if (state.visited[st.s.id]) done += 1; }
      else { total += st.req.length; done += st.req.filter(filled).length; }
    });
    return { done: done, total: total, pct: total ? Math.round(done / total * 100) : 0 };
  }

  function buildNav() {
    navEl = $("#modnav");
    var groups = {};
    var order = [];
    WB.modules.forEach(function (m, mi) { if (!groups[m.group]) { groups[m.group] = []; order.push(m.group); } groups[m.group].push(mi); });
    // Keep the source order but group headings where modules are contiguous.
    var list = el("ol", { cls: "modlist" });
    var lastGroup = null;
    WB.modules.forEach(function (m, mi) {
      if (m.group !== lastGroup) { list.appendChild(el("li", { cls: "modgroup", "aria-hidden": "true", text: m.group })); lastGroup = m.group; }
      var steps = el("ol", { cls: "steplist" }, m.steps.map(function (s, si) {
        return el("li", null, [el("a", { href: "#/m/" + m.id + "/" + (si + 1), "data-step": s.id }, [el("span", { cls: "st-ico" }), el("span", { cls: "st-t", html: s.title })])]);
      }));
      list.appendChild(el("li", { cls: "mod", "data-mod": m.id }, [
        el("a", { href: "#/m/" + m.id + "/1", cls: "mod-link" }, [el("span", { cls: "mod-ico" }), el("span", { cls: "mod-t", text: m.short }), el("span", { cls: "mod-n" })]),
        steps
      ]));
    });
    navEl.appendChild(list);
  }

  function refreshProgress() {
    var o = overall();
    $$("[data-overall-pct]").forEach(function (n) { n.textContent = o.pct + "%"; });
    $$("[data-overall-bar]").forEach(function (n) { n.style.width = o.pct + "%"; n.parentNode.setAttribute("aria-valuenow", o.pct); });
    WB.modules.forEach(function (m, mi) {
      var li = $(".mod[data-mod=\"" + m.id + "\"]", navEl);
      if (!li) return;
      var st = moduleStatus(mi);
      li.setAttribute("data-status", st);
      $(".mod-ico", li).innerHTML = ICON[st];
      $(".mod-ico", li).setAttribute("title", STATUS_TEXT[st]);
      var ms = moduleSteps(mi), c = ms.filter(function (x) { return stepStatus(x) === "complete"; }).length;
      $(".mod-n", li).textContent = c + "/" + ms.length;
      $(".mod-n", li).setAttribute("aria-label", c + " of " + ms.length + " steps complete, " + STATUS_TEXT[st]);
    });
    STEPS.forEach(function (st) {
      var a = $("a[data-step=\"" + st.s.id + "\"]", navEl), s = stepStatus(st);
      if (a) { $(".st-ico", a).innerHTML = ICON[s]; a.setAttribute("data-status", s); a.setAttribute("aria-label", plain(st.s.title) + ", " + STATUS_TEXT[s]); }
    });
    $$(".scores").forEach(function (u) { if (u._paint) u._paint(); });
    if (current) paintStepHeader(current);
  }

  /* ------------------------------------------------------------- routing */
  var current = null;
  function show(view) {
    ["cover", "workbook", "results"].forEach(function (v) { $("#view-" + v).hidden = v !== view; });
    document.body.setAttribute("data-view", view);
  }
  function route() {
    var h = location.hash.replace(/^#\/?/, "");
    var parts = h.split("/");
    if (parts[0] === "m") {
      var mi = WB.modules.map(function (m) { return m.id; }).indexOf(parts[1]);
      if (mi < 0) mi = 0;
      var si = Math.max(0, Math.min(WB.modules[mi].steps.length - 1, (parseInt(parts[2], 10) || 1) - 1));
      openStep(STEPS.filter(function (x) { return x.mi === mi && x.si === si; })[0]);
    } else if (parts[0] === "results") {
      current = null; show("results"); renderResults(); closeDrawer(); window.scrollTo(0, 0);
      document.title = "Progress & Results · ATHENA Leadership Circle Workbook";
    } else {
      current = null; show("cover"); paintCover();
      document.title = "ATHENA Leadership Circle Workbook";
    }
  }
  function openStep(st) {
    show("workbook");
    STEPS.forEach(function (x) { x.el.hidden = x !== st; });
    var first = !current || current !== st;
    current = st;
    state.visited[st.s.id] = true;
    state.last = { m: st.m.id, s: st.si + 1 };
    save();
    $$("a[aria-current]", navEl).forEach(function (a) { a.removeAttribute("aria-current"); });
    $$(".mod", navEl).forEach(function (li) { li.classList.toggle("open", li.getAttribute("data-mod") === st.m.id); });
    var a = $("a[data-step=\"" + st.s.id + "\"]", navEl); if (a) a.setAttribute("aria-current", "step");
    paintStepHeader(st);
    paintPager(st);
    refreshProgress();
    if ($(".eiq-post", st.el)) refreshPreRead(st.el);
    $$("textarea", st.el).forEach(autosize);
    document.title = plain(st.s.title) + " · " + st.m.short + " · ATHENA Leadership Circle Workbook";
    closeDrawer();
    if (first) { window.scrollTo(0, 0); var h = $("#step-title"); if (h) h.focus({ preventScroll: true }); }
  }
  function paintStepHeader(st) {
    var head = $("#stephead");
    var steps = moduleSteps(st.mi);
    var pages = st.s.p;
    var pr = pages.length > 1 ? "Workbook pages " + pages[0] + "–" + pages[pages.length - 1] : "Workbook page " + pages[0];
    var c = stepCounts(st);
    var status = stepStatus(st);
    var reqText = c.total ? c.done + " of " + c.total + " responses" : "Reading";
    head.innerHTML = "";
    head.classList.toggle("has-opener", st.s.blocks[0].t === "divider");
    head.appendChild(el("p", { cls: "kicker" }, [el("span", { text: st.m.group })]));
    var h1 = el("h1", { id: "step-title", tabindex: "-1", html: st.m.title });
    if (st.m.principle) head.appendChild(el("div", { cls: "head-row" }, [el("img", { src: "assets/icons/principles/" + st.m.principle + ".webp", alt: "", cls: "head-icon", width: 72, height: 72 }), h1]));
    else head.appendChild(h1);
    var tabs = el("ol", { cls: "steptabs", "aria-label": "Steps in this module" }, steps.map(function (x, i) {
      var s = stepStatus(x);
      return el("li", null, [el("a", { href: "#/m/" + x.m.id + "/" + (x.si + 1), cls: "steptab s-" + s + (x === st ? " on" : ""), "aria-current": x === st ? "step" : null, title: plain(x.s.title) + ": " + STATUS_TEXT[s] }, [
        el("span", { cls: "st-num", text: (i + 1 < 10 ? "0" : "") + (i + 1) }),
        el("span", { cls: "st-title", html: x.s.title }),
        el("span", { cls: "st-state", html: ICON[s] })
      ])]);
    }));
    head.appendChild(tabs);
    var on = $(".steptab.on", tabs); if (on) requestAnimationFrame(function () { tabs.scrollLeft = on.parentNode.offsetLeft - 16; });
    head.appendChild(el("div", { cls: "stepmeta" }, [
      el("span", { cls: "stepstat s-" + status, html: ICON[status] + " " + STATUS_TEXT[status] + (c.total ? " · " + reqText : "") }),
      el("span", { cls: "pages", text: pr })
    ]));
  }
  function paintPager(st) {
    var i = STEPS.indexOf(st), prev = STEPS[i - 1], next = STEPS[i + 1];
    var pg = $("#pager"); pg.innerHTML = "";
    pg.appendChild(prev ? el("a", { cls: "pager-link prev", href: "#/m/" + prev.m.id + "/" + (prev.si + 1) }, [el("span", { cls: "arr", "aria-hidden": "true", text: "←" }), el("span", null, [el("small", { text: "Previous" }), el("span", { html: prev.s.title })])]) : el("a", { cls: "pager-link prev", href: "#/" }, [el("span", { cls: "arr", "aria-hidden": "true", text: "←" }), el("span", null, [el("small", { text: "Back to" }), el("span", { text: "Cover" })])]));
    pg.appendChild(next ? el("a", { cls: "pager-link next", href: "#/m/" + next.m.id + "/" + (next.si + 1) }, [el("span", null, [el("small", { text: next.mi !== st.mi ? "Next module" : "Next" }), el("span", { html: next.mi !== st.mi ? next.m.short : next.s.title })]), el("span", { cls: "arr", "aria-hidden": "true", text: "→" })]) : el("a", { cls: "pager-link next", href: "#/results" }, [el("span", null, [el("small", { text: "Finish" }), el("span", { text: "Progress & Results" })]), el("span", { cls: "arr", "aria-hidden": "true", text: "→" })]));
  }

  /* --------------------------------------------------------------- cover */
  function paintCover() {
    var name = $("#cover-name");
    if (document.activeElement !== name) name.value = state.name || "";
    var cont = $("#cover-continue"), begin = $("#cover-begin");
    var o = overall();
    if (state.last) {
      var m = WB.modules.filter(function (x) { return x.id === state.last.m; })[0];
      var s = m && m.steps[state.last.s - 1];
      if (m && s) {
        cont.hidden = false;
        cont.href = "#/m/" + m.id + "/" + state.last.s;
        $("#cover-continue-where").innerHTML = m.short + " · " + s.title;
        $("#cover-pct").textContent = o.pct + "% complete";
        begin.textContent = "Start from the beginning";
        begin.classList.remove("btn-gold"); begin.classList.add("btn-line");
        return;
      }
    }
    cont.hidden = true;
    begin.textContent = "Begin workbook";
    begin.classList.add("btn-gold"); begin.classList.remove("btn-line");
  }

  /* ------------------------------------------------------------- results */
  function renderResults() {
    var host = $("#results-body");
    host.innerHTML = "";
    var o = overall();
    var done = WB.modules.filter(function (_, mi) { return moduleStatus(mi) === "complete"; }).length;
    host.appendChild(el("div", { cls: "tiles" }, [
      tile(o.pct + "%", "Overall completion", o.done + " of " + o.total + " items"),
      tile(done + " / " + WB.modules.length, "Modules complete", ""),
      tile(countBands("pre"), "Pre-course principles scored", "of 8"),
      tile(countBands("post"), "Post-course principles scored", "of 8")
    ]));

    // Scores chart + table
    var sec = el("section", { cls: "res-sec" }, [el("h2", { text: "ATHENA Principles: your scores" }), el("p", { cls: "muted", text: "Each principle is scored from 5 to 20. Shaded zones follow the workbook’s interpretation: 5–12 Opportunity for Growth, 13–16 Emerging Strength, 17–20 Strength." })]);
    sec.appendChild(scoreChart());
    sec.appendChild(scoreTable());
    host.appendChild(sec);

    // Principle summaries
    var ps = el("section", { cls: "res-sec" }, [el("h2", { text: "Principle summaries" })]);
    var grid = el("div", { cls: "psum" });
    WB.principles.forEach(function (p) {
      var mi = WB.modules.map(function (m) { return m.principle; }).indexOf(p.id);
      var pre = principleScore("pre", p.id), post = principleScore("post", p.id);
      var st = moduleStatus(mi);
      var commits = moduleSteps(mi).reduce(function (acc, x) {
        $$("[data-commit=\"1\"]", x.el).forEach(function (f) { var v = state.f[f.getAttribute("data-key")]; if (v) acc.push([f.getAttribute("data-label"), v]); });
        return acc;
      }, []);
      var card = el("article", { cls: "pcard" }, [
        el("header", null, [el("img", { src: "assets/icons/principles/" + p.id + ".webp", alt: "", width: 56, height: 56 }), el("div", null, [el("h3", { text: p.name }), el("p", { cls: "muted", text: p.tag })]), el("span", { cls: "stepstat s-" + st, html: ICON[st] + " " + STATUS_TEXT[st] })]),
        el("dl", { cls: "pscores" }, [
          el("dt", { text: "Pre-course" }), el("dd", { html: scoreText(pre) }),
          el("dt", { text: "Post-course" }), el("dd", { html: scoreText(post) }),
          el("dt", { text: "Change" }), el("dd", { html: pre.total !== null && post.total !== null ? ((post.total - pre.total > 0 ? "+" : "") + (post.total - pre.total)) : "<span class=\"muted\">–</span>" })
        ]),
        commits.length ? el("div", { cls: "pcommit" }, [el("p", { cls: "pc-h", text: "Commitments" })].concat(commits.slice(0, 3).map(function (c) { return el("p", null, [el("b", { text: c[0] + " " }), document.createTextNode(truncate(c[1], 160))]); }))) : el("p", { cls: "muted small", text: "No 30-day commitments written yet." }),
        el("a", { cls: "link", href: "#/m/" + p.id + "/1", text: "Open " + p.name + " →" })
      ]);
      grid.appendChild(card);
    });
    ps.appendChild(grid);
    host.appendChild(ps);

    // Modules
    var ms = el("section", { cls: "res-sec" }, [el("h2", { text: "Modules" })]);
    var list = el("ol", { cls: "modtable" });
    WB.modules.forEach(function (m, mi) {
      var st = moduleStatus(mi), steps = moduleSteps(mi);
      var d = 0, t = 0; steps.forEach(function (x) { var c = stepCounts(x); d += c.done; t += c.total; });
      list.appendChild(el("li", { cls: "s-" + st }, [
        el("span", { cls: "mt-ico", html: ICON[st] }),
        el("a", { href: "#/m/" + m.id + "/1", text: m.title }),
        el("span", { cls: "muted", text: t ? d + " of " + t + " responses" : "Reading" }),
        el("span", { cls: "mt-st", text: STATUS_TEXT[st] })
      ]));
    });
    ms.appendChild(list);
    host.appendChild(ms);

    // EIQ
    var eq = el("section", { cls: "res-sec" }, [el("h2", { text: "People Skills & Emotional IQ" })]);
    var et = el("table", { cls: "grid rtable" });
    et.appendChild(el("thead", null, [el("tr", null, ["Skill", "Pre", "Post", "Change"].map(function (h) { return el("th", { scope: "col", text: h }); }))]));
    var etb = el("tbody"), anyE = false;
    WB.eiq.forEach(function (g, gi) {
      etb.appendChild(el("tr", { cls: "grp" }, [el("th", { colspan: 4, scope: "colgroup", text: g.group })]));
      g.skills.forEach(function (s, si) {
        var a = state.f["e." + gi + "." + si + ".pre"], b = state.f["e." + gi + "." + si + ".post"];
        if (a || b) anyE = true;
        etb.appendChild(el("tr", null, [el("th", { scope: "row", text: s[0] }), el("td", { text: a || "–" }), el("td", { text: b || "–" }), el("td", { text: a && b ? ((b - a > 0 ? "+" : "") + (b - a)) : "–" })]));
      });
    });
    et.appendChild(etb);
    eq.appendChild(anyE ? el("div", { cls: "table-wrap" }, [et]) : el("p", { cls: "empty", html: "No skills rated yet. <a href=\"#/m/eiq/2\">Rate your People Skills & Emotional IQ →</a>" }));
    host.appendChild(eq);
  }
  function tile(v, l, s) { return el("div", { cls: "tile" }, [el("p", { cls: "tv", text: v }), el("p", { cls: "tl", text: l }), s ? el("p", { cls: "ts", text: s }) : null]); }
  function countBands(phase) { return String(WB.principles.filter(function (p) { return principleScore(phase, p.id).total !== null; }).length); }
  function scoreText(sc) {
    if (sc.total === null) return sc.answered ? "<span class=\"muted\">" + sc.answered + " of 5 rated</span>" : "<span class=\"muted\">Not rated</span>";
    var b = bandFor(sc.total);
    return "<b>" + sc.total + "</b>/20 <span class=\"band band-" + b.label.split(" ")[0].toLowerCase() + "\">" + b.label + "</span>";
  }
  function truncate(s, n) { s = String(s).replace(/\s+/g, " ").trim(); return s.length > n ? s.slice(0, n - 1) + "…" : s; }

  function scoreChart() {
    var W = 720, rowH = 40, top = 34, left = 176, right = 24, H = top + WB.principles.length * rowH + 30;
    var x = function (v) { return left + (v - 5) / 15 * (W - left - right); };
    var s = "<svg viewBox=\"0 0 " + W + " " + H + "\" role=\"img\" aria-labelledby=\"sc-t sc-d\" class=\"schart\">";
    s += "<title id=\"sc-t\">Pre-course and post-course scores by principle</title><desc id=\"sc-d\">Hollow ring marks the pre-course score, filled dot the post-course score, on a scale from 5 to 20. The same values are listed in the table below.</desc>";
    [[5, 12.5, "Opportunity for Growth"], [12.5, 16.5, "Emerging Strength"], [16.5, 20, "Strength"]].forEach(function (z, i) {
      s += "<rect x=\"" + x(z[0]) + "\" y=\"" + (top - 6) + "\" width=\"" + (x(z[1]) - x(z[0])) + "\" height=\"" + (WB.principles.length * rowH + 6) + "\" class=\"zone z" + i + "\"/>";
      s += "<text x=\"" + ((x(z[0]) + x(z[1])) / 2) + "\" y=\"" + (top - 14) + "\" class=\"zl\" text-anchor=\"middle\">" + z[2] + "</text>";
    });
    [5, 8, 12, 16, 20].forEach(function (t) { s += "<text x=\"" + x(t) + "\" y=\"" + (H - 8) + "\" class=\"tick\" text-anchor=\"middle\">" + t + "</text>"; });
    WB.principles.forEach(function (p, i) {
      var cy = top + i * rowH + rowH / 2;
      var pre = principleScore("pre", p.id).total, post = principleScore("post", p.id).total;
      s += "<g class=\"srow\" tabindex=\"0\"><title>" + esc(p.name) + ": pre-course " + (pre === null ? "not scored" : pre) + ", post-course " + (post === null ? "not scored" : post) + "</title>";
      s += "<rect x=\"0\" y=\"" + (cy - rowH / 2) + "\" width=\"" + W + "\" height=\"" + rowH + "\" class=\"hit\"/>";
      s += "<text x=\"" + (left - 14) + "\" y=\"" + (cy + 5) + "\" class=\"rl\" text-anchor=\"end\">" + esc(p.name) + "</text>";
      s += "<line x1=\"" + left + "\" x2=\"" + (W - right) + "\" y1=\"" + cy + "\" y2=\"" + cy + "\" class=\"base\"/>";
      if (pre !== null && post !== null) s += "<line x1=\"" + x(pre) + "\" x2=\"" + x(post) + "\" y1=\"" + cy + "\" y2=\"" + cy + "\" class=\"link\"/>";
      if (pre !== null) s += "<circle cx=\"" + x(pre) + "\" cy=\"" + cy + "\" r=\"7\" class=\"pre\"/>";
      if (post !== null) s += "<circle cx=\"" + x(post) + "\" cy=\"" + cy + "\" r=\"7\" class=\"post\"/>";
      var lab = post !== null ? post : pre;
      if (lab !== null) { var lx = x(Math.max(post || 0, pre || 0)) + 14; s += "<text x=\"" + Math.min(lx, W - 4) + "\" y=\"" + (cy + 5) + "\" class=\"vl\"" + (lx > W - 20 ? " text-anchor=\"end\"" : "") + ">" + lab + "</text>"; }
      if (pre === null && post === null) s += "<text x=\"" + left + "\" y=\"" + (cy - 8) + "\" class=\"na\">Not scored yet</text>";
      s += "</g>";
    });
    s += "</svg>";
    var legend = el("div", { cls: "legend" }, [el("span", null, [el("i", { cls: "lg pre" }), "Pre-course"]), el("span", null, [el("i", { cls: "lg post" }), "Post-course"])]);
    return el("figure", { cls: "chartfig" }, [legend, el("div", { cls: "chartbox", html: s })]);
  }
  function scoreTable() {
    var t = el("table", { cls: "grid rtable" });
    t.appendChild(el("caption", { cls: "sr-only", text: "Scores by principle" }));
    t.appendChild(el("thead", null, [el("tr", null, ["Principle", "Pre-course", "Post-course", "Change"].map(function (h) { return el("th", { scope: "col", text: h }); }))]));
    var tb = el("tbody");
    WB.principles.forEach(function (p) {
      var a = principleScore("pre", p.id), b = principleScore("post", p.id);
      tb.appendChild(el("tr", null, [el("th", { scope: "row", text: p.name }), el("td", { html: scoreText(a) }), el("td", { html: scoreText(b) }), el("td", { text: a.total !== null && b.total !== null ? ((b.total - a.total > 0 ? "+" : "") + (b.total - a.total)) : "–" })]));
    });
    t.appendChild(tb);
    return el("details", { cls: "tview" }, [el("summary", { text: "Show scores as a table" }), el("div", { cls: "table-wrap" }, [t])]);
  }

  /* --------------------------------------------------------- print summary */
  function buildSummary() {
    var root = $("#print-root");
    root.innerHTML = "";
    var d = new Date();
    root.appendChild(el("header", { cls: "ps-head" }, [
      el("img", { src: "assets/A-Logo-Navy.svg", alt: "ATHENA International", width: 96, height: 48 }),
      el("div", null, [el("h1", { text: "Leadership Circle Workbook" }), el("p", { text: "Response Summary" + (state.name ? " · " + state.name : "") }), el("p", { cls: "muted", text: "Generated " + d.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" }) + " · " + overall().pct + "% complete" })])
    ]));
    // Scores
    var st = el("table", { cls: "ps-table" });
    st.appendChild(el("thead", null, [el("tr", null, ["ATHENA Principle", "Pre-Course", "Post-Course", "Change"].map(function (h) { return el("th", { text: h }); }))]));
    var stb = el("tbody");
    WB.principles.forEach(function (p) {
      var a = principleScore("pre", p.id), b = principleScore("post", p.id);
      function t(sc) { return sc.total === null ? (sc.answered ? sc.answered + " of 5 rated" : "–") : sc.total + " / 20 · " + bandFor(sc.total).label; }
      stb.appendChild(el("tr", null, [el("td", { text: p.name }), el("td", { text: t(a) }), el("td", { text: t(b) }), el("td", { text: a.total !== null && b.total !== null ? ((b.total - a.total > 0 ? "+" : "") + (b.total - a.total)) : "–" })]));
    });
    st.appendChild(stb);
    root.appendChild(el("section", { cls: "ps-sec" }, [el("h2", { text: "ATHENA Principles Assessment" }), st, el("p", { cls: "muted small", text: WB.bands.map(function (b) { return b.text; }).join("  ·  ") })]));

    // Module answers
    WB.modules.forEach(function (m, mi) {
      var sec = el("section", { cls: "ps-sec" }, [el("h2", { text: m.title })]);
      var any = false;
      moduleSteps(mi).forEach(function (x) {
        var items = [];
        var eq = $(".eiq", x.el);
        if (eq) {
          var isPost = eq.getAttribute("data-phase") === "post";
          var t = el("table", { cls: "ps-table" });
          t.appendChild(el("thead", null, [el("tr", null, (isPost ? ["Skill", "Pre", "Post", "Progress Reflection"] : ["Skill", "Pre", "Reflection"]).map(function (h) { return el("th", { text: h }); }))]));
          var tb = el("tbody"), rows = 0;
          WB.eiq.forEach(function (g, gi) { g.skills.forEach(function (s, si) {
            var b = "e." + gi + "." + si, a1 = state.f[b + ".pre"], a2 = state.f[b + ".post"], n = state.f[b + ".note"];
            var pn = state.f[b + ".prenote"];
            if (!isPost && (a1 || pn)) { rows += 1; tb.appendChild(el("tr", null, [el("td", { text: s[0] }), el("td", { text: a1 || "–" }), el("td", { cls: "pre-wrap", text: pn || "" })])); }
            if (isPost && (a2 || n)) { rows += 1; tb.appendChild(el("tr", null, [el("td", { text: s[0] }), el("td", { text: a1 || "–" }), el("td", { text: a2 || "–" }), el("td", { cls: "pre-wrap", text: n || "" })])); }
          }); });
          t.appendChild(tb);
          if (rows) items.push(t);
        } else {
          $$("[data-key]", x.el).forEach(function (f) {
            var k = f.getAttribute("data-key"), kind = f.getAttribute("data-kind"), v = state.f[k];
            if (kind === "rating" || v === undefined || v === "" || (Array.isArray(v) && !v.length)) return;
            if (kind === "chips") {
              var core = state.f[x.s.id + ".core"] || [];
              items.push(qa("Core values chosen (Step 1)", v.join(", ")));
              if (core.length) items.push(qa("Top core values (Step 2)", core.join(", ")));
            } else if (kind === "checks") {
              var labels = JSON.parse(f.getAttribute("data-items"));
              items.push(qa(plain($("legend", f).textContent), v.map(function (i) { return plain(labels[i]); }).join("\n")));
            } else if (kind === "text") {
              items.push(qa(f.getAttribute("data-label"), v, f.getAttribute("data-commit") === "1"));
            }
          });
        }
        if (items.length) { any = true; sec.appendChild(el("h3", { html: x.s.title })); items.forEach(function (i) { sec.appendChild(i); }); }
      });
      if (any) root.appendChild(sec);
    });
    root.appendChild(el("p", { cls: "ps-foot", text: "© ATHENA INTERNATIONAL · Responses were created in this browser and are not stored online." }));
  }
  function qa(q, a, commit) { return el("div", { cls: "qa" + (commit ? " commit" : "") }, [el("p", { cls: "qa-q", text: q }), el("p", { cls: "qa-a", text: a })]); }

  /* ------------------------------------------------------------- helpers */
  function syncInputs() {
    $$("[data-key]").forEach(function (f) {
      var k = f.getAttribute("data-key");
      if (f.tagName === "TEXTAREA" || (f.tagName === "INPUT" && f.type === "text")) { f.value = state.f[k] || ""; markField(f); if (f.tagName === "TEXTAREA") autosize(f); }
      else if (f.tagName === "SELECT") { f.value = state.f[k] ? String(state.f[k]) : ""; f.classList.toggle("is-filled", !!f.value); }
    });
  }
  function flash(host, msg) {
    var n = el("p", { cls: "flash", role: "status", text: msg });
    host.appendChild(n);
    setTimeout(function () { if (n.parentNode) n.parentNode.removeChild(n); }, 3200);
  }
  function paintSaveStatus() {
    var n = $("#save-status");
    if (!n) return;
    if (!storageOk) { n.textContent = "Saving is unavailable in this browser mode. Download your summary before closing."; n.className = "save-status warn"; return; }
    if (!state.updated) { n.textContent = "Nothing saved yet"; n.className = "save-status"; return; }
    var t = new Date(state.updated);
    n.textContent = "Saved on this device · " + t.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
    n.className = "save-status ok";
  }
  function openLightbox(src, alt) {
    var d = $("#lightbox");
    $("img", d).src = src; $("img", d).alt = alt;
    if (d.showModal) d.showModal(); else d.setAttribute("open", "");
  }
  function openDrawer() { document.body.classList.add("drawer-open"); $("#menu-btn").setAttribute("aria-expanded", "true"); }
  function closeDrawer() { document.body.classList.remove("drawer-open"); var b = $("#menu-btn"); if (b) b.setAttribute("aria-expanded", "false"); }

  /* ---------------------------------------------------------------- init */
  function init() {
    buildSteps();
    buildNav();
    mainEl = $("#main");

    function onName(e) {
      state.name = e.target.value; save();
      $$("[data-name-input]").forEach(function (n) { if (n !== e.target) n.value = state.name; });
    }
    $$("[data-name-input]").forEach(function (n) { n.value = state.name || ""; n.addEventListener("input", onName); });

    $("#cover-begin").addEventListener("click", function () { location.hash = "#/m/welcome/1"; });
    $$("[data-action=print]").forEach(function (b) { b.addEventListener("click", function () { buildSummary(); window.print(); }); });
    $$("[data-action=reset]").forEach(function (b) { b.addEventListener("click", function () {
      if (!window.confirm("Reset the workbook? This permanently erases every answer, score and your progress saved on this device. It cannot be undone.")) return;
      clearTimeout(saveTimer);
      state = blank();
      try { window.localStorage.removeItem(STORE_KEY); } catch (e) { /* storage blocked */ }
      // Rebuild every control from the empty state.
      history.replaceState(null, "", location.pathname + location.search + "#/");
      location.reload();
    }); });
    $("#menu-btn").addEventListener("click", function () { document.body.classList.contains("drawer-open") ? closeDrawer() : openDrawer(); });
    $("#scrim").addEventListener("click", closeDrawer);
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeDrawer(); });
    $("#lightbox").addEventListener("click", function (e) { if (e.target.id === "lightbox" || e.target.closest("[data-close]")) this.close(); });
    window.addEventListener("beforeprint", buildSummary);
    window.addEventListener("hashchange", route);

    paintSaveStatus();
    refreshProgress();
    route();
    document.body.classList.add("ready");
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
