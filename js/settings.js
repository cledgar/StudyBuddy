// logic for the settings page

onSettingsLoad() {
  loadGameData();
  populateFlashcardEditor();
  populatePetOptions();
}

addFlashcard(question, answer) {
  gameData.flashcards.push({ question, answer });
  saveGameData();
}

deleteFlashcard(index) {
  gameData.flashcards.splice(index, 1);
  saveGameData();
}

changePetType(newType) {
  gameData.pet.type = newType;
  saveGameData();
}
