// ui helper functions

function $(selector) {
  return document.querySelector(selector);
}

function setText(selector, text) {
  const el = $(selector);
  if (el) el.textContent = text;
}

function updatePetUI() {
  if (!window.pet) return console.error("pet.js not loaded!");
  $("#hunger-bar")?.style.setProperty("width", pet.hunger + "%");
  $("#thirst-bar")?.style.setProperty("width", pet.thirst + "%");
  $("#clean-bar")?.style.setProperty("width", pet.cleanliness + "%");
}

function renderCoinDisplay() {
  if (!window.player) return console.error("player object missing!");
  setText("#coin-display", "Coins: " + player.coins);
}

const modalContainer = $("#modal-container");

function showModal(htmlContent) {
  if (!modalContainer) return;
  modalContainer.innerHTML = htmlContent;
  modalContainer.classList.remove("hidden");
}

function hideModal() {
  modalContainer?.classList.add("hidden");
}

