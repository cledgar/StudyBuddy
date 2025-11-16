// pet logic, such as needs and anything else we want to add

//also feel free to get rid of anything if you dont think we'll need it, or add whatever! + feel free to stub out anything we dont have the resources for yet

// i havent done any pet logic yet. this is where i want things like the need decay of the pet (hunger and thirst and such go down to incentivize players to
// do flashcards to get money and feed their pet) as well as the ability to provide for the pet please also add some sort of consequence for failing to meet
// your pet's needs

class Pet {
  constructor() {
    this.name = "Your Pet";
    this.type = "cat";

    // ranges 0–100
    this.hunger = 100;
    this.thirst = 100;
    this.cleanliness = 100;
  }

  updateNeeds() {
    // use helpers from js/helpers.js (random & clamp)
    this.hunger = clamp(this.hunger - random(1, 5), 0, 100);
    this.thirst = clamp(this.thirst - random(1, 5), 0, 100);
    this.cleanliness = clamp(this.cleanliness - random(0, 2), 0, 100);

    // simple consequence: if both hunger and thirst are zero, penalize coins slightly
    if (this.hunger === 0 || this.thirst === 0) {
      if (window.player && typeof window.player.coins === "number") {
        window.player.coins = Math.max(0, window.player.coins - 1);
        if (typeof renderCoinDisplay === "function") renderCoinDisplay();
      }
    }
    if (typeof saveGameData === "function") saveGameData();
  }

  feed() {
    if (inventory.has("food")) {
      inventory.remove("food");
      this.hunger = clamp(this.hunger + 25, 0, 100);
      if (typeof updatePetUI === "function") updatePetUI();
      if (typeof saveGameData === "function") saveGameData();
      return true;
    }
    return false;
  }

  giveWater() {
    if (inventory.has("water")) {
      inventory.remove("water");
      this.thirst = clamp(this.thirst + 25, 0, 100);
      if (typeof updatePetUI === "function") updatePetUI();
      if (typeof saveGameData === "function") saveGameData();
      return true;
    }
    return false;
  }

  brush() {
    if (inventory.has("brush")) {
      inventory.remove("brush");
      this.cleanliness = clamp(this.cleanliness + 30, 0, 100);
      if (typeof updatePetUI === "function") updatePetUI();
      if (typeof saveGameData === "function") saveGameData();
      return true;
    }
    return false;
  }
}
