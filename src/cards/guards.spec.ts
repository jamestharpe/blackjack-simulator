import expect from "expect";
import { aceOfClubs, aceOfDiamonds, aceOfSpades } from ".";
import { empty, spent } from "./guards";

describe("The Cards Guards module", () => {
	describe("The empty guard", () => {
		it("Given a context with zero cards, it returns true", () => {
			const context = { cards: [] };
			const result = empty({ context });
			expect(result).toBe(true);
		});

		it("Given a context with one card, it returns false", () => {
			const context = { cards: [aceOfSpades] };
			const result = empty({ context });
			expect(result).toBe(false);
		});
	});

	describe("The spent guard", () => {
		describe("Given a context with three cards and a cut card position of...", () => {
			const TEST_CONTEXT = { cards: [aceOfSpades, aceOfClubs, aceOfDiamonds] };

			[
				{ cutCardPosition: 0, expected: false },
				{ cutCardPosition: 1, expected: false },
				{ cutCardPosition: 2, expected: false },
				{ cutCardPosition: 3, expected: true },
				{ cutCardPosition: 4, expected: true },
			].forEach(({ cutCardPosition, expected }) => {
				it(`${cutCardPosition}, it returns false`, () => {
					const context = { ...TEST_CONTEXT, cutCardPosition };
					const result = spent({ context });
					expect(result).toBe(expected);
				});
			});
		});
	});
});
