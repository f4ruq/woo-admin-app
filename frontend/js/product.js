const $ = (id) => document.getElementById(id);

const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

let currentImages = [];

if (!productId) {
  alert("Product ID yok");
  location.href = "products.html";
}

// LOAD PRODUCT
async function loadProduct() {
  try {
    const p = await apiFetch(`/products/${productId}`);

    $("name").value = p.name || "";
    $("description").value = p.description || "";
    $("price").value = p.regular_price || "";
    $("outOfStock").checked = p.stock_status === "outofstock";

    currentImages = p.images || [];
    renderImages();

  } catch (e) {
    console.error(e);
    alert("Sunucuya ulaşılamadı");
  }
}

// IMAGES
function renderImages() {
  const box = $("images");
  box.innerHTML = "";

  currentImages.forEach((img, i) => {
    box.insertAdjacentHTML("beforeend", `
      <div class="relative">
        <img src="${img.src}" class="rounded-lg"/>
        <button onclick="removeImage(${i})"
          class="absolute top-1 right-1 bg-black/70 rounded-full px-2 text-sm">✕</button>
      </div>
    `);
  });
}

function removeImage(index) {
  currentImages.splice(index, 1);
  renderImages();
}

// SAVE
async function saveProduct() {
  const body = {
    name: $("name").value,
    description: $("description").value,
    regular_price: String($("price").value),
    stock_status: $("outOfStock").checked ? "outofstock" : "instock",
    images: currentImages.map(i => ({ id: i.id }))
  };

  await apiFetch(`/products/${productId}`, {
    method: "PUT",
    body: JSON.stringify(body),
  });

  alert("Ürün güncellendi");
}

// DELETE
async function deleteProduct() {
  if (!confirm("Silmek istediğine emin misin?")) return;

  await apiFetch(`/products/${productId}`, { method: "DELETE" });
  location.href = "products.html";
}

// EVENTS
$("saveBtn").onclick = saveProduct;
$("topSaveBtn").onclick = saveProduct;
$("deleteBtn").onclick = deleteProduct;
$("backBtn").onclick = () => location.href = "products.html";

loadProduct();