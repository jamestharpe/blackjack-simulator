import expect from "expect";
import cards, { aceOfHearts, Card } from ".";
import Deck from "./deck";

describe("Deck of Cards", () => {
	describe("Given a default deck", () => {
		let deck: Deck;

		beforeEach(() => {
			deck = new Deck();
			console.log("Deck Created");
		});

		it("When initialized, it has 52 cards by default", () => {
			expect(deck.cards.length).toEqual(52);
		});

		it("When shuffle() is called, it shuffles the cards", () => {
			const cards = [...deck.cards];
			expect(deck.shuffle().cards).not.toEqual(cards);
		});

		describe("When discard() is called, it...", () => {
			let discarded: Card;
			beforeEach(() => {
				discarded = deck.discard();
			});

			it("Removes the top card", () => {
				expect(discarded).toBe(aceOfHearts);
				expect(deck.cards.length).toBe(51);
			});

			it("Errors when the deck is empty", () => {
				while (deck.cards.length > 0) deck.discard();
				expect(() => deck.discard()).toThrowError("Cannot discard from empty deck");
			});
		});
	});

	describe("Given a six deck shoe", () => {
		let deck: Deck;

		beforeEach(() => {
			deck = new Deck({ deckCount: 6 });
		});

		it("Initializes with six decks of cards", () => {
			expect(deck.cards.length).toEqual(cards.length * 6);
		});
	});
});
