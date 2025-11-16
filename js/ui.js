// ui helper functions

// this is mostly done tbh but add stuff as needed. this is just functionality like rendering and
// updating and stuff, so you very well may have to add to this

function $(selector) {
  return document.querySelector(selector);
}

function setText(selector, text) {
  const el = $(selector);
  if (el) el.textContent = text;
}

function updatePetUI() {
  if (!window.pet) return console.error("pet.js not loaded!");
  const hungerEl = document.querySelector("#hunger-bar");
  const thirstEl = document.querySelector("#thirst-bar");
  // some pages use `hygiene-bar` while other code used `clean-bar`; support both
  const cleanEl =
    document.querySelector("#clean-bar") ||
    document.querySelector("#hygiene-bar");
  if (hungerEl) hungerEl.style.setProperty("width", pet.hunger + "%");
  if (thirstEl) thirstEl.style.setProperty("width", pet.thirst + "%");
  if (cleanEl) cleanEl.style.setProperty("width", pet.cleanliness + "%");
}

function renderCoinDisplay() {
  if (!window.player) return console.error("player object missing!");
  setText("#coin-display", "Coins: " + player.coins);
}

function getModalContainer() {
  return document.querySelector("#modal-container");
}

function showModal(htmlContent) {
  const modalContainer = getModalContainer();
  if (!modalContainer) return;
  modalContainer.innerHTML = htmlContent;
  modalContainer.classList.remove("hidden");
}

function hideModal() {
  const modalContainer = getModalContainer();
  modalContainer?.classList.add("hidden");
}
