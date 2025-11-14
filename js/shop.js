// shop logic

class Shop {
  constructor(itemListJSON) {
    this.items = itemListJSON; 
    // Example item = { id:"food", price:10 }
  }

  buy(itemId) {
    let item = this.items[itemId];

    if (player.coins >= item.price) {
      player.coins -= item.price;
      inventory.add(itemId);
      saveGameData();
      renderCoinDisplay();
    }
  }

  renderShopUI() {
    // show each shop item with a buy button
  }
}
