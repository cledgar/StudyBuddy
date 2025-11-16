// main game loop & event listener pseudocode mockup

// currently inventory logic is in here, but this can and should be moved to inventory.js
// whenever possible with classes pls (not required i just like it. makes it easier to read)
// other than that, just use this to put all game features in here to work !
// ivve been using classes bcuz i like objects :)
// but once again, as long as it works, follow your own style of coding

window.player = {
  coins: 50,
};

window.shop = new Shop({
  water: { price: 8 },
  brush: { price: 12 },
});

// Inventory is provided by `js/inventory.js` (global `inventory` instance)

function renderInventoryUI() {
  if (
    window.inventory &&
    typeof window.inventory.renderInventoryUI === "function"
  ) {
    window.inventory.renderInventoryUI();
    return;
  }
  // fallback: simple static render
  const container = document.getElementById("inventory-items");
  if (!container) return;
  container.innerHTML = "";
  const allItems = ["water", "brush"];
  allItems.forEach((id) => {
    const qty =
      window.inventory && typeof window.inventory.getQuantity === "function"
        ? window.inventory.getQuantity(id)
        : 0;
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
  startGameLoop();
}

// Render top-level UI pieces
function renderUI() {
  if (typeof renderCoinDisplay === "function") renderCoinDisplay();
  if (typeof updatePetUI === "function") updatePetUI();
  if (typeof renderInventoryUI === "function") renderInventoryUI();
  if (window.shop && typeof window.shop.renderShopUI === "function")
    window.shop.renderShopUI();
}

function startGameLoop() {
  setInterval(() => {
    pet.updateNeeds();
    updatePetUI();
  }, 30000); // every 30 seconds
}

document.addEventListener("DOMContentLoaded", () => {
  // load saved data first so UI reflects persisted state
  if (typeof loadGameData === "function") loadGameData();

  // ensure required globals exist
  if (!window.player) window.player = { coins: 50 };
  if (!window.pet && typeof Pet === "function") window.pet = new Pet();

  renderCoinDisplay();
  updatePetUI?.();
  renderInventoryUI?.();
  if (window.shop && typeof window.shop.renderShopUI === "function")
    window.shop.renderShopUI();

  // start the game loop
  startGameLoop();
});
