const recipes = [
  {
    "name": "مكرونة بالليمون",
    "time": 20,
    "tag": "نباتي بمنتجات ألبان",
    "ingredients": [
      [
        "مكرونة",
        200,
        "جم"
      ],
      [
        "ليمون",
        1,
        ""
      ],
      [
        "زيت زيتون",
        2,
        "ملعقة كبيرة"
      ],
      [
        "جبنة بارميزان",
        40,
        "جم"
      ]
    ],
    "steps": [
      "اسلق المكرونة في مية وملح لحد ما تستوي وتفضل متماسكة.",
      "قلّب عصير الليمون مع زيت الزيتون.",
      "قلّب المكرونة مع الصوص والجبنة وقدّمها."
    ]
  },
  {
    "name": "سلطة حمص",
    "time": 15,
    "tag": "نباتي بالكامل",
    "ingredients": [
      [
        "حمص مسلوق",
        240,
        "جم"
      ],
      [
        "خيار",
        1,
        ""
      ],
      [
        "طماطم",
        2,
        ""
      ],
      [
        "زيت زيتون",
        2,
        "ملعقة كبيرة"
      ]
    ],
    "steps": [
      "اغسل الحمص المسلوق وصفّيه.",
      "قطّع الخيار والطماطم مكعبات.",
      "قلّب الكل مع الزيت والملح والتوابل اللي بتحبها."
    ]
  },
  {
    "name": "بيض بالطماطم",
    "time": 25,
    "tag": "نباتي ببيض",
    "ingredients": [
      [
        "بيض",
        4,
        ""
      ],
      [
        "طماطم",
        4,
        ""
      ],
      [
        "زيت زيتون",
        1,
        "ملعقة كبيرة"
      ],
      [
        "بصلة",
        1,
        ""
      ]
    ],
    "steps": [
      "شوّح البصل في الزيت لحد ما يدبل.",
      "ضيف الطماطم وسيبها تتسبك شوية.",
      "اعمل فراغات وحط البيض وغطّي لحد ما يستوي كويس."
    ]
  },
  {
    "name": "خضار في الفرن",
    "time": 40,
    "tag": "نباتي بالكامل",
    "ingredients": [
      [
        "بطاطس",
        400,
        "جم"
      ],
      [
        "جزر",
        200,
        "جم"
      ],
      [
        "زيت زيتون",
        2,
        "ملعقة كبيرة"
      ],
      [
        "بصلة",
        1,
        ""
      ]
    ],
    "steps": [
      "سخّن الفرن على ٢٠٠ درجة مئوية.",
      "قطّع الخضار بحجم متقارب وقلّبه في الزيت.",
      "دخّله الفرن حوالي نص ساعة لحد ما يطرى، وقلّبه في نص الوقت."
    ]
  },
  {
    "name": "شوفان باللبن والموز",
    "time": 10,
    "tag": "نباتي بمنتجات ألبان",
    "ingredients": [
      [
        "شوفان",
        100,
        "جم"
      ],
      [
        "لبن",
        400,
        "مل"
      ],
      [
        "موزة",
        1,
        ""
      ]
    ],
    "steps": [
      "حط الشوفان واللبن في حلة.",
      "قلّب على نار هادية لحد ما القوام يبقى كريمي.",
      "قدّمه وحط شرايح الموز على الوش."
    ]
  },
  {
    "name": "رز وفاصوليا",
    "time": 30,
    "tag": "نباتي بالكامل",
    "ingredients": [
      [
        "رز",
        150,
        "جم"
      ],
      [
        "فاصوليا مسلوقة",
        240,
        "جم"
      ],
      [
        "طماطم",
        2,
        ""
      ],
      [
        "بصلة",
        1,
        ""
      ]
    ],
    "steps": [
      "سوّي الرز بالطريقة المكتوبة على العبوة.",
      "شوّح البصل وضيف عليه الطماطم والفاصوليا.",
      "سيبهم يتسبكوا شوية وقدّمهم فوق الرز."
    ]
  }
];
let plan = load("meal-plan", {}),
  active = 0;
const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
function detail(i) {
  active = i;
  let r = recipes[i];
  $("#detail").innerHTML =
    `<h2>${r.name}</h2><p>${r.tag} · ${r.time} minutes · contains common allergens, check ingredients</p><label>Servings<input id="servings" type="number" min="1" max="20" value="2"></label><ul id="ingredients"></ul><h3>Method</h3><ol>${r.steps.map((s) => `<li style="padding:9px">${s}</li>`).join("")}</ol>`;
  function scale() {
    let n = Math.max(1, Math.min(20, +$("#servings").value || 2)) / 2;
    $("#ingredients").innerHTML = r.ingredients
      .map(([k, v, u]) => `<li>${+(v * n).toFixed(2)} ${u} ${k}</li>`)
      .join("");
  }
  $("#servings").oninput = scale;
  scale();
}
function render() {
  save("meal-plan", plan);
  let q = $("#search").value.toLowerCase();
  $("#recipes").innerHTML = recipes
    .map((r, i) => ({ ...r, i }))
    .filter((r) => (r.name + r.tag).toLowerCase().includes(q))
    .map(
      (r) =>
        `<button data-recipe="${r.i}" style="text-align:left;padding:24px"><span style="font-size:30px">${["◒", "❀", "☀", "✳", "◡", "◈"][r.i]}</span><h3>${r.name}</h3><small>${r.time} min · ${r.tag}</small></button>`,
    )
    .join("");
  $$("[data-recipe]").forEach(
    (b) => (b.onclick = () => detail(+b.dataset.recipe)),
  );
  $("#plan").innerHTML = days
    .map(
      (d) =>
        `<label class="item">${d}<select data-day="${d}"><option value="">Unplanned</option>${recipes.map((r, i) => `<option value="${i}" ${String(plan[d]) === String(i) ? "selected" : ""}>${r.name}</option>`).join("")}</select></label>`,
    )
    .join("");
  $$("[data-day]").forEach(
    (b) =>
      (b.onchange = () => {
        if (b.value === "") delete plan[b.dataset.day];
        else plan[b.dataset.day] = +b.value;
        render();
      }),
  );
  let totals = {};
  Object.values(plan).forEach((i) =>
    recipes[i].ingredients.forEach(([k, v, u]) => {
      if (!totals[k]) totals[k] = { v: 0, u };
      totals[k].v += v;
    }),
  );
  $("#shopping").innerHTML =
    Object.entries(totals)
      .map(
        ([k, x]) =>
          `<label class="item" style="display:block"><input type="checkbox"> ${x.v} ${x.u} ${k}</label>`,
      )
      .join("") || "<p>Plan a meal to build your list.</p>";
  $("#export").onclick = () =>
    download(
      "shopping-list.txt",
      Object.entries(totals)
        .map(([k, x]) => `${x.v} ${x.u} ${k}`)
        .join("\n"),
      "text/plain",
    );
}
$("#search").oninput = render;
render();
detail(0);
