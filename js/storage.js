// optional, we can delete this if we want, but this would allow players to save data in the local storage. focus on this only if we have time

saveGameData() {
  let data = {
    pet: pet,
    inventory: inventory.items,
    coins: player.coins,
    flashcards: flashcards.cards,
  };

  localStorage.setItem("studyGameSave", JSON.stringify(data));
}

loadGameData() {
  let saved = localStorage.getItem("studyGameSave");
  if (!saved) return;

  let data = JSON.parse(saved);

  pet = new Pet();
  Object.assign(pet, data.pet);

  inventory = new Inventory();
  inventory.items = data.inventory;

  player.coins = data.coins;

  flashcards.cards = data.flashcards;
}
