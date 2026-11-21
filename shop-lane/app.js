const state = {
  collection: "grocery",
  q: "",
  category: "all",
  max: 50000,
  sort: "featured",
  page: 1,
  pageSize: 24,
  favoritesOnly: false,
};
let catalogs = { grocery: null, tech: null },
  products = [],
  filtered = [],
  wish = new Set(load("arabic-shop-saved-v1", [])),
  cart = load("arabic-shop-bag-v1", {}),
  loading = false;
const moneyUSD = (n) =>
  new Intl.NumberFormat("ar-EG", { style: "currency", currency: "EGP" }).format(
    n,
  );
function sourceLink(p) {try {let u=new URL(p.source);return ['fresh.com.eg','dummyjson.com'].includes(u.hostname)?u.href:'';}catch{return '';}}
function persist() {
  try {
    save("arabic-shop-saved-v1", [...wish]);
    save("arabic-shop-bag-v1", cart);
  } catch {
    toast(
      "Browser storage is full. Your bag works this visit but new changes may not survive a reload.",
    );
  }
  $("#wishCount").textContent = wish.size;
  $("#cartCount").textContent = Object.values(cart).reduce(
    (a, x) => a + x.qty,
    0,
  );
}
function imageMarkup(p, cls = "") {
  return `<img class="catalogPhoto ${cls}" src="${esc(p.image)}" alt="${esc(p.name)}" loading="lazy" decoding="async" referrerpolicy="no-referrer">`;
}
function fallbackImages(scope) {
  scope.querySelectorAll("img").forEach((img) => {
    img.onload = () => img.classList.add("ready");
    img.onerror = () => {
      img.onerror = null;
      img.src = "catalog/unavailable.svg";
      img.alt += " (photo unavailable)";
    };
    if (img.complete && img.naturalWidth > 0) img.classList.add("ready");
  });
}
async function collection(which) {
  state.collection = which;
  state.page = 1;
  state.category = "all";
  state.q = "";
  state.favoritesOnly = false;
  state.max = 50000;
  $("#search").value = "";
  $("#favoritesOnly").checked = false;
  $("#price").max = state.max;
  $("#price").value = state.max;
  $("#priceLabel").textContent = moneyUSD(state.max);
  $("#loading").hidden = false;
  $("#grid").innerHTML = "";
  $("#pagination").hidden = true;
  $("#empty").hidden = true;
  loading = true;
  $("#groceryCollection").classList.toggle("active", which === "grocery");
  $("#techCollection").classList.toggle("active", which === "tech");
  $("#collectionTitle").textContent =
    which === "grocery"
      ? "أجهزة منزلية مصرية"
      : "تقنية وشاشات وهواتف وحواسيب";
  $("#results").textContent = "Loading catalog...";
  try {
    if (!catalogs[which]) {
      const response = await fetch(
        which === "grocery" ? "catalog/egypt-home.json" : "catalog/egypt-tech.json"
      );
      if (!response.ok) throw Error("Catalog request failed");
      catalogs[which] = await response.json();
    }
    if (state.collection !== which) return;
    products = catalogs[which];
    $("#category").innerHTML =
      '<option value="all">All categories</option>' +
      [...new Set(products.map((p) => p.cat))]
        .sort()
        .map((c) => `<option value="${esc(c)}">${esc(c)}</option>`)
        .join("");
    loading = false;
    $("#loading").hidden = true;
    render();
  } catch (e) {
    loading = false;
    $("#loading").hidden = true;
    $("#results").textContent = "Could not load the catalog. Please retry.";
    toast(
      "Catalog could not load. Check your connection and choose the collection again.",
    );
  }
}
function query() {
  let tokens = state.q.toLocaleLowerCase().split(/\s+/).filter(Boolean);
  let list = products.filter(
    (p) =>
      (state.category === "all" || p.cat === state.category) &&
      p.price <= state.max &&
      (!state.favoritesOnly || wish.has(p.id)) &&
      tokens.every((t) =>
        (p.name + " " + p.brand + " " + p.code).toLocaleLowerCase().includes(t),
      ),
  );
  if (state.sort === "low") list.sort((a, b) => a.price - b.price);
  else if (state.sort === "high") list.sort((a, b) => b.price - a.price);
  else if (state.sort === "name")
    list.sort((a, b) => a.name.localeCompare(b.name));
  return list;
}
function render() {
  if (loading) return;
  filtered = query();
  let pages = Math.max(1, Math.ceil(filtered.length / state.pageSize));
  state.page = Math.max(1, Math.min(pages, state.page));
  let start = (state.page - 1) * state.pageSize,
    list = filtered.slice(start, start + state.pageSize);
  $("#grid").innerHTML = list
    .map(
      (p) =>
        `<article class="product"><div class="photoBox"><button class="wish ${wish.has(p.id) ? "saved" : ""}" data-wish="${esc(p.id)}" aria-label="${wish.has(p.id) ? "Unsave" : "Save"} ${esc(p.name)}">${wish.has(p.id) ? "♥" : "♡"}</button><button class="detailButton" data-detail="${esc(p.id)}" aria-label="View ${esc(p.name)}">${imageMarkup(p)}</button></div><h3>${esc(p.name)}</h3><div class="brandName">${esc(p.brand || p.cat)}${p.quantity ? " · " + esc(p.quantity) : ""}</div><div class="productBottom"><div><strong>${moneyUSD(p.price)}</strong><small class="demoTag">${state.collection === "grocery" ? "سعر تجريبي مولّد" : "سعر تجريبي"}</small></div><button class="add" data-add="${esc(p.id)}">أضف إلى السلة +</button></div></article>`,
    )
    .join("");
  fallbackImages($("#grid"));
  $("#results").textContent = filtered.length
    ? `${(start + 1).toLocaleString("ar-EG")}–${Math.min(start + state.pageSize, filtered.length).toLocaleString("ar-EG")} من ${filtered.length.toLocaleString("ar-EG")} منتج مطابق · ${products.length.toLocaleString("ar-EG")} منتج في هذه المجموعة`
    : `0 من ${products.length.toLocaleString("ar-EG")} منتجات مطابقة`;
  $("#empty").hidden = !!list.length;
  $("#pagination").hidden = !list.length;
  $("#pageNumber").value = state.page;
  $("#pageNumber").max = pages;
  $("#pageTotal").textContent = "من " + pages.toLocaleString("ar-EG");
  $("#prev").disabled = state.page === 1;
  $("#next").disabled = state.page === pages;
  $$("[data-wish]").forEach(
    (b) =>
      (b.onclick = () => {
        let id = b.dataset.wish;
        wish.has(id) ? wish.delete(id) : wish.add(id);
        persist();
        render();
      }),
  );
  $$("[data-add]").forEach((b) => (b.onclick = () => add(b.dataset.add)));
  $$("[data-detail]").forEach(
    (b) => (b.onclick = () => details(b.dataset.detail)),
  );
  persist();
}
function find(id) {
  return products.find((p) => p.id === id) || cart[id]?.product;
}
function add(id) {
  let p = find(id);
  if (!p) return;
  if (!cart[id]) cart[id] = { product: p, qty: 0 };
  if (cart[id].qty >= 99) return toast("Maximum 99 per demo item");
  cart[id].qty++;
  persist();
  renderCart();
  toast("Added to your demo bag");
}
function details(id) {
  let p = find(id);
  if (!p) return;
  let source = sourceLink(p);
  $("#detailBody").innerHTML = `<div class="detailGrid">${imageMarkup(p)}<div><span class="badge">${esc(p.cat)}</span><h2>${esc(p.name)}</h2><p>${esc(p.brand)}</p><p>رقم الموديل: ${esc(p.code)}</p><div class="price">${moneyUSD(p.price)}</div><p>سعر تجريبي مولّد بالجنيه المصري، وليس عرض بيع حقيقي. لا نؤكد المخزون أو التوافر.</p><button id="detailAdd" class="primary">أضف إلى السلة التجريبية</button>${source ? `<p><a href="${esc(source)}" target="_blank" rel="noopener">مصدر بيانات المنتج والصورة ↗</a></p>` : ''}<p>${p.origin==='fresh'?'بيانات وصور الموديل: موقع فريش الرسمي. العلامة مصرية، ولا يعني ذلك أن كل موديل صُنع في مصر.':'سجل وصورة تعريفيان من DummyJSON. نموذج تقني عالمي، وليس ادعاءً بتوافره لدى متجر مصري.'}</p></div></div>`;
  fallbackImages($("#detailBody"));
  $("#detailAdd").onclick = () => add(id);
  $("#detail").showModal();
}
function renderCart() {
  let items = Object.entries(cart);
  $("#cartItems").innerHTML =
    items
      .map(
        ([id, x]) =>
          `<article class="cartItem">${imageMarkup(x.product)}<div><h3>${esc(x.product.name)}</h3><p>${moneyUSD(x.product.price)} للقطعة · سعر تجريبي</p><div class="row"><div class="actions"><button data-dec="${esc(id)}" aria-label="Decrease quantity">−</button><span>${x.qty}</span><button data-inc="${esc(id)}" aria-label="Increase quantity">+</button></div><strong>${moneyUSD(x.product.price * x.qty)}</strong></div><button data-remove="${esc(id)}" style="border:0;padding-left:0;font-size:10px">Remove</button></div></article>`,
      )
      .join("") || "<p>Your bag is empty. Time to explore.</p>";
  fallbackImages($("#cartItems"));
  let total =
    items.reduce(
      (a, [id, x]) => a + Math.round(x.product.price * 100) * x.qty,
      0,
    ) / 100;
  $("#cartTotal").textContent = moneyUSD(total);
  $("#checkout").disabled = !items.length;
  $$("[data-inc]").forEach((b) => (b.onclick = () => add(b.dataset.inc)));
  $$("[data-dec]").forEach(
    (b) =>
      (b.onclick = () => {
        let id = b.dataset.dec;
        cart[id].qty--;
        if (!cart[id].qty) delete cart[id];
        persist();
        renderCart();
      }),
  );
  $$("[data-remove]").forEach(
    (b) =>
      (b.onclick = () => {
        delete cart[b.dataset.remove];
        persist();
        renderCart();
      }),
  );
}
let searchTimer;
$("#search").oninput = (e) => {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(() => {
    state.q = e.target.value.trim();
    state.page = 1;
    render();
  }, 180);
};
$("#category").onchange = (e) => {
  state.category = e.target.value;
  state.page = 1;
  render();
};
$("#price").oninput = (e) => {
  state.max = +e.target.value;
  $("#priceLabel").textContent = moneyUSD(state.max);
  state.page = 1;
  render();
};
$("#sort").onchange = (e) => {
  state.sort = e.target.value;
  state.page = 1;
  render();
};
$("#favoritesOnly").onchange = (e) => {
  state.favoritesOnly = e.target.checked;
  state.page = 1;
  render();
};
$("#wishlistButton").onclick = () => {
  state.favoritesOnly = !state.favoritesOnly;
  $("#favoritesOnly").checked = state.favoritesOnly;
  state.page = 1;
  render();
  $("#catalog").scrollIntoView();
};
$("#pageSize").onchange = (e) => {
  state.pageSize = +e.target.value;
  state.page = 1;
  render();
};
function page(n) {
  state.page = n;
  render();
  $("#grid").scrollIntoView({ behavior: "smooth", block: "start" });
}
$("#prev").onclick = () => page(state.page - 1);
$("#next").onclick = () => page(state.page + 1);
$("#pageNumber").onchange = (e) => page(Math.floor(+e.target.value) || 1);
$("#resetFilters").onclick = () => {
  state.q = "";
  state.category = "all";
  state.max = 50000;
  state.sort = "featured";
  state.favoritesOnly = false;
  state.page = 1;
  $("#search").value = "";
  $("#category").value = "all";
  $("#price").value = state.max;
  $("#priceLabel").textContent = moneyUSD(state.max);
  $("#sort").value = "featured";
  $("#favoritesOnly").checked = false;
  render();
};
$("#groceryCollection").onclick = () => collection("grocery");
$("#techCollection").onclick = () => collection("tech");
$("#closeDetail").onclick = () => $("#detail").close();
$("#cartButton").onclick = () => {
  renderCart();
  $("#checkoutMessage").textContent = "";
  $("#cartDialog").showModal();
};
$("#closeCart").onclick = () => $("#cartDialog").close();
$("#checkout").onclick = () => {
  cart = {};
  persist();
  renderCart();
  $("#checkoutMessage").textContent =
    "Demo checkout complete. No real order was sent, no product was reserved, and no payment was taken.";
};
persist();
collection("grocery");
