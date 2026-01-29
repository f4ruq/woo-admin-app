const productsList = document.getElementById("products-list");
const searchInput = document.querySelector("input[placeholder*='Search']");
let allProducts = [];

/* Ürün kartı */
function productCard(p) {
  const image =
    p.images && p.images.length
      ? p.images[0].src
      : "https://via.placeholder.com/60";

  const stockStatus =
    p.stock_status === "outofstock"
      ? `<span class="text-red-400 text-xs font-bold">OUT OF STOCK</span>`
      : `<span class="text-emerald-400 text-xs font-bold">IN STOCK</span>`;

  const stockQty =
    p.manage_stock && p.stock_quantity !== null
      ? `${p.stock_quantity} units`
      : "- units";

  const div = document.createElement("div");
  div.className =
    "flex gap-4 px-4 py-4 border-b border-gray-800 hover:bg-[#1c2126] transition cursor-pointer";

  div.innerHTML = `
    <img src="${image}" class="w-[60px] h-[60px] rounded-lg object-cover border border-gray-700"/>
    <div class="flex-1 min-w-0">
      <div class="flex justify-between items-start">
        <p class="font-semibold truncate pr-2">${p.name}</p>
        <p class="font-bold whitespace-nowrap">₺${p.price || "-"}</p>
      </div>
      <p class="text-xs text-gray-400">SKU: ${p.sku || "-"}</p>
      <div class="flex items-center gap-2 mt-1">
        ${stockStatus}
        <span class="text-xs text-gray-400">${stockQty}</span>
      </div>
    </div>
  `;

  /* 🔥 ASIL EKSİK OLAN SATIR */
  div.addEventListener("click", () => {
    window.location.href = `product.html?id=${p.id}`;
  });

  return div;
}

/* Listeyi çiz */
function renderProducts(list) {
  productsList.innerHTML = "";
  list.forEach(p => productsList.appendChild(productCard(p)));
}

/* Arama */
searchInput.addEventListener("input", e => {
  const q = e.target.value.toLowerCase();
  const filtered = allProducts.filter(p =>
    p.name.toLowerCase().includes(q) ||
    (p.sku || "").toLowerCase().includes(q)
  );
  renderProducts(filtered);
});

/* Ürünleri çek */
apiFetch("/products?per_page=50").then(products => {
  allProducts = products;
  renderProducts(allProducts);
});