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

export type Card = {
	readonly face: Face;
	readonly suit: Suit;
	readonly toString: () => string;
	readonly is: (card: Card) => boolean;
};

class CardImpl implements Card {
	constructor(public readonly face: Face, public readonly suit: Suit) {}

	readonly toString = () => `${this.face} of ${this.suit}`;
	readonly is = (card: Card) => this.face === card.face && this.suit === card.suit;
}

const CARDS: ReadonlyArray<Card> = Object.values(Face)
	.map((face) => Object.values(Suit).map((suit) => new CardImpl(face, suit)))
	.reduce((result, cards) => result.concat(cards), []);

export const CARDS_PER_DECK = CARDS.length;

export default CARDS;

export const card = (face: Face, suit: Suit): Card => CARDS.find((c) => c.face === face && c.suit === suit) as Card;

export const aceOfSpades = card(Face.Ace, Suit.Spades);
export const aceOfClubs = card(Face.Ace, Suit.Clubs);
export const aceOfHearts = card(Face.Ace, Suit.Hearts);
export const aceOfDiamonds = card(Face.Ace, Suit.Diamonds);

export const twoOfSpades = card(Face.Two, Suit.Spades);
export const twoOfClubs = card(Face.Two, Suit.Clubs);
export const twoOfHearts = card(Face.Two, Suit.Hearts);
export const twoOfDiamonds = card(Face.Two, Suit.Diamonds);

export const threeOfSpades = card(Face.Three, Suit.Spades);
export const threeOfClubs = card(Face.Three, Suit.Clubs);
export const threeOfHearts = card(Face.Three, Suit.Hearts);
export const threeOfDiamonds = card(Face.Three, Suit.Diamonds);

export const fourOfSpades = card(Face.Four, Suit.Spades);
export const fourOfClubs = card(Face.Four, Suit.Clubs);
export const fourOfHearts = card(Face.Four, Suit.Hearts);
export const fourOfDiamonds = card(Face.Four, Suit.Diamonds);

export const fiveOfSpades = card(Face.Five, Suit.Spades);
export const fiveOfClubs = card(Face.Five, Suit.Clubs);
export const fiveOfHearts = card(Face.Five, Suit.Hearts);
export const fiveOfDiamonds = card(Face.Five, Suit.Diamonds);

export const sixOfSpades = card(Face.Six, Suit.Spades);
export const sixOfClubs = card(Face.Six, Suit.Clubs);
export const sixOfHearts = card(Face.Six, Suit.Hearts);
export const sixOfDiamonds = card(Face.Six, Suit.Diamonds);

export const sevenOfSpades = card(Face.Seven, Suit.Spades);
export const sevenOfClubs = card(Face.Seven, Suit.Clubs);
export const sevenOfHearts = card(Face.Seven, Suit.Hearts);
export const sevenOfDiamonds = card(Face.Seven, Suit.Diamonds);

export const eightOfSpades = card(Face.Eight, Suit.Spades);
export const eightOfClubs = card(Face.Eight, Suit.Clubs);
export const eightOfHearts = card(Face.Eight, Suit.Hearts);
export const eightOfDiamonds = card(Face.Eight, Suit.Diamonds);

export const nineOfSpades = card(Face.Nine, Suit.Spades);
export const nineOfClubs = card(Face.Nine, Suit.Clubs);
export const nineOfHearts = card(Face.Nine, Suit.Hearts);
export const nineOfDiamonds = card(Face.Nine, Suit.Diamonds);

export const tenOfSpades = card(Face.Ten, Suit.Spades);
export const tenOfClubs = card(Face.Ten, Suit.Clubs);
export const tenOfHearts = card(Face.Ten, Suit.Hearts);
export const tenOfDiamonds = card(Face.Ten, Suit.Diamonds);

export const jackOfSpades = card(Face.Jack, Suit.Spades);
export const jackOfClubs = card(Face.Jack, Suit.Clubs);
export const jackOfHearts = card(Face.Jack, Suit.Hearts);
export const jackOfDiamonds = card(Face.Jack, Suit.Diamonds);

export const queenOfSpades = card(Face.Queen, Suit.Spades);
export const queenOfClubs = card(Face.Queen, Suit.Clubs);
export const queenOfHearts = card(Face.Queen, Suit.Hearts);
export const queenOfDiamonds = card(Face.Queen, Suit.Diamonds);

export const kingOfSpades = card(Face.King, Suit.Spades);
export const kingOfClubs = card(Face.King, Suit.Clubs);
export const kingOfHearts = card(Face.King, Suit.Hearts);
export const kingOfDiamonds = card(Face.King, Suit.Diamonds);
