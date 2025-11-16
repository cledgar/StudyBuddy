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

  // Render current card into the DOM
  renderCurrentCard() {
    const qEl = document.getElementById("flashcard-question");
    const aEl = document.getElementById("flashcard-answer");
    const counter = document.getElementById("flashcard-counter");
    if (!this.currentCard) {
      if (qEl) qEl.textContent = "No cards available";
      if (aEl) aEl.textContent = "";
      if (counter) counter.textContent = "0 / 0";
      return;
    }
    if (qEl) qEl.textContent = this.currentCard.question;
    if (aEl) aEl.textContent = this.currentCard.answer;
    if (counter)
      counter.textContent = `${this.cards.indexOf(this.currentCard) + 1} / ${
        this.cards.length
      }`;
    const cardEl = document.getElementById("flashcard-card");
    if (cardEl) cardEl.classList.remove("show-answer");
  }

  nextCard() {
    if (!this.cards || this.cards.length === 0) {
      this.currentCard = null;
      this.renderCurrentCard();
      return null;
    }
    this.currentCard = chooseRandom(this.cards);
    this.renderCurrentCard();
    return this.currentCard;
  }

  markCorrect() {
    if (!window.player) window.player = { coins: 0 };
    window.player.coins = (window.player.coins || 0) + 5;
    if (typeof saveGameData === "function") saveGameData();
    if (typeof renderCoinDisplay === "function") renderCoinDisplay();
    this.nextCard();
  }

  markWrong() {
    this.nextCard();
  }
}

// Wire the flashcard UI when the page loads
document.addEventListener("DOMContentLoaded", () => {
  // Ensure window.flashcards is a Flashcards instance
  if (!window.flashcards || !(window.flashcards instanceof Flashcards)) {
    const existing =
      window.flashcards && window.flashcards.cards
        ? window.flashcards.cards
        : [];
    window.flashcards = new Flashcards();
    window.flashcards.loadCards(existing);
  }

  // Flip card on click
  const cardEl = document.getElementById("flashcard-card");
  if (cardEl) {
    cardEl.addEventListener("click", () =>
      cardEl.classList.toggle("show-answer")
    );
  }

  const correctBtn = document.getElementById("flashcard-correct");
  const wrongBtn = document.getElementById("flashcard-wrong");
  if (correctBtn)
    correctBtn.addEventListener("click", () => window.flashcards.markCorrect());
  if (wrongBtn)
    wrongBtn.addEventListener("click", () => window.flashcards.markWrong());

  // show first card
  window.flashcards.nextCard();
});
