import expect from "expect";
import CARDS, { aceOfSpades, card, CARDS_PER_DECK, Face, Suit } from ".";

describe("The Cards module", () => {
	describe("The CARDS_PER_DECK number const", () => {
		it("is 52", () => {
			expect(CARDS_PER_DECK).toBe(52);
		});
	});

	describe("The CARDS read-only array const", () => {
		it("Has a length equal to CARDS_PER_DECK", () => {
			expect(CARDS.length).toBe(CARDS_PER_DECK);
		});
	});

	describe("The card function", () => {
		it("returns the card specified by the arguments", () => {
			const aceOfSpadesCard = card(Face.Ace, Suit.Spades);
			expect(aceOfSpadesCard.face).toEqual(Face.Ace);
			expect(aceOfSpadesCard.suit).toEqual(Suit.Spades);
		});
	});

	describe("The card.is function", () => {
		it("returns true for the same card", () => {
			const aceOfSpadesCard = card(Face.Ace, Suit.Spades);
			expect(aceOfSpadesCard.is(aceOfSpades)).toBe(true);
		});

		it("returns false for a different card", () => {
			expect(aceOfSpades.is(card(Face.Ace, Suit.Clubs))).toBe(false);
		});
	});

	describe("The card.toString function", () => {
		it("returns a string representation of the card", () => {
			expect(aceOfSpades.toString()).toBe("Ace of Spades");
		});
	});
});
