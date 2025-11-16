// shop logic

// this is pretty much done in terms of the logic side of things but the shop module is ugly cuz i didnt fix the buttons yet,
// so you may need to edit this file when fixing the ugly buttons, idk. coding can be finicky, but this file should be mostly done

class Shop {
  constructor(itemListJSON) {
    this.items = itemListJSON;
  }

  buy(itemId) {
    const item = this.items[itemId];
    if (!item) return console.error("Item not found:", itemId);

    if (player.coins >= item.price) {
      player.coins -= item.price;
      inventory.add(itemId);

      saveGameData();
      renderCoinDisplay();
      renderInventoryUI();

      showModal(`
        <div class="modal-box">
          <h2>Purchased!</h2>
          <p>You bought <strong>${
            item.name || itemId
          }</strong> for <img src="assets/icons/coin.png" alt="coin" class="coin-small"> ${
        item.price
      } coins.</p>
          <button onclick="hideModal()" class="modal-btn">Close</button>
        </div>
      `);
    } else {
      showModal(`
         <div class="modal-box">
          <h2>Not enough coins!</h2>
          <p>You need <img src="assets/icons/coin.png" alt="coin" class="coin-small"> ${
            item.price - player.coins
          } more coins.</p>
          <button onclick="hideModal()" class="modal-btn">Okay</button>
         </div>`);
    }
  }

  renderShopUI() {
    const container = document.querySelector("#shop-items");
    if (!container) return console.error("No shop-items found!");

    container.innerHTML = "";

    for (let id in this.items) {
      const item = this.items[id];

      const div = document.createElement("div");
      div.className = "shop-item";
      div.dataset.item = id;

      div.innerHTML = `
         <img src="assets/items/${id}.png" alt="${
        item.name || id
      }" onerror="if(!this.dataset._tried){this.dataset._tried=1;this.src='assets/items/${id}.svg'}else{this.onerror=null;this.src='assets/icons/coin.png'}">
         <div class="shop-meta">
           <div class="shop-name">${item.name || id}</div>
           <div class="shop-price"><img src="assets/icons/coin.png" alt="coin" class="coin-small"> ${
             item.price
           }</div>
         </div>
         <button class="buy-btn" data-id="${id}">Buy</button>
      `;

      container.appendChild(div);
    }
    container.querySelectorAll(".buy-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        this.buy(btn.dataset.id);
      });
    });
  }
}

// Instantiate a global shop and load items from data file when available
window.shop = new Shop({});
(async function loadShopData() {
  try {
    const resp = await fetch("data/shopItems.json");
    if (!resp.ok) throw new Error("Failed to load shopItems.json");
    const list = await resp.json();
    // convert array to map by id
    const map = {};
    (list || []).forEach((i) => {
      map[i.id] = { price: i.price, name: i.name };
    });
    window.shop.items = map;
    if (typeof window.shop.renderShopUI === "function")
      window.shop.renderShopUI();
  } catch (err) {
    console.warn("Could not load shop data, falling back to defaults", err);
    window.shop.items = {
      water: { price: 8, name: "Water" },
      brush: { price: 12, name: "Brush" },
    };
    if (typeof window.shop.renderShopUI === "function")
      window.shop.renderShopUI();
  }
})();
