import expect from "expect";
import {
	aceOfSpades,
	BLACKJACK, Card, Deck,
	evaluate, Face,
	Suit,
	tenOfClubs,
	twoOfSpades
} from "./cards";

describe("Deck of Cards", () => {
  it("Initializes with 52 cards", () => {
    const deck = new Deck();
    expect(deck.cards.length).toEqual(52);
  });

  describe("shuffle", () => {
    const deck = new Deck();
    const cards = deck.cards.map((c) => c); // Copy
	
	it("shuffles the cards", () => {
		expect(deck.shuffle().cards).not.toEqual(cards);
	})
  });
});

describe("Cards", () => {
  it("Initializes with suit and face", () => {
    const card = new Card(Face.Ace, Suit.Clubs);
    expect(card).toEqual({ face: Face.Ace, suit: Suit.Clubs });
  });
});

describe("Evaluate", () => {
  it("evaluates", () => {
    const tests = [
      {
        cards: [aceOfSpades, tenOfClubs],
        expected: { value: BLACKJACK, isSoft: true },
      },
      {
        cards: [twoOfSpades, tenOfClubs],
        expected: { value: 12, isSoft: false },
      },
    ];

    tests.forEach((test) => {
      const { isSoft, value } = evaluate(...test.cards);
      expect(isSoft).toEqual(test.expected.isSoft);
      expect(value).toBe(test.expected.value);
    });

    const { isSoft, value } = evaluate(aceOfSpades, tenOfClubs);
    expect(isSoft).toBe(true);
    expect(value).toBe(BLACKJACK);
  });
});
