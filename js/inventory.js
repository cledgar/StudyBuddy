// inventory logic

//same as before, remove whatever you want! :)

class Inventory {
  constructor() {
    this.items = {}; // ex: { food: 3, water: 1 }
  }

  add(itemName, amount=1) {
    if (!this.items[itemName]) this.items[itemName] = 0;
    this.items[itemName] += amount;
    saveGameData();
  }

  remove(itemName, amount=1) {
    if (this.items[itemName] >= amount) {
      this.items[itemName] -= amount;
      saveGameData();
    }
  }

  has(itemName) {
    return this.items[itemName] > 0;
  }

  renderInventoryUI() {
    // loop through items and draw them in a modal
  }
}
