import expect from "expect";
import { aceOfSpades, sevenOfSpades, sixOfSpades, tenOfSpades, twoOfSpades } from "../cards";
import { dealerStrategy } from "./dealer-strategy";
import { Action } from "./strategy";

describe("Dealer Strategy", () => {
	it("Hits on Soft 17", () => {
		expect(dealerStrategy(aceOfSpades, aceOfSpades, sixOfSpades)).toEqual(Action.Hit);
	});

	it("Hits on hands < 17", () => {
		expect(dealerStrategy(aceOfSpades, twoOfSpades, tenOfSpades)).toEqual(Action.Hit);
	});

	it("Stays on hands >= 17", () => {
		expect(dealerStrategy(aceOfSpades, sevenOfSpades, tenOfSpades)).toEqual(Action.Stay);
	});
});
