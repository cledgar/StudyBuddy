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
    this.hunger -= random(1, 5);
    this.thirst -= random(1, 5);
    this.cleanliness -= random(0, 2);

    clampValuesToZero();
  }

  feed() {
    if (inventory.has("food")) {
      inventory.remove("food");
      this.hunger += 25;
    }
  }

  giveWater() {
    if (inventory.has("water")) {
      inventory.remove("water");
      this.thirst += 25;
    }
  }

  brush() {
    if (inventory.has("brush")) {
      inventory.remove("brush");
      this.cleanliness += 30;
    }
  }
}
