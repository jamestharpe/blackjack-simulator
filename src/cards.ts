export enum Face {
  Ace = "Ace",
  Two = "Two",
  Three = "Three",
  Four = "Four",
  Five = "Five",
  Six = "Six",
  Seven = "Seven",
  Eight = "Eight",
  Nine = "Nine",
  Ten = "Ten",
  Jack = "Jack",
  Queen = "Queen",
  King = "King",
}

export enum Suit {
  Hearts = "Hearts",
  Diamonds = "Diamonds",
  Clubs = "Clubs",
  Spades = "Spades",
}

export class Card {
  constructor(public face: Face, public suit: Suit) {}

  toString() {
    return this.face + " of " + this.suit;
  }
}

export const aceOfSpades = new Card(Face.Ace, Suit.Spades);
export const aceOfClubs = new Card(Face.Ace, Suit.Clubs);
export const aceOfHearts = new Card(Face.Ace, Suit.Hearts);
export const aceOfDiamonds = new Card(Face.Ace, Suit.Diamonds);

export const twoOfSpades = new Card(Face.Two, Suit.Spades);
export const twoOfClubs = new Card(Face.Two, Suit.Clubs);
export const twoOfHearts = new Card(Face.Two, Suit.Hearts);
export const twoOfDiamonds = new Card(Face.Two, Suit.Diamonds);

export const threeOfSpades = new Card(Face.Three, Suit.Spades);
export const threeOfClubs = new Card(Face.Three, Suit.Clubs);
export const threeOfHearts = new Card(Face.Three, Suit.Hearts);
export const threeOfDiamonds = new Card(Face.Three, Suit.Diamonds);

export const fourOfSpades = new Card(Face.Four, Suit.Spades);
export const fourOfClubs = new Card(Face.Four, Suit.Clubs);
export const fourOfHearts = new Card(Face.Four, Suit.Hearts);
export const fourOfDiamonds = new Card(Face.Four, Suit.Diamonds);

export const fiveOfSpades = new Card(Face.Five, Suit.Spades);
export const fiveOfClubs = new Card(Face.Five, Suit.Clubs);
export const fiveOfHearts = new Card(Face.Five, Suit.Hearts);
export const fiveOfDiamonds = new Card(Face.Five, Suit.Diamonds);

export const sixOfSpades = new Card(Face.Six, Suit.Spades);
export const sixOfClubs = new Card(Face.Six, Suit.Clubs);
export const sixOfHearts = new Card(Face.Six, Suit.Hearts);
export const sixOfDiamonds = new Card(Face.Six, Suit.Diamonds);

export const sevenOfSpades = new Card(Face.Seven, Suit.Spades);
export const sevenOfClubs = new Card(Face.Seven, Suit.Clubs);
export const sevenOfHearts = new Card(Face.Seven, Suit.Hearts);
export const sevenOfDiamonds = new Card(Face.Seven, Suit.Diamonds);

export const eightOfSpades = new Card(Face.Eight, Suit.Spades);
export const eightOfClubs = new Card(Face.Eight, Suit.Clubs);
export const eightOfHearts = new Card(Face.Eight, Suit.Hearts);
export const eightOfDiamonds = new Card(Face.Eight, Suit.Diamonds);

export const nineOfSpades = new Card(Face.Nine, Suit.Spades);
export const nineOfClubs = new Card(Face.Nine, Suit.Clubs);
export const nineOfHearts = new Card(Face.Nine, Suit.Hearts);
export const nineOfDiamonds = new Card(Face.Nine, Suit.Diamonds);

export const tenOfSpades = new Card(Face.Ten, Suit.Spades);
export const tenOfClubs = new Card(Face.Ten, Suit.Clubs);
export const tenOfHearts = new Card(Face.Ten, Suit.Hearts);
export const tenOfDiamonds = new Card(Face.Ten, Suit.Diamonds);

export class Deck {
  shuffle(): Deck {
    for (
      let currentIndex = 0;
      currentIndex < this.cards.length;
      currentIndex++
    ) {
      const newIndex = Math.floor(
        Math.random() * (this.cards.length - 1 - 0 + 1) + 0
      );
      const card = this.cards[currentIndex];
      this.cards[currentIndex] = this.cards[newIndex];
      this.cards[newIndex] = card;
    }

    return this;
  }

  cards: Card[] = [];

  constructor() {
    for (const face of Object.values(Face)) {
      for (const suit of Object.values(Suit)) {
        this.cards.push(new Card(face as Face, suit as Suit));
      }
    }
  }
}

export const BLACKJACK = 21;

export function evaluate(...cards: Card[]) {
  const values = {
    Ace: 1,
    Two: 2,
    Three: 3,
    Four: 4,
    Five: 5,
    Six: 6,
    Seven: 7,
    Eight: 8,
    Nine: 9,
    Ten: 10,
    Jack: 10,
    Queen: 10,
    King: 10,
  };

  const aces = cards.filter((c) => c.face === Face.Ace);
  let value = cards.reduce((value, current) => {
    return value + values[current.face];
  }, 0);

  const isSoft = value <= 11 && aces.length > 0;
  while (value <= 11 && aces.pop()) {
    value += 10;
  }

  return { value, isSoft };
}
