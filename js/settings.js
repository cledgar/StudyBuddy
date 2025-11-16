// logic for the settings page

// provide settings page wiring: populate flashcards, add/delete cards, change pet type

function populateFlashcardEditor() {
  const list = document.getElementById("flashcard-list");
  if (!list) return;
  const cards =
    window.flashcards && window.flashcards.cards ? window.flashcards.cards : [];
  list.innerHTML = "";
  cards.forEach((c, i) => {
    const row = document.createElement("div");
    row.className = "flashcard-row";
    row.innerHTML = `<strong>Q:</strong> ${escapeHtml(
      c.question
    )} <strong>A:</strong> ${escapeHtml(
      c.answer
    )} <button data-index="${i}" class="delete-card">Delete</button>`;
    list.appendChild(row);
  });
  list.querySelectorAll(".delete-card").forEach((btn) => {
    btn.addEventListener("click", () => {
      deleteFlashcard(parseInt(btn.dataset.index, 10));
    });
  });
}

function populatePetOptions() {
  const select = document.getElementById("pet-select");
  if (!select) return;
  // select current pet type if exists
  if (window.pet && window.pet.type) select.value = window.pet.type;
}

function onSettingsLoad() {
  // load saved data (if any) then populate UI
  if (typeof loadGameData === "function") loadGameData();
  if (!window.flashcards) window.flashcards = { cards: [] };
  if (!window.pet) window.pet = { type: "chicken", name: "Buddy" };
  populateFlashcardEditor();
  populatePetOptions();

  // wire add card button
  const addBtn = document.getElementById("add-card");
  if (addBtn) {
    addBtn.addEventListener("click", () => {
      const q = document.getElementById("q-input")?.value?.trim();
      const a = document.getElementById("a-input")?.value?.trim();
      if (!q || !a) return;
      addFlashcard(q, a);
      document.getElementById("q-input").value = "";
      document.getElementById("a-input").value = "";
      populateFlashcardEditor();
    });
  }

  const savePetBtn = document.getElementById("save-pet");
  if (savePetBtn) {
    savePetBtn.addEventListener("click", () => {
      const select = document.getElementById("pet-select");
      if (!select) return;
      changePetType(select.value);
      if (typeof saveGameData === "function") saveGameData();
      // navigate back to index (user expects)
      window.location.href = "index.html";
    });
  }
}

function addFlashcard(question, answer) {
  if (!window.flashcards) window.flashcards = { cards: [] };
  window.flashcards.cards.push({ question, answer });
  if (typeof saveGameData === "function") saveGameData();
  populateFlashcardEditor();
}

function deleteFlashcard(index) {
  if (!window.flashcards || !Array.isArray(window.flashcards.cards)) return;
  window.flashcards.cards.splice(index, 1);
  if (typeof saveGameData === "function") saveGameData();
  populateFlashcardEditor();
}

function changePetType(newType) {
  if (!window.pet) window.pet = {};
  window.pet.type = newType;
  if (typeof saveGameData === "function") saveGameData();
}

// small utility to avoid XSS when injecting values into the settings list
function escapeHtml(str) {
  return String(str).replace(
    /[&<>"]/g,
    (s) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[s])
  );
}

// auto-run when settings page loads
document.addEventListener("DOMContentLoaded", onSettingsLoad);
