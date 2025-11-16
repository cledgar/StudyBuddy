// logic for the settings page

// i want things here for utility, such as the functions i've listed. i would also like the ability to change the pet's name, which i forgot to add

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
