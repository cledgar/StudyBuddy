// shop logic

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
          <p>You bought <strong>${itemId}</strong> for ${item.price} coins.</p>
          <button onclick="hideModal()" class="modal-btn">Close</button>
        </div>
      `);
    } else {
      showModal(`
         <div class="modal-box">
          <h2>Not enough coins!</h2>
          <p>You need ${item.price - player.coins} more coins.</p>
          <button onclick="hideModal()" class="modal-btn">Okay</button>
         </div>`
      );
  }
}

renderShopUI() {
    const container = $("#shop-items");
    if (!container) return console.error("No shop-items found!");

    container.innerHTML = "";

    for (let id in this.items) {
      const item = this.items[id];

      const div = document.createElement("div");
      div.className = "shop-item";
      div.dataset.item = id;

      div.innerHTML = `
         <img src="assets/items/${id}.png" alt="${id}">
         <div class="shop-price">${item.price}</div>
         <button class="buy-btn" data-id="${id}">Buy</button>
      `;

      container.appendChild(div);
    }
    container.querySelectorAll(".buy-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        this.buy(btn.dataset.id);
      });
    });
  }
}

window.shop = new Shop({
  // food:   { price: 10 },
  water:  { price: 8 },
  brush:   { price: 12 },
});