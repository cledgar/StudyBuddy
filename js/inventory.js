// inventory logic

//same as before, remove whatever you want! :)
// rn there is inventory functionality in main.js bcuz i just wanted to see it work
// but you can remove that and move all inventory logic here for organization purposes
// just make sure it works first :)

class Inventory {
  constructor() {
    this.items = {}; // ex: { food: 3, water: 1 }
  }

  add(itemName, amount = 1) {
    if (!this.items[itemName]) this.items[itemName] = 0;
    this.items[itemName] += amount;
    // persist and update UI if present
    if (typeof saveGameData === "function") saveGameData();
    if (typeof renderInventoryUI === "function") renderInventoryUI();
  }

  remove(itemName, amount = 1) {
    if (!this.items[itemName]) return;
    this.items[itemName] = Math.max(0, this.items[itemName] - amount);
    if (typeof saveGameData === "function") saveGameData();
    if (typeof renderInventoryUI === "function") renderInventoryUI();
  }

  has(itemName) {
    return !!(this.items[itemName] && this.items[itemName] > 0);
  }

  getQuantity(itemName) {
    return this.items[itemName] || 0;
  }

  renderInventoryUI() {
    const container = document.getElementById("inventory-items");
    if (!container) return;

    container.innerHTML = "";

    // Build list of known items: union of inventory items and shop items
    const inventoryKeys = Object.keys(this.items || {});
    const shopKeys =
      window.shop && window.shop.items ? Object.keys(window.shop.items) : [];
    const all = Array.from(new Set([...inventoryKeys, ...shopKeys]));

    all.forEach((id) => {
      const qty = this.getQuantity(id);
      const div = document.createElement("div");
      div.className = "inventory-item";
      if (qty === 0) div.classList.add("low");
      div.dataset.item = id;

      div.innerHTML = `
        <img src="assets/items/${id}.png" alt="${id}" onerror="if(!this.dataset._tried){this.dataset._tried=1;this.src='assets/items/${id}.svg';}else{this.onerror=null;this.src='assets/icons/coin.png'}">
        <p class="quantity">${qty}</p>
      `;

      container.appendChild(div);
    });
  }
}

// Ensure a single global inventory instance exists for the app.
if (!window.inventory) {
  window.inventory = new Inventory();
}
