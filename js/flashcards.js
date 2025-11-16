// flashcard logic

// need flashcard functionality-- ability to flip from question to answer, and a way to score points by being correct.
// this can be done with typing in a correct answer or self-confirmation. up to you all doing backend to decide this

class Flashcards {
  constructor() {
    this.cards = []; // { question: "...", answer: "..." }
    this.currentCard = null;
  }

  loadCards(array) {
    this.cards = array;
  }

  randomCard() {
    this.currentCard = chooseRandom(this.cards);
    if (!this.currentCard) return null;
    return this.currentCard.question;
  }

  checkAnswer(userAnswer) {
    if (!this.currentCard) return false;
    if (
      userAnswer.trim().toLowerCase() === this.currentCard.answer.toLowerCase()
    ) {
      // might wannt to remove this and/or add an option for users to simply check their
      // own answers in case they have a topic that's hard to type exact answers in for

      player.coins += 5; // reward
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
