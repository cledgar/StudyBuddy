// flashcard logic

// need flashcard functionality-- ability to flip from question to answer, and a way to score points by being correct. 
// this can be done with typing in a correct answer or self-confirmation. up to you all doing backend to decide this

class Flashcards {
  constructor() {
    this.cards = [];  // { question: "...", answer: "..." }
    this.currentCard = null;
  }

  loadCards(array) {
    this.cards = array;
  }

  randomCard() {
    this.currentCard = chooseRandom(this.cards);
    return this.currentCard.question;
  }

  checkAnswer(userAnswer) {
    if (userAnswer.trim().toLowerCase() === 
        this.currentCard.answer.toLowerCase()) {
      // might wannt to remove this and/or add an option for users to simply check their 
      // own answers in case they have a topic that's hard to type exact answers in for

      player.coins += 5;   // reward
      saveGameData();
      return true;
    }
    return false;
  }
}
