const coverCopy = {
  "paper-trade": ["بورصة", "من غير مخاطرة", "جرّب واتعلم / الفلوس هنا للتجربة"],
  arcade: ["خد بريك.", "والعب شوية.", "خمس ألعاب / تحدّى نفسك"],
  "shop-lane": ["كل اللي", "يظبّط يومك", "٥٠ ألف سجل / سوبر ماركت وتقنية ومنزل"],
  taskly: ["خلّص اللي وراك", "واحدة واحدة", "يوم أهدى / مهام أوضح"],
  "weather-now": [
    "الجو عندك",
    "عامل إيه؟",
    "من مصر لآخر الدنيا / بيانات مباشرة",
  ],
  "cafe-landing": ["قعدة رايقة.", "وقهوة مظبوطة.", "افصل شوية / إمبر آند أوك"],
  "flow-board": ["عندك فكرة؟", "تعالى نرتّبها.", "من أول فكرة / لحد آخر خطوة"],
  "budget-lab": ["فلوسك رايحة", "فين؟", "احسبها صح / وخلّي بالك من مصاريفك"],
  "invoice-studio": ["شغلك خلص؟", "دي فاتورته.", "تفاصيل واضحة / وشكل متظبّط"],
  "ink-notes": ["فكرة جتلك؟", "اكتبها هنا.", "متسيبش فكرة حلوة تطير"],
  "habit-garden": ["حاجة صغيرة.", "كل يوم.", "خطوة ورا خطوة / هتشوف الفرق"],
  "focus-room": [
    "سيب الدوشة.",
    "وركّز شوية.",
    "حاجة واحدة دلوقتي / والباقي بعدين",
  ],
  "calendar-studio": ["رتّب يومك.", "وريّح دماغك.", "كل ميعاد / في مكانه"],
  "split-bills": ["الحساب واضح.", "واللمة أحلى.", "مين دفع كام؟ / نحسبها سوا"],
  "client-desk": ["كل عميل.", "وكل تفصيلة.", "الشغل أريح / لما يبقى مترتّب"],
  "stock-room": ["عندك إيه؟", "وناقصك إيه؟", "شوف اللي دخل / واللي طلع"],
  "route-book": [
    "نفسك تروح",
    "فين المرة دي؟",
    "خطط للرحلة / وسيب مكان للمفاجآت",
  ],
  "meal-studio": ["هناكل إيه", "الأسبوع ده؟", "شوية تخطيط / وأكل على مزاجك"],
  "workout-log": ["اتمرّن. سجّل.", "وشوف الفرق.", "على مهلك / المهم تكمّل"],
  "quiz-academy": ["فاهمها؟", "تعالى نجرّب.", "اسأل نفسك / واتعلم حاجة جديدة"],
  "sound-lab": ["جرّب نغمة.", "واعمل لحنك.", "الإيقاع في إيدك / اسمع وجرّب"],
  "image-studio": ["صورتك.", "بمزاجك.", "شوية تعديل / وفرق كبير"],
  pathfinder: ["أنهي طريق", "يوصّل أسرع؟", "حط حواجز / وشوف الحل"],
  "type-racer": ["بتكتب بسرعة", "قد إيه؟", "كل حرف بيفرق / جرّب نفسك"],
  "data-lens": ["وراء كل رقم", "حكاية.", "خلّي البيانات / توضح الصورة"],
};

Object.assign(coverCopy, {"snake": ["لفّ ودوّر.", "وكُل النقطة.", "ألعاب"], "mines": ["فكّر بهدوء.", "اختار بأمان.", "ألعاب"], "connect-four": ["أربع قطع.", "خطوة للفوز.", "ألعاب"], "breakout": ["اكسر الحواجز.", "كمّل اللعب.", "ألعاب"], "sudoku": ["رقم ورا رقم.", "الحل عندك.", "ألعاب"], "sliding-puzzle": ["حرّك قطعة.", "رتّب الصورة.", "ألعاب"], "word-guess": ["حرف صغير.", "يفتح كلمة.", "ألعاب"], "lights-out": ["اطفي النور.", "شغّل تفكيرك.", "ألعاب"], "simon": ["اسمع. افتكر.", "وكرّر الترتيب.", "ألعاب"], "maze-run": ["كل لفة.", "ليها مخرج.", "ألعاب"], "pong": ["ردّ الكورة.", "واكسب النقطة.", "ألعاب"], "sky-hop": ["نطّة كمان.", "وفوق السحاب.", "ألعاب"], "whack": ["ركّز بسرعة.", "والحق الهدف.", "ألعاب"], "math-duel": ["احسبها صح.", "واسبق الوقت.", "ألعاب"], "drawing-board": ["أول خط.", "وألف فكرة.", "إبداع"], "pixel-art": ["بكسل صغير.", "وعالم كامل.", "إبداع"], "gradient-lab": ["لون بيدوّب.", "في لون.", "إبداع"], "palette-lab": ["ألوانك.", "على مزاجك.", "إبداع"], "type-studio": ["حروف بسيطة.", "وشخصية مختلفة.", "إبداع"], "svg-studio": ["من شكل صغير.", "لفكرة كبيرة.", "إبداع"], "particle-lab": ["حركة خفيفة.", "وعالم بيتغيّر.", "إبداع"], "fractal-lab": ["نمط بيتكرر.", "لحد ما يبهرك.", "إبداع"], "mandala": ["لفة ورا لفة.", "رسمة بتكمل.", "إبداع"], "audio-visualizer": ["اسمع اللون.", "وشوف الإيقاع.", "إبداع"], "noise-maker": ["سيب الدوشة.", "واسمع الهدوء.", "إبداع"], "drum-machine": ["دقّة منك.", "وإيقاع جديد.", "إبداع"], "pattern-lab": ["فكرة واحدة.", "وألف تكرار.", "إبداع"], "translator": ["كلمة منك.", "بعشرين لغة.", "أدوات"], "code-studio": ["اكتب. جرّب.", "وشوف كودك.", "أدوات"], "site-assistant": ["عندك سؤال؟", "اسأل عن الموقع.", "أدوات"]});
const searchAliases = {"paper-trade": ["بورصة نوفا", "مال وأعمال", "اتعلّم التداول وتابع محفظتك في بورصة تجريبية، من غير فلوس حقيقية.", "NOVA Exchange", "Finance", "Paper trading, portfolio analytics and a simulated market."], "arcade": ["ساحة الألعاب", "ألعاب", "خمس ألعاب سريعة، ونتايجك بتتحفظ عشان تتحدى نفسك كل مرة.", "PLAY / LAB", "Games", "Five games, personal bests and instant play."], "shop-lane": ["السوق المصري", "متاجر", "٥٠ ألف سجل منتج: سوبر ماركت وتقنية ومنزل، بمصادر واضحة وأسعار تجريبية بالجنيه.", "Shop Lane", "Commerce", "50,000 sourced product records across supermarket, technology and home, with demo EGP prices."], "taskly": ["مهامي", "إنتاجية", "رتّب مهامك واسحبها بالترتيب اللي يناسبك، مع وضع فاتح وغامق.", "Taskly", "Productivity", "Plan your day with drag-and-drop tasks and dark mode."], "weather-now": ["الطقس الآن", "أدوات", "اعرف الجو دلوقتي وفي الأيام الجاية، وابحث عن مدن من كل حتة في العالم.", "Weather Now", "Tools", "City search, live conditions and a five-day forecast."], "cafe-landing": ["مقهى إمبر آند أوك", "تجارب", "خد لفة في كافيه متخيّل، وشوف المنيو وجرّب نموذج الحجز من غير حجز حقيقي.", "Ember & Oak", "Experiences", "An atmospheric cafe concept and local demo booking."], "flow-board": ["لوحة المشروعات", "إنتاجية", "قسّم شغلك لمراحل، وحدد الأولويات، وانقل الكروت وخد نسخة من خطتك.", "Flow Board", "Productivity", "A project board with priorities, search, movable cards and JSON backup."], "budget-lab": ["مختبر الميزانية", "مال وأعمال", "سجّل دخلك ومصاريفك، وحدد ميزانية لكل حاجة وشوف الأرقام قدامك.", "Budget Lab", "Finance", "Income, expenses, category budgets, charts and transaction exports."], "invoice-studio": ["استوديو الفواتير", "أعمال", "اعمل فاتورة ببنود وضريبة وخصم، واحفظها أو اطبعها لما تخلص.", "Invoice Studio", "Business", "Editable line items, tax, discounts, saved drafts and print-ready invoices."], "ink-notes": ["دفتر أفكاري", "إنتاجية", "لمّ أفكارك في نوتس، وصنّفها بتاجات ودوّر فيها وقت ما تحتاج.", "Ink Notes", "Productivity", "A searchable notebook with tags, safe Markdown preview and export."], "habit-garden": ["حديقة العادات", "حياة يومية", "تابع عاداتك يوم بيوم، وشوف التزامك وتقدّمك على مدار الأسبوع.", "Habit Garden", "Lifestyle", "Habit tracking with weekly history, streaks and completion analytics."], "focus-room": ["غرفة التركيز", "إنتاجية", "ظبّط وقت التركيز والراحة، وحط مهامك قدامك وسجّل جلساتك.", "Focus Room", "Productivity", "A configurable focus timer with breaks, task queue and session log."], "calendar-studio": ["تقويم أيامي", "إنتاجية", "رتّب مواعيدك على تقويم، وعدّلها أو نزّلها عشان تضيفها لتقويمك.", "Daylight Calendar", "Productivity", "Monthly planning with event editing, reminders on the page and ICS export."], "split-bills": ["قسمة عادلة", "مال وأعمال", "اكتب مين دفع كام، واقسم الحساب واعرف مين عليه لمين.", "Fair Share", "Finance", "Group expenses, equal splits, net balances and simplified settlements."], "client-desk": ["إدارة العملاء", "أعمال", "احفظ بيانات العملاء والملاحظات، وتابع كل صفقة وصلت لفين.", "Client Desk", "Business", "A local CRM with contacts, deal stages, notes, search and pipeline value."], "stock-room": ["المخزن", "أعمال", "تابع المنتجات وحركة المخزون، وخد بالك من اللي قرب يخلص.", "Stock Room", "Business", "Inventory with real product imagery, stock movements, low-stock flags and search."], "route-book": ["دفتر الرحلات", "حياة يومية", "خطط أيام الرحلة وميزانيتها، وجهّز قائمة الشنطة وخد خطتك معاك.", "Route Book", "Lifestyle", "A multi-day itinerary builder with budgets, packing and trip exports."], "meal-studio": ["مخطط الوجبات", "حياة يومية", "اختار وصفات، وظبّط عدد الأفراد، وطلّع خطة أكل وقايمة مشتريات.", "Meal Studio", "Lifestyle", "Recipe search, serving scaling, a weekly meal plan and shopping list."], "workout-log": ["سجل التمارين", "حياة يومية", "سجّل التمارين والمجموعات والأوزان، وشوف مستواك بيتحسن إزاي.", "Rep Studio", "Lifestyle", "Workout sessions, exercise sets, training volume and personal records."], "quiz-academy": ["أكاديمية الأسئلة", "تعلّم", "جرّب معلوماتك، وافهم الإجابات وراجع تقدّمك بعد كل محاولة.", "Quiz Academy", "Learning", "Topic quizzes with explanations, review mode and progress history."], "sound-lab": ["مختبر الصوت", "إبداع", "اعمل أصوات ونغمات من المتصفح، وظبّط الإيقاع واحفظ اللحن.", "Sound Lab", "Creative", "A browser synthesizer and step sequencer with tempo, waveforms and pattern storage."], "image-studio": ["استوديو الصور", "إبداع", "عدّل الإضاءة والألوان والحجم والاتجاه، ونزّل الصورة من غير ما ترفعها لسيرفر.", "Pixel Studio", "Creative", "Private image editing with filters, rotation, resizing and PNG export."], "pathfinder": ["مكتشف المسارات", "تعلّم", "جرّب خوارزميات المسارات، وحط حواجز وأوزان وشوفها بتوصل إزاي.", "Pathfinder", "Learning", "Interactive BFS and Dijkstra pathfinding with walls, weights and animation."], "type-racer": ["سباق الكتابة", "تعلّم", "اختبر سرعتك ودقتك في الكتابة، وتابع أحسن نتايجك مع الوقت.", "Type Racer", "Learning", "Timed typing practice with live accuracy, WPM, progress and personal history."], "data-lens": ["عدسة البيانات", "أعمال", "افتح ملف CSV، ورتّب البيانات واعمل ملخصات ورسوم ونزّل النتيجة.", "Data Lens", "Business", "CSV import, numeric summaries, sortable tables, category charts and export."], "snake": ["الثعبان", "التعبان", "ألعاب", "لمّ الأكل وخلي بالك متخبطش في نفسك.", "Snake", "Games", "Collect food with the arrow keys or movement buttons, and avoid the walls and your own tail."], "mines": ["كاسحة الألغام", "ألعاب", "استخدم الأرقام واكشف المربعات الآمنة.", "Minesweeper", "Games", "Use the numbers to reveal safe squares and avoid the mines."], "connect-four": ["أربعة على خط", "ألعاب", "العب مع صاحبك، أول أربعة جنب بعض يكسبوا.", "Connect Four", "Games", "Play with a friend on the same device. The first player to connect four pieces wins."], "breakout": ["كسّر الطوب", "ألعاب", "حرّك المضرب وكسّر كل الطوب.", "Breakout", "Games", "Move the paddle and break every brick."], "sudoku": ["سودوكو", "ألعاب", "كمّل الأرقام من ١ لـ٤ من غير تكرار.", "Mini Sudoku", "Games", "Fill the grid with 1 through 4 without repeating a number in any row, column, or box."], "sliding-puzzle": ["رتّب الصورة", "ألعاب", "حرّك البلاطات لحد ما الأرقام تترتب.", "Sliding Number Puzzle", "Games", "Slide the tiles until the numbers are in order."], "word-guess": ["خمّن الكلمة", "ألعاب", "الحق الكلمة قبل ما المحاولات تخلص.", "Word Guess", "Games", "Guess the hidden word before you run out of tries."], "lights-out": ["طفي الأنوار", "ألعاب", "دوس على المربعات وطفي اللوحة كلها.", "Lights Out", "Games", "Tap the squares to switch off the entire board."], "simon": ["افتكر اللحن", "ألعاب", "اسمع وشوف الترتيب وكرره صح.", "Simon Says", "Games", "Watch and listen to the sequence, then repeat it."], "maze-run": ["متاهة", "ألعاب", "وصّل للنهاية من غير ما تعدّي الحيطان.", "Maze Run", "Games", "Find your way to the exit without crossing the walls."], "pong": ["بينج بونج", "ألعاب", "اتحدى الكمبيوتر بالمضرب والكرة.", "Pong", "Games", "Challenge the computer with a paddle and ball."], "sky-hop": ["نطّة في السما", "ألعاب", "عدّي بين العواميد وحافظ على ارتفاعك.", "Sky Hop", "Games", "Fly between the columns and keep your height under control."], "whack": ["الحق الدائرة", "ألعاب", "اضغط الهدف قبل ما يختفي واجمع نقط.", "Whack-a-Target", "Games", "Tap the target before it moves and rack up points."], "math-duel": ["تحدي الحساب", "ألعاب", "حل أكبر عدد من المسائل قبل الوقت.", "Math Duel", "Games", "Solve as many math problems as you can before time runs out."], "drawing-board": ["كراسة رسم", "إبداع", "ارسم باللمس أو الماوس، وارجع خطوة ونزّل رسمتك.", "Drawing Board", "Creative", "Draw with touch or a mouse, undo a stroke, and download your artwork."], "pixel-art": ["فن البكسل", "إبداع", "لوّن مربعات صغيرة واعمل رسمة بكسل.", "Pixel Art", "Creative", "Color small squares to create a pixel-art drawing."], "gradient-lab": ["معمل التدرجات", "إبداع", "ركّب ألوان التدرج وخد كود CSS.", "Gradient Lab", "Creative", "Combine gradient colors and copy the CSS code."], "palette-lab": ["ألوان على مزاجك", "إبداع", "كوّن باليتة متناسقة واحفظ ألوانك.", "Color Palette Lab", "Creative", "Build a harmonious color palette and save your colors."], "type-studio": ["ورشة الخطوط", "إبداع", "جرّب الخطوط والمسافات ونزّل تصميمك.", "Typography Studio", "Creative", "Try different fonts and spacing, then download your design."], "svg-studio": ["ورشة الأشكال", "إبداع", "اعمل أشكال فيكتور ونزّل SVG.", "Shape Studio", "Creative", "Create vector shapes and download them as an SVG."], "particle-lab": ["لعب بالنقط", "إبداع", "غيّر الحركة والجاذبية وشوف النقط بترقص.", "Particle Playground", "Creative", "Adjust the motion and attraction to make the particles dance."], "fractal-lab": ["عوالم كسورية", "إبداع", "قرّب من مجموعة ماندلبرو واكتشف تفاصيلها.", "Fractal Lab", "Creative", "Zoom into the Mandelbrot set and explore its details."], "mandala": ["رسمة مراية", "إبداع", "ارسم بنظام التناظر وطلّع ماندالا.", "Mandala Drawing", "Creative", "Draw with radial symmetry to create a mandala."], "audio-visualizer": ["شوف الصوت", "إبداع", "افتح ملف صوت من جهازك وشوف تردده بيتحرّك.", "Audio Visualizer", "Creative", "Open an audio file from your device and watch its frequencies move."], "noise-maker": ["صنع الضوضاء", "إبداع", "امزج ضوضاء بيضا ووردية وبنيّة للتركيز.", "Noise Maker", "Creative", "Mix white, pink, and brown noise for a focused listening session."], "drum-machine": ["ورشة الإيقاع", "إبداع", "ركّب درامز على ١٦ خطوة واحفظ إيقاعك.", "Drum Machine", "Creative", "Arrange drum sounds across 16 steps and save your rhythm."], "pattern-lab": ["ورشة الباترن", "إبداع", "صمّم نقشة متكررة ونزّلها صورة.", "Pattern Lab", "Creative", "Design a repeating pattern and download it as an image."], "translator": ["مترجم الكلام", "أدوات", "ترجم نصوص حقيقية، واسمع النتيجة وانسخها.", "Translator", "Tools", "Translate real text, listen to the result, and copy it."], "code-studio": ["ورشة الكود", "أدوات", "محرر متعدد الملفات، ٢٠ لغة ومعاينة ويب معزولة.", "Code Studio", "Tools", "A multi-file editor with 20 languages and an isolated web preview."], "site-assistant": ["اسأل عن المعرض", "أدوات", "مساعد بحث ذكي يعرف مشروعات أحمد والمعلومات المنشورة هنا.", "Portfolio Assistant", "Tools", "An AI-powered assistant that answers questions about Ahmed's projects and the information published on the site."]};
const normalizeSearch = (value) => value.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f\u064b-\u065f\u0670\u0640]/g, "").replace(/[أإآٱ]/g,"ا").replace(/ى/g,"ي").replace(/ة/g,"ه").trim();
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
  let terms = normalizeSearch($("#search").value).split(/\s+/).filter(Boolean);
  $("#clearSearch").hidden = !$("#search").value;
  let list = projects.filter(
    (p) =>
      (category === "الكل" || p[2] === category) &&
      terms.every(term => normalizeSearch([...p, ...(searchAliases[p[0]] || [])].join(" ")).includes(term)),
  );
  $("#projectCount").textContent =
    `${String(list.length).padStart(2, "0")} مشروعًا / صُممت للتجربة`;
  $("#projects").innerHTML =
    list
      .map((p) => {
        let i = projects.indexOf(p);
        return `<a class="project" href="${p[0]}/${p[0] === "shop-lane" ? "?v=5" : ""}" style="--c:${p[5]}"><div class="cover"><span class="coverNumber">تجربة ${String(i + 1).padStart(2, "0")}</span><span class="coverArrow">↗</span><img onerror="this.style.display='none'" class="coverPhoto" src="assets/covers/${p[0]}.webp" alt="${(coverCopy[p[0]] || [p[1], "جرّب بنفسك", p[3]])[2]} صورة تعبيرية" loading="lazy" width="1200" height="760"><div class="coverShade"></div><div class="coverWords"><span>${(coverCopy[p[0]] || [p[1], "جرّب بنفسك", p[3]])[2]}</span><strong>${(coverCopy[p[0]] || [p[1], "جرّب بنفسك", p[3]])[0]}<br>${(coverCopy[p[0]] || [p[1], "جرّب بنفسك", p[3]])[1]}</strong></div></div><div class="projectmeta"><h3>${p[1]}</h3><span>${p[2]}</span></div><p>${p[3]}</p></a>`;
      })
      .join("") || "<p>مفيش مشروعات بالاسم ده. جرّب كلمة تانية.</p>";
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
        "المعرض مش قادر يحمّل. جرّب تحدّث الصفحة."),
  );
function searchAll() {
  category = "الكل";
  $$("#filters button").forEach(b => b.classList.toggle("active", b.textContent === category));
  render();
}
$("#search").oninput = searchAll;
$("#clearSearch").onclick = () => { $("#search").value = ""; searchAll(); $("#search").focus(); };
$("#searchLink").onclick = () => { $("#search").value = ""; searchAll(); requestAnimationFrame(() => $("#search").focus({preventScroll:true})); };
settings();
