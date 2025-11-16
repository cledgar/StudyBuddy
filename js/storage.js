// optional, we can delete this if we want, but this would allow players to save data in the local storage. focus on this only if we have time
//
// if you end up working on this, like i said, this should be the save and load features for the players, including pet type, name, inventory
// money, flashcards, etc

// Persistent save/load helpers for StudyBuddy
// Exposes `saveGameData()` and `loadGameData()` on `window` so other modules can call them.
// Designed to be defensive: it checks for the presence of classes like `Pet`, `Inventory`,
// and `Flashcards` before instantiating them. If saved data is corrupt, it will warn and
// remove the invalid save to avoid repeated errors.

function saveGameData() {
  try {
    const data = {
      pet: window.pet || null,
      inventory:
        window.inventory && window.inventory.items
          ? window.inventory.items
          : {},
      coins:
        window.player && typeof window.player.coins === "number"
          ? window.player.coins
          : 0,
      flashcards:
        window.flashcards && window.flashcards.cards
          ? window.flashcards.cards
          : [],
    };

    localStorage.setItem("studyGameSave", JSON.stringify(data));
    return true;
  } catch (err) {
    console.error("Failed to save game data:", err);
    return false;
  }
}

function loadGameData() {
  try {
    const saved = localStorage.getItem("studyGameSave");
    if (!saved) return null;

    const data = JSON.parse(saved);

    // Pet
    if (data.pet) {
      if (typeof Pet === "function") {
        window.pet = new Pet();
        // copy saved plain data properties onto the Pet instance
        Object.assign(window.pet, data.pet);
      } else {
        // fallback: keep plain object until Pet class is available
        window.pet = data.pet;
      }
    }

    // Inventory
    if (typeof Inventory === "function") {
      window.inventory = new Inventory();
      window.inventory.items = data.inventory || {};
    } else {
      window.inventory = { items: data.inventory || {} };
    }

    // Player / coins
    window.player = window.player || {};
    window.player.coins =
      typeof data.coins === "number" ? data.coins : window.player.coins || 0;

    // Flashcards
    if (typeof Flashcards === "function") {
      window.flashcards = new Flashcards();
      window.flashcards.cards = data.flashcards || [];
    } else {
      window.flashcards = { cards: data.flashcards || [] };
    }

    // Safety: ensure player object exists and coins is a number
    window.player = window.player || {};
    window.player.coins =
      typeof window.player.coins === "number" ? window.player.coins : 0;

    return data;
  } catch (err) {
    console.warn(
      "Saved game data appears to be corrupt or unreadable. Clearing save.",
      err
    );
    try {
      localStorage.removeItem("studyGameSave");
    } catch (e) {
      /* ignore */
    }
    return null;
  }
}

// Expose globally so other modules can call them as before.
window.saveGameData = saveGameData;
window.loadGameData = loadGameData;

// small helper to clear save if needed
window.clearGameData = function () {
  try {
    localStorage.removeItem("studyGameSave");
  } catch (e) {
    /* ignore */
  }
};
