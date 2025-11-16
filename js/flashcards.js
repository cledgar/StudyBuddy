// flashcard logic

// need flashcard functionality-- ability to flip from question to answer, and a way to score points by being correct. 
// this can be done with typing in a correct answer or self-confirmation. up to you all doing backend to decide this

class Flashcards {
  constructor() {
    this.cards = [];
    this.currentCard = null;
    this.score = 0;
  }

  loadCards() {
    this.cards = [
      { q: "What's the tallest mountain in the world?", a: "Mount Everest" },
      { q: "What's the largest country by land?", a: "Russia" },
      { q: "What is the most spoken language in the world?", a: "English" },
      { q: "Whats the root of 252?", a: "15.87" },
      { q: "Who discovered the black hole?", a: "John Michell" },
      { q: "What's the capital of Switzerland?", a: "Bern" },
      { q: "Who said 'to be or not to be'?", a: "Shakespeare" },
      { q: "What is the process of liquid turning into gas?", a: "Evaporation" },
      { q: "Whats the lightest element?", a: "Hydrogen" },
      { q: "What elements is salt made of?", a: "Sodium and Chlorine" },
      { q: "How many letters in the English alphabet?", a: "26" },
      { q: "What does 'function' mean in math?", a: "Mapping input to output" },
      { q: "In triangle if one column is twice the second, what is the last?", a: "Cannot be determined" },
      { q: "Who wrote Hamlet?", a: "Shakespeare" },
      { q: "When did WW1 start?", a: "1914" },
      { q: "Who made the largest empire ever?", a: "Genghis Khan" },
      { q: "Where does sugar come from?", a: "Sugarcane" }
    ];
  }

  randomCard() {
    const i = Math.floor(Math.random() * this.cards.length);
    this.currentCard = this.cards[i];
    return this.currentCard.q;
  }

  revealAnswer() {
    return this.currentCard.a;
  }

 selfValidate(userSaysCorrect) {
    if (userSaysCorrect) {
      window.player.coins += 5;
      saveGameData();
      return true;
    }
    return false;
  }
}

module.exports = Flashcards;


