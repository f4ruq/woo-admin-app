const ordersList = document.getElementById("orders-list");

function statusBadge(status) {
  const map = {
    processing: ["Processing", "blue"],
    completed: ["Completed", "green"],
    pending: ["Pending", "amber"],
    "on-hold": ["On Hold", "gray"],
    failed: ["Failed", "red"]
  };

  const [label, color] = map[status] || [status, "gray"];

  return `
    <div class="flex items-center px-2.5 py-1 rounded-md bg-${color}-500/10 dark:bg-${color}-500/20">
      <span class="w-1.5 h-1.5 rounded-full bg-${color}-500 mr-2"></span>
      <span class="text-${color}-600 dark:text-${color}-400 text-xs font-semibold uppercase tracking-wider">
        ${label}
      </span>
    </div>
  `;
}

apiFetch("/orders?page=1&per_page=20")
  .then(orders => {
    ordersList.innerHTML = "";

    orders.forEach(order => {
      const card = document.createElement("div");
      card.className =
        "flex flex-col gap-3 p-4 bg-surface-light dark:bg-surface-dark rounded-xl shadow-sm border border-gray-100 dark:border-gray-800";

      card.innerHTML = `
        <div class="flex justify-between items-center">
          <span class="text-primary font-semibold text-sm tracking-wide">#${order.id}</span>
          <span class="text-slate-500 dark:text-slate-400 text-xs font-medium">
            ${new Date(order.date_created).toLocaleTimeString()}
          </span>
        </div>

        <div class="flex items-center gap-3 py-1">
          <div class="w-10 h-10 shrink-0 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
            ${order.billing.first_name[0] || "?"}
          </div>
          <div class="flex flex-col">
            <span class="font-bold">${order.billing.first_name} ${order.billing.last_name}</span>
            <span class="text-slate-500 text-xs">
              ${order.line_items.length} items • ${order.shipping_lines[0]?.method_title || ""}
            </span>
          </div>
        </div>

        <div class="flex justify-between items-center mt-1 pt-3 border-t border-gray-100 dark:border-gray-700/50">
          ${statusBadge(order.status)}
          <span class="font-mono font-bold text-lg">$${order.total}</span>
        </div>
      `;

      card.addEventListener("click", () => {
        window.location.href = `order.html?id=${order.id}`;
      });

      ordersList.appendChild(card);
    });
  })
  .catch(err => {
    console.error(err);
    ordersList.innerHTML = "Orders yüklenemedi";
  });