// ui helper functions

updatePetUI() {
  setText("#hunger", "Hunger: " + pet.hunger + "%");
  setText("#thirst", "Thirst: " + pet.thirst + "%");
  setText("#clean", "Cleanliness: " + pet.cleanliness + "%");
}

renderCoinDisplay() {
  setText("#coin-display", "Coins: " + player.coins);
}

showModal(htmlContent) {
  modalContainer.innerHTML = htmlContent;
  modalContainer.classList.remove("hidden");
}

hideModal() {
  modalContainer.classList.add("hidden");
}
