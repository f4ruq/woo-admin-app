const navMap = {
  home: "dashboard.html",
  orders: "orders.html",
  products: "products.html",
  settings: "settings.html",
};

document.querySelectorAll("[data-nav]").forEach(btn => {
  btn.addEventListener("click", () => {
    const target = btn.dataset.nav;
    const url = navMap[target];
    if (url) window.location.href = url;
  });
});

// aktif sekmeyi boya
const current = location.pathname.split("/").pop();
Object.entries(navMap).forEach(([key, file]) => {
  if (file === current) {
    document.querySelector(`[data-nav="${key}"]`)
      ?.classList.add("text-blue-400");
  }
});