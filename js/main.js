// main game loop & event listener pseudocode mockup

onPageLoad() {
  loadGameData();
  renderUI();
  startGameLoop();
}

startGameLoop() {
  setInterval(() => {
    pet.updateNeeds();
    updatePetUI();
  }, 30000);   // every 30 seconds
}
