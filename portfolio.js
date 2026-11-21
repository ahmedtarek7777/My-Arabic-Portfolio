const coverCopy = {
  "paper-trade": [
    "بورصة",
    "من غير مخاطرة",
    "جرّب واتعلم / الفلوس هنا للتجربة"
  ],
  "arcade": [
    "خد بريك.",
    "والعب شوية.",
    "خمس ألعاب / تحدّى نفسك"
  ],
  "shop-lane": [
    "كل اللي",
    "يظبّط يومك",
    "564 منتج منزلي وتقني / تعالى شوف"
  ],
  "taskly": [
    "خلّص اللي وراك",
    "واحدة واحدة",
    "يوم أهدى / مهام أوضح"
  ],
  "weather-now": [
    "الجو عندك",
    "عامل إيه؟",
    "من مصر لآخر الدنيا / بيانات مباشرة"
  ],
  "cafe-landing": [
    "قعدة رايقة.",
    "وقهوة مظبوطة.",
    "افصل شوية / إمبر آند أوك"
  ],
  "flow-board": [
    "عندك فكرة؟",
    "تعالى نرتّبها.",
    "من أول فكرة / لحد آخر خطوة"
  ],
  "budget-lab": [
    "فلوسك رايحة",
    "فين؟",
    "احسبها صح / وخلّي بالك من مصاريفك"
  ],
  "invoice-studio": [
    "شغلك خلص؟",
    "دي فاتورته.",
    "تفاصيل واضحة / وشكل متظبّط"
  ],
  "ink-notes": [
    "فكرة جتلك؟",
    "اكتبها هنا.",
    "متسيبش فكرة حلوة تطير"
  ],
  "habit-garden": [
    "حاجة صغيرة.",
    "كل يوم.",
    "خطوة ورا خطوة / هتشوف الفرق"
  ],
  "focus-room": [
    "سيب الدوشة.",
    "وركّز شوية.",
    "حاجة واحدة دلوقتي / والباقي بعدين"
  ],
  "calendar-studio": [
    "رتّب يومك.",
    "وريّح دماغك.",
    "كل ميعاد / في مكانه"
  ],
  "split-bills": [
    "الحساب واضح.",
    "واللمة أحلى.",
    "مين دفع كام؟ / نحسبها سوا"
  ],
  "client-desk": [
    "كل عميل.",
    "وكل تفصيلة.",
    "الشغل أريح / لما يبقى مترتّب"
  ],
  "stock-room": [
    "عندك إيه؟",
    "وناقصك إيه؟",
    "شوف اللي دخل / واللي طلع"
  ],
  "route-book": [
    "نفسك تروح",
    "فين المرة دي؟",
    "خطط للرحلة / وسيب مكان للمفاجآت"
  ],
  "meal-studio": [
    "هناكل إيه",
    "الأسبوع ده؟",
    "شوية تخطيط / وأكل على مزاجك"
  ],
  "workout-log": [
    "اتمرّن. سجّل.",
    "وشوف الفرق.",
    "على مهلك / المهم تكمّل"
  ],
  "quiz-academy": [
    "فاهمها؟",
    "تعالى نجرّب.",
    "اسأل نفسك / واتعلم حاجة جديدة"
  ],
  "sound-lab": [
    "جرّب نغمة.",
    "واعمل لحنك.",
    "الإيقاع في إيدك / اسمع وجرّب"
  ],
  "image-studio": [
    "صورتك.",
    "بمزاجك.",
    "شوية تعديل / وفرق كبير"
  ],
  "pathfinder": [
    "أنهي طريق",
    "يوصّل أسرع؟",
    "حط حواجز / وشوف الحل"
  ],
  "type-racer": [
    "بتكتب بسرعة",
    "قد إيه؟",
    "كل حرف بيفرق / جرّب نفسك"
  ],
  "data-lens": [
    "وراء كل رقم",
    "حكاية.",
    "خلّي البيانات / توضح الصورة"
  ]
};
let projects = [];
const $ = (s) => document.querySelector(s),
  $$ = (s) => [...document.querySelectorAll(s)];
let category = "الكل";
function settings() {
  let s;
  try {
    s = JSON.parse(localStorage.getItem("arabic-ahmed-settings")) || {};
  } catch {
    s = {};
  }
  $("#appearance").value = s.appearance || "dark";
  $("#accent").value = s.accent || "#bca0f5";
  $("#motion").checked = !!s.motion;
  $("#layout").value = s.layout || "grid";
  apply();
}
function apply() {
  let s = {
    appearance: $("#appearance").value,
    accent: $("#accent").value,
    motion: $("#motion").checked,
    layout: $("#layout").value,
  };
  document.body.classList.toggle("light", s.appearance === "light");
  document.body.classList.toggle("reduced", s.motion);
  document.body.classList.toggle("compact", s.layout === "list");
  document.documentElement.style.setProperty("--accent", s.accent);
  localStorage.setItem("arabic-ahmed-settings", JSON.stringify(s));
}
$("#settingsButton").onclick = () => {
  let open = $("#settings").hidden;
  $("#settings").hidden = !open;
  $("#settingsButton").setAttribute("aria-expanded", open);
};
$$("#settings input,#settings select").forEach((x) => (x.onchange = apply));
$("#resetSettings").onclick = () => {
  localStorage.removeItem("arabic-ahmed-settings");
  settings();
};
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    $("#settings").hidden = true;
    $("#settingsButton").setAttribute("aria-expanded", "false");
  }
});
function render() {
  let q = $("#search").value.toLowerCase();
  let list = projects.filter(
    (p) =>
      (category === "الكل" || p[2] === category) &&
      p.join(" ").toLowerCase().includes(q),
  );
  $("#projectCount").textContent =
    `${String(list.length).padStart(2, "0")} مشروعًا / صُممت للتجربة`;
  $("#projects").innerHTML =
    list
      .map((p) => {
        let i = projects.indexOf(p);
        return `<a class="project" href="${p[0]}/${p[0] === "shop-lane" ? "?v=5" : ""}" style="--c:${p[5]}"><div class="cover"><span class="coverNumber">تجربة ${String(i + 1).padStart(2, "0")}</span><span class="coverArrow">↗</span><img class="coverPhoto" src="assets/covers/${p[0]}.webp" alt="${coverCopy[p[0]][2]} صورة تعبيرية" loading="lazy" width="1200" height="760"><div class="coverShade"></div><div class="coverWords"><span>${coverCopy[p[0]][2]}</span><strong>${coverCopy[p[0]][0]}<br>${coverCopy[p[0]][1]}</strong></div><span class="coverSymbol">${p[4]}</span></div><div class="projectmeta"><h3>${p[1]}</h3><span>${p[2]}</span></div><p>${p[3]}</p></a>`;
      })
      .join("") || "<p>No projects match. Try another search.</p>";
}
fetch("projects.json", { cache: "no-store" })
  .then((r) => r.json())
  .then((p) => {
    projects = p;
    $("#filters").innerHTML = ["الكل", ...new Set(p.map((x) => x[2]))]
      .map(
        (c) => `<button class="${c === "الكل" ? "active" : ""}">${c}</button>`,
      )
      .join("");
    $$("#filters button").forEach(
      (b) =>
        (b.onclick = () => {
          category = b.textContent;
          $$("#filters button").forEach((x) =>
            x.classList.toggle("active", x === b),
          );
          render();
        }),
    );
    render();
  })
  .catch(
    () =>
      ($("#projects").textContent =
        "Could not load the gallery. Please refresh."),
  );
$("#search").oninput = render;
settings();
