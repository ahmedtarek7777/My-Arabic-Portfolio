const app = document.querySelector("#app"),
  id = document.body.dataset.app,
  $ = (s) => document.querySelector(s);
let ctx,
  cleanup = () => {};
const message = (t) => ($("#status").textContent = t);
function saveFile(name, blob) {
  let u = URL.createObjectURL(blob),
    a = document.createElement("a");
  a.href = u;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(u), 5000);
}
function layout(tools, body) {
  app.innerHTML = `<section class="panel"><div class="tools">${tools}</div>${body}<p id="status" role="status"></p></section>`;
}
const color = (id, label, value) =>
  `<label>${label}<input id="${id}" type="color" value="${value}"></label>`;
const range = (id, label, min, max, value, step = 1) =>
  `<label>${label}<input id="${id}" type="range" min="${min}" max="${max}" value="${value}" step="${step}"></label>`;
function canvas(w = 900, h = 560) {
  $("#surface").innerHTML =
    `<canvas id="canvas" width="${w}" height="${h}" aria-label="مساحة التصميم"></canvas>`;
  return $("#canvas");
}
function downloadCanvas(c) {
  saveFile(id + ".png", dataBlob(c.toDataURL()));
}
function dataBlob(s) {
  let [h, b] = s.split(","),
    a = Uint8Array.from(atob(b), (c) => c.charCodeAt(0));
  return new Blob([a], { type: "image/png" });
}
function art() {
  layout(
    color("color", "لون القلم", "#b5a2f1") +
      color("bg", "لون الخلفية", "#101827") +
      range("size", "سمك القلم", 1, 50, 6) +
      (id === "mandala" ? range("sym", "عدد المرايات", 2, 24, 8) : "") +
      '<button id="undo">ارجع خطوة</button><button id="clear">امسح</button><button id="download">نزّل PNG</button>',
    '<div id="surface"></div>',
  );
  let c = canvas(),
    g = c.getContext("2d"),
    down = false,
    last,
    history = [];
  function blank() {
    g.fillStyle = $("#bg").value;
    g.fillRect(0, 0, c.width, c.height);
  }
  blank();
  function snap() {
    history.push(g.getImageData(0, 0, c.width, c.height));
    if (history.length > 15) history.shift();
  }
  function point(e) {
    let r = c.getBoundingClientRect();
    return [
      ((e.clientX - r.left) * c.width) / r.width,
      ((e.clientY - r.top) * c.height) / r.height,
    ];
  }
  c.onpointerdown = (e) => {
    snap();
    down = true;
    last = point(e);
    c.setPointerCapture(e.pointerId);
    draw(e);
  };
  function draw(e) {
    if (!down) return;
    let p = point(e);
    g.strokeStyle = $("#color").value;
    g.lineWidth = +$("#size").value;
    g.lineCap = "round";
    if (id === "pixel-art") {
      let s = 24;
      g.fillStyle = $("#color").value;
      g.fillRect(Math.floor(p[0] / s) * s, Math.floor(p[1] / s) * s, s, s);
    } else {
      let n = id === "mandala" ? +$("#sym").value : 1;
      for (let k = 0; k < n; k++) {
        g.save();
        if (n > 1) {
          g.translate(c.width / 2, c.height / 2);
          g.rotate((k * Math.PI * 2) / n);
          g.beginPath();
          g.moveTo(last[0] - c.width / 2, last[1] - c.height / 2);
          g.lineTo(p[0] - c.width / 2, p[1] - c.height / 2);
        } else {
          g.beginPath();
          g.moveTo(...last);
          g.lineTo(...p);
        }
        g.stroke();
        g.restore();
      }
    }
    last = p;
  }
  c.onpointermove = draw;
  c.onpointerup = c.onpointercancel = () => (down = false);
  $("#undo").onclick = () => {
    if (history.length) g.putImageData(history.pop(), 0, 0);
  };
  $("#clear").onclick = () => {
    snap();
    blank();
  };
  $("#download").onclick = () => downloadCanvas(c);
  $("#bg").oninput = () => {
    snap();
    blank();
  };
}
function gradient() {
  layout(
    color("a", "أول لون", "#9479e8") +
      color("b", "تاني لون", "#68ccb7") +
      range("angle", "زاوية الميل", 0, 360, 125) +
      '<label>النوع<select id="kind"><option value="linear">خطّي</option><option value="radial">دايري</option><option value="conic">مخروطي</option></select></label><button id="copy">انسخ CSS</button>',
    '<div id="preview" style="height:350px;border-radius:20px"></div><pre id="css" dir="ltr" style="white-space:pre-wrap"></pre>',
  );
  let css;
  function draw() {
    let a = $("#a").value,
      b = $("#b").value,
      ang = $("#angle").value,
      k = $("#kind").value;
    css =
      k === "linear"
        ? `linear-gradient(${ang}deg,${a},${b})`
        : k === "radial"
          ? `radial-gradient(circle,${a},${b})`
          : `conic-gradient(from ${ang}deg,${a},${b},${a})`;
    $("#preview").style.background = css;
    $("#css").textContent = "background: " + css + ";";
  }
  document.querySelectorAll("input,select").forEach((e) => (e.oninput = draw));
  $("#copy").onclick = () =>
    navigator.clipboard
      .writeText("background: " + css + ";")
      .then(() => message("الكود اتنسخ."))
      .catch(() => message("انسخ الكود من المربع."));
  draw();
}
function palette() {
  layout(
    color("base", "اللون الأساسي", "#9f88d8") +
      '<label>التناسق<select id="scheme"><option value="30">ألوان قريبة</option><option value="72">خماسي</option><option value="180">لون ومكمّله</option></select></label><button id="random">ألوان جديدة</button><button id="download">نزّل الباليتة JSON</button>',
    '<div id="swatches" style="display:flex;gap:8px;flex-wrap:wrap"></div>',
  );
  let colors;
  function draw() {
    let hex = $("#base").value,
      r = parseInt(hex.slice(1, 3), 16) / 255,
      g = parseInt(hex.slice(3, 5), 16) / 255,
      b = parseInt(hex.slice(5), 16) / 255,
      max = Math.max(r, g, b),
      min = Math.min(r, g, b),
      d = max - min,
      h = !d
        ? 0
        : max === r
          ? ((g - b) / d + 6) % 6
          : max === g
            ? (b - r) / d + 2
            : (r - g) / d + 4;
    h *= 60;
    colors = Array.from(
      { length: 5 },
      (_, i) =>
        `hsl(${Math.round((h + i * +$("#scheme").value) % 360)} 60% ${40 + i * 6}%)`,
    );
    $("#swatches").replaceChildren(
      ...colors.map((c) => {
        let b = document.createElement("button");
        b.className = "swatch";
        b.style.background = c;
        b.textContent = c;
        b.onclick = () =>
          navigator.clipboard
            .writeText(c)
            .then(() => message("اللون اتنسخ."))
            .catch(() => message(c));
        return b;
      }),
    );
  }
  $("#base").oninput = $("#scheme").onchange = draw;
  $("#random").onclick = () => {
    $("#base").value =
      "#" +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0");
    draw();
  };
  $("#download").onclick = () =>
    saveFile(
      "palette.json",
      new Blob([JSON.stringify(colors, null, 2)], { type: "application/json" }),
    );
  draw();
}
function typography() {
  layout(
    '<label>الكلام<input id="text" value="أفكارك ليها شكل"></label><label>الخط<select id="font"><option>sans-serif</option><option>serif</option><option>monospace</option><option>cursive</option></select></label>' +
      color("ink", "لون الكلام", "#c9b6f2") +
      range("fontSize", "حجم الخط", 20, 130, 68) +
      range("spacing", "مسافة الحروف", 0, 20, 0) +
      '<button id="download">نزّل PNG</button>',
    '<div id="surface"></div>',
  );
  let c = canvas(),
    g = c.getContext("2d");
  function draw() {
    g.fillStyle = "#101827";
    g.fillRect(0, 0, 900, 560);
    g.fillStyle = $("#ink").value;
    g.font = `bold ${$("#fontSize").value}px ${$("#font").value}`;
    g.textAlign = "center";
    g.direction = "rtl";
    g.letterSpacing = $("#spacing").value + "px";
    g.fillText($("#text").value, 450, 290, 850);
  }
  document.querySelectorAll("input,select").forEach((e) => (e.oninput = draw));
  $("#download").onclick = () => downloadCanvas(c);
  draw();
}
function svg() {
  layout(
    '<label>الشكل<select id="shape"><option value="circle">دايرة</option><option value="rect">مربع</option><option value="polygon">مثلث</option></select></label>' +
      color("fill", "لون الشكل", "#b6a0ea") +
      color("stroke", "لون الإطار", "#7ecab7") +
      range("strokeWidth", "سمك الإطار", 0, 30, 8) +
      range("rotate", "اللفّة", 0, 360, 0) +
      '<button id="add">ضيف شكل</button><button id="undo">ارجع</button><button id="download">نزّل SVG</button>',
    '<div id="svg" style="max-width:650px;margin:auto"></div>',
  );
  let shapes = [];
  function draw() {
    let s = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400"><rect width="600" height="400" fill="#101827"/>${shapes.join("")}</svg>`;
    $("#svg").innerHTML = s;
    return s;
  }
  $("#add").onclick = () => {
    let x = 100 + Math.random() * 400,
      y = 90 + Math.random() * 220,
      k = $("#shape").value,
      p =
        k === "circle"
          ? `circle cx="${x}" cy="${y}" r="65"`
          : k === "rect"
            ? `rect x="${x - 60}" y="${y - 60}" width="120" height="120"`
            : `polygon points="${x},${y - 70} ${x - 65},${y + 50} ${x + 65},${y + 50}"`;
    shapes.push(
      `<${p} fill="${$("#fill").value}" stroke="${$("#stroke").value}" stroke-width="${+$("#strokeWidth").value}" transform="rotate(${+$("#rotate").value} ${x} ${y})"/>`,
    );
    draw();
  };
  $("#undo").onclick = () => {
    shapes.pop();
    draw();
  };
  $("#download").onclick = () =>
    saveFile("design.svg", new Blob([draw()], { type: "image/svg+xml" }));
  $("#add").click();
}
function particles() {
  layout(
    color("color", "لون النقط", "#b9a0ed") +
      range("count", "عدد النقط", 20, 300, 120) +
      range("speed", "سرعة الحركة", 0, 5, 1, 0.1) +
      '<button id="pause">وقّف الحركة</button><button id="download">نزّل لقطة</button>',
    '<div id="surface"></div><p>حرّك إيدك على الملعب عشان تجذب النقط.</p>',
  );
  let c = canvas(),
    g = c.getContext("2d"),
    pts = [],
    pause = false,
    live = true,
    at = null;
  function reset() {
    pts = Array.from({ length: +$("#count").value }, () => ({
      x: Math.random() * 900,
      y: Math.random() * 560,
      vx: Math.random() * 2 - 1,
      vy: Math.random() * 2 - 1,
    }));
  }
  $("#count").oninput = reset;
  $("#pause").onclick = () => {
    $("#pause").textContent = (pause = !pause) ? "كمّل الحركة" : "وقّف الحركة";
  };
  $("#download").onclick = () => downloadCanvas(c);
  c.onpointermove = (e) => {
    let r = c.getBoundingClientRect();
    at = [
      ((e.clientX - r.left) * 900) / r.width,
      ((e.clientY - r.top) * 560) / r.height,
    ];
  };
  c.onpointerleave = () => (at = null);
  function tick() {
    if (!live) return;
    if (!pause) {
      g.fillStyle = "#10182755";
      g.fillRect(0, 0, 900, 560);
      g.fillStyle = $("#color").value;
      for (let p of pts) {
        if (at) {
          p.vx += (at[0] - p.x) * 0.00008;
          p.vy += (at[1] - p.y) * 0.00008;
        }
        p.x = (p.x + p.vx * +$("#speed").value + 900) % 900;
        p.y = (p.y + p.vy * +$("#speed").value + 560) % 560;
        g.beginPath();
        g.arc(p.x, p.y, 2, 0, 7);
        g.fill();
      }
    }
    requestAnimationFrame(tick);
  }
  reset();
  tick();
  cleanup = () => (live = false);
}
function fractal() {
  layout(
    range("iterations", "درجة التفاصيل", 30, 250, 80) +
      '<button id="reset">رجّع المنظر</button><button id="download">نزّل الصورة</button>',
    '<div id="surface"></div><p>دوس في أي حتة عشان تقرّب عليها. رجّع المنظر عشان تبدأ تاني.</p>',
  );
  let c = canvas(700, 460),
    g = c.getContext("2d"),
    cx = -0.5,
    cy = 0,
    scale = 3.2;
  function draw() {
    let im = g.createImageData(700, 460),
      max = +$("#iterations").value;
    for (let y = 0; y < 460; y++)
      for (let x = 0; x < 700; x++) {
        let a = cx + (x / 700 - 0.5) * scale,
          b = cy + ((y / 460 - 0.5) * scale * 460) / 700,
          zr = 0,
          zi = 0,
          k = 0;
        while (zr * zr + zi * zi < 4 && k < max) {
          let t = zr * zr - zi * zi + a;
          zi = 2 * zr * zi + b;
          zr = t;
          k++;
        }
        let at = (y * 700 + x) * 4;
        im.data[at] = k === max ? 10 : (k * 7) % 255;
        im.data[at + 1] = k === max ? 15 : (k * 4) % 255;
        im.data[at + 2] = k === max ? 25 : 150 + (k % 100);
        im.data[at + 3] = 255;
      }
    g.putImageData(im, 0, 0);
  }
  c.onclick = (e) => {
    let r = c.getBoundingClientRect();
    cx += ((e.clientX - r.left) / r.width - 0.5) * scale;
    cy += (((e.clientY - r.top) / r.height - 0.5) * scale * 460) / 700;
    scale *= 0.5;
    draw();
    message("التقريب ×" + (3.2 / scale).toFixed(0));
  };
  $("#reset").onclick = () => {
    cx = -0.5;
    cy = 0;
    scale = 3.2;
    draw();
  };
  $("#iterations").oninput = draw;
  $("#download").onclick = () => downloadCanvas(c);
  draw();
}
function pattern() {
  layout(
    color("a", "لون النقشة", "#b5a1df") +
      color("b", "الخلفية", "#182538") +
      range("size", "حجم الوحدة", 15, 100, 45) +
      '<label>النوع<select id="kind"><option value="circles">دواير</option><option value="checks">شطرنج</option><option value="lines">خطوط</option></select></label><button id="download">نزّل PNG</button>',
    '<div id="surface"></div>',
  );
  let c = canvas(),
    g = c.getContext("2d");
  function draw() {
    g.fillStyle = $("#b").value;
    g.fillRect(0, 0, 900, 560);
    g.fillStyle = g.strokeStyle = $("#a").value;
    let s = +$("#size").value,
      k = $("#kind").value;
    for (let y = 0; y < 560; y += s)
      for (let x = 0; x < 900; x += s) {
        if (k === "circles") {
          g.beginPath();
          g.arc(x + s / 2, y + s / 2, s * 0.28, 0, 7);
          g.fill();
        } else if (k === "checks") {
          if ((x / s + y / s) % 2 === 0) g.fillRect(x, y, s, s);
        } else {
          g.lineWidth = 3;
          g.beginPath();
          g.moveTo(x, y + s);
          g.lineTo(x + s, y);
          g.stroke();
        }
      }
  }
  document.querySelectorAll("input,select").forEach((e) => (e.oninput = draw));
  $("#download").onclick = () => downloadCanvas(c);
  draw();
}
async function audioContext() {
  ctx ??= new (window.AudioContext || window.webkitAudioContext)();
  await ctx.resume();
  if (ctx.state !== "running")
    throw Error("الصوت لسه مقفول من المتصفح. دوس تشغيل تاني.");
  return ctx;
}
function noise() {
  layout(
    '<button class="primary" id="play">شغّل الضوضاء</button>' +
      range("white", "ضوضاء بيضا", 0, 1, 0.15, 0.01) +
      range("pink", "ضوضاء وردية", 0, 1, 0, 0.01) +
      range("brown", "ضوضاء بنيّة", 0, 1, 0, 0.01) +
      range("volume", "الصوت العام", 0, 0.6, 0.25, 0.01) +
      '<label>مؤقت إيقاف<select id="sleep"><option value="0">من غير مؤقت</option><option value="5">٥ دقايق</option><option value="15">ربع ساعة</option><option value="30">نص ساعة</option></select></label>',
    '<div class="pad"><h2>صوت ثابت يساعدك تفصل</h2><p>ابدأ بصوت واطي. الصوت بيتولد على جهازك، من غير ميكروفون ولا ملفات خارجية. متصفح الموبايل ممكن يوقفه لما تقفل الشاشة.</p><div id="meter" style="height:18px;background:linear-gradient(90deg,#9bd6c8,#baa0eb);width:0;border-radius:9px"></div></div>',
  );
  let nodes = [],
    gains = {},
    master,
    playing = false,
    stopTimer;
  function stop() {
    nodes.forEach((n) => {
      try {
        n.stop();
      } catch {}
    });
    nodes = [];
    clearTimeout(stopTimer);
    playing = false;
    $("#play").textContent = "شغّل الضوضاء";
    $("#meter").style.width = "0";
    message("الصوت واقف.");
  }
  function levels() {
    if (!master) return;
    master.gain.setTargetAtTime(+$("#volume").value, ctx.currentTime, 0.03);
    for (let type of ["white", "pink", "brown"])
      gains[type]?.gain.setTargetAtTime(
        +$("#" + type).value,
        ctx.currentTime,
        0.03,
      );
    $("#meter").style.width = playing
      ? Math.min(
          1,
          +$("#white").value + +$("#pink").value + +$("#brown").value,
        ) *
          100 +
        "%"
      : "0";
  }
  $("#play").onclick = async () => {
    if (playing) return stop();
    try {
      await audioContext();
      master = ctx.createGain();
      master.connect(ctx.destination);
      for (let type of ["white", "pink", "brown"]) {
        let buffer = ctx.createBuffer(1, ctx.sampleRate * 4, ctx.sampleRate),
          a = buffer.getChannelData(0),
          last = 0,
          b0 = 0,
          b1 = 0,
          b2 = 0;
        for (let i = 0; i < a.length; i++) {
          let w = Math.random() * 2 - 1;
          if (type === "brown") {
            last = (last + 0.02 * w) / 1.02;
            a[i] = last * 3.5;
          } else if (type === "pink") {
            b0 = 0.99765 * b0 + w * 0.099046;
            b1 = 0.963 * b1 + w * 0.2965164;
            b2 = 0.57 * b2 + w * 1.0526913;
            a[i] = (b0 + b1 + b2 + w * 0.1848) * 0.05;
          } else a[i] = w * 0.3;
        }
        let source = ctx.createBufferSource(),
          gain = ctx.createGain();
        source.buffer = buffer;
        source.loop = true;
        source.connect(gain);
        gain.connect(master);
        gains[type] = gain;
        source.start();
        nodes.push(source);
      }
      playing = true;
      $("#play").textContent = "وقّف الصوت";
      levels();
      schedule();
      message(
        "الصوت شغّال. لو مش سامعه، ارفع صوت الجهاز واتأكد إن التبويب مش مكتوم.",
      );
    } catch (e) {
      stop();
      message(e.message);
    }
  };
  function schedule() {
    clearTimeout(stopTimer);
    if (playing && +$("#sleep").value)
      stopTimer = setTimeout(stop, +$("#sleep").value * 60000);
  }
  $("#sleep").onchange = schedule;
  document.querySelectorAll("input").forEach((e) => (e.oninput = levels));
  cleanup = stop;
}
function visualizer() {
  layout(
    '<label>افتح ملف صوت<input id="file" type="file" accept="audio/*"></label><button class="primary" id="play">شغّل / وقّف</button>' +
      color("color", "لون الموجة", "#b6a0ef"),
    ' <audio id="audio" controls style="width:100%"></audio><div id="surface"></div><p>الملف بيفضل على جهازك. مش بنرفع حاجة، ومش بنطلب الميكروفون.</p>',
  );
  let c = canvas(),
    g = c.getContext("2d"),
    audio = $("#audio"),
    analyser,
    source,
    url,
    live = true;
  $("#file").onchange = () => {
    let f = $("#file").files[0];
    if (!f) return;
    if (url) URL.revokeObjectURL(url);
    url = URL.createObjectURL(f);
    audio.src = url;
    message("الملف جاهز. دوس تشغيل.");
  };
  $("#play").onclick = async () => {
    if (!audio.src) return message("اختار ملف صوت الأول.");
    try {
      await setup();
      if (audio.paused) await audio.play();
      else audio.pause();
    } catch (e) {
      message("الملف ده مش مدعوم أو المتصفح مانع تشغيله. جرّب MP3.");
    }
  };
  async function setup() {
    await audioContext();
    if (!source) {
      source = ctx.createMediaElementSource(audio);
      analyser = ctx.createAnalyser();
      analyser.fftSize = 512;
      source.connect(analyser);
      analyser.connect(ctx.destination);
    }
  }
  audio.onplay = () => setup().catch((e) => message(e.message));
  function tick() {
    if (!live) return;
    g.fillStyle = "#101827";
    g.fillRect(0, 0, 900, 560);
    if (analyser) {
      let a = new Uint8Array(analyser.frequencyBinCount);
      analyser.getByteFrequencyData(a);
      g.fillStyle = $("#color").value;
      for (let i = 0; i < a.length; i++)
        g.fillRect(
          (i * 900) / a.length,
          560 - a[i] * 2,
          900 / a.length - 1,
          a[i] * 2,
        );
    }
    requestAnimationFrame(tick);
  }
  tick();
  cleanup = () => {
    live = false;
    audio.pause();
    if (url) URL.revokeObjectURL(url);
  };
}
function drums() {
  layout(
    '<button class="primary" id="play">شغّل الإيقاع</button>' +
      range("tempo", "سرعة الإيقاع", 50, 200, 100) +
      '<button id="save">احفظ</button><button id="load">افتح المحفوظ</button><button id="clear">امسح</button>',
    '<div id="steps" style="overflow:auto"></div><p>كل سطر صوت مختلف، وكل عمود خطوة. دوس على الخانات عشان تغيّر الإيقاع.</p>',
  );
  let names = ["باص", "سنير", "هاي هات"],
    pat = Array.from({ length: 3 }, (_, r) =>
      Array.from({ length: 16 }, (_, i) =>
        r === 0 ? i % 4 === 0 : r === 1 ? i % 8 === 4 : i % 2 === 0,
      ),
    ),
    playing = false,
    step = 0,
    timer;
  function draw() {
    $("#steps").innerHTML = pat
      .map(
        (row, r) =>
          `<div style="display:grid;grid-template-columns:80px repeat(16,32px);gap:5px;margin:9px 0;direction:ltr"><span>${names[r]}</span>${row.map((v, i) => `<button aria-label="${names[r]} خطوة ${i + 1}" aria-pressed="${v}" data-r="${r}" data-i="${i}" style="padding:0;height:36px;background:${v ? "#99cbbd" : "#222b3c"};border:2px solid ${playing && i === step ? "#f4bd79" : "transparent"}"></button>`).join("")}</div>`,
      )
      .join("");
    document.querySelectorAll("[data-r]").forEach(
      (b) =>
        (b.onclick = () => {
          let r = +b.dataset.r,
            i = +b.dataset.i;
          pat[r][i] = !pat[r][i];
          if (pat[r][i]) audioContext().then(() => hit(r));
          draw();
        }),
    );
  }
  function hit(r) {
    let now = ctx.currentTime,
      g = ctx.createGain();
    g.connect(ctx.destination);
    g.gain.setValueAtTime(0.18, now);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
    if (r === 0) {
      let o = ctx.createOscillator();
      o.frequency.setValueAtTime(150, now);
      o.frequency.exponentialRampToValueAtTime(40, now + 0.15);
      o.connect(g);
      o.start();
      o.stop(now + 0.18);
    } else {
      let b = ctx.createBuffer(1, ctx.sampleRate * 0.17, ctx.sampleRate),
        a = b.getChannelData(0);
      for (let i = 0; i < a.length; i++) a[i] = Math.random() * 2 - 1;
      let s = ctx.createBufferSource(),
        f = ctx.createBiquadFilter();
      f.type = "highpass";
      f.frequency.value = r === 2 ? 7000 : 1000;
      s.buffer = b;
      s.connect(f);
      f.connect(g);
      s.start();
    }
  }
  function pulse() {
    pat.forEach((r, i) => {
      if (r[step]) hit(i);
    });
    draw();
    step = (step + 1) % 16;
    timer = setTimeout(pulse, 60000 / +$("#tempo").value / 4);
  }
  $("#play").onclick = async () => {
    if (playing) {
      playing = false;
      clearTimeout(timer);
      $("#play").textContent = "شغّل الإيقاع";
      return draw();
    }
    try {
      await audioContext();
      playing = true;
      step = 0;
      $("#play").textContent = "وقّف";
      pulse();
    } catch (e) {
      message(e.message);
    }
  };
  $("#save").onclick = () => {
    localStorage.setItem("drums", JSON.stringify(pat));
    message("الإيقاع اتحفظ على الجهاز ده.");
  };
  $("#load").onclick = () => {
    try {
      let p = JSON.parse(localStorage.getItem("drums"));
      if (
        !Array.isArray(p) ||
        p.length !== 3 ||
        !p.every((r) => Array.isArray(r) && r.length === 16)
      )
        throw 0;
      pat = p;
      draw();
    } catch {
      message("مفيش إيقاع محفوظ سليم.");
    }
  };
  $("#clear").onclick = () => {
    pat = pat.map((r) => r.map(() => false));
    draw();
  };
  cleanup = () => {
    clearTimeout(timer);
    playing = false;
  };
  draw();
}
({
  "drawing-board": art,
  "pixel-art": art,
  mandala: art,
  "gradient-lab": gradient,
  "palette-lab": palette,
  "type-studio": typography,
  "svg-studio": svg,
  "particle-lab": particles,
  "fractal-lab": fractal,
  "pattern-lab": pattern,
  "noise-maker": noise,
  "audio-visualizer": visualizer,
  "drum-machine": drums,
})[id]();
window.addEventListener("pagehide", () => {
  cleanup();
  ctx?.close();
});
