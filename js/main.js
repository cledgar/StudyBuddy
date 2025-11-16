// main game loop & event listener pseudocode mockup

window.player = {
  coins: 50
};

window.shop = new Shop({
  water: { price: 8 },
  brush: { price: 12 }
});


window.inventory = {
  items: {},

  add(itemId) {
    this.items[itemId] = (this.items[itemId] || 0) + 1;
    if (typeof renderInventoryUI === "function") {
      renderInventoryUI();
    }
  },

  getQuantity(itemId) {
    return this.items[itemId] || 0;
  }
}

function renderInventoryUI() {
  const container = document.getElementById("inventory-items");
  if (!container) return;

  container.innerHTML = "";
  const allItems = ["water", "brush"];

  allItems.forEach(id => {
    const qty = inventory.getQuantity(id);
    const div = document.createElement("div");
    div.className = "inventory-item";
    if (qty === 0) div.classList.add("low");
    div.dataset.item = id;

    div.innerHTML = `
      <img src="assets/items/${id}.png" alt="${id}">
      <p class="quantity">${qty}</p>
    `;

    container.appendChild(div);
  });
}


function onPageLoad() {
  loadGameData();
  renderUI();
  startGameLoop();
}

function startGameLoop() {
  setInterval(() => {
    pet.updateNeeds();
    updatePetUI();
  }, 30000);   // every 30 seconds
}

document.addEventListener("DOMContentLoaded", () => {
  renderCoinDisplay();
  updatePetUI?.();
  renderInventoryUI?.();
  shop.renderShopUI();
});
