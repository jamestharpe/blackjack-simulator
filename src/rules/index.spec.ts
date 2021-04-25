import expect from "expect";
import { BLACKJACK, evaluate } from ".";
import { aceOfSpades, tenOfClubs, twoOfSpades } from "../cards";

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
