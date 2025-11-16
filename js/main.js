// main game loop & event listener pseudocode mockup

// currently inventory logic is in here, but this can and should be moved to inventory.js 
// whenever possible with classes pls (not required i just like it. makes it easier to read)
// other than that, just use this to put all game features in here to work !
// ivve been using classes bcuz i like objects :)
// but once again, as long as it works, follow your own style of coding

window.flashcards = new Flashcards();
flashcards.loadCards();


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

function renderFlashcard() {
  const card = document.getElementById("flashcard-card");
  const qEl = document.getElementById("flashcard-question");
  const aEl = document.getElementById("flashcard-answer");

  const nextQuestion = flashcards.randomCard();

  qEl.textContent = nextQuestion;
  aEl.textContent = flashcards.revealAnswer();

  // Reset flipped state
  card.classList.remove("flipped");
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
  renderFlashcard();
  const cardElement = document.getElementById("flashcard-card");
  cardElement.addEventListener("click", () => {
    cardElement.classList.toggle("flipped");
  });
  const nextBtn = document.getElementById("next-card-btn");
  nextBtn.addEventListener("click", () => {
    renderFlashcard();
  });


});
