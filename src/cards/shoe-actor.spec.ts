import expect from "expect";
import CARDS, { Card } from ".";
import { ShoeActor, ShoeEvent, createShoeActor } from "./shoe-actor";

describe("ShoeActors", () => {
	describe("Given a single-deck shoe with a cut card position of 26", () => {
		let shoe: ShoeActor;
		beforeEach(() => {
			shoe = createShoeActor({ deckCount: 1, cutCardPosition: 26 }).start();
		});

		describe("When the shoe is started", () => {
			it("The initial state is 'ready'", () => {
				expect(shoe.getSnapshot().value).toBe("ready");
			});

			it("The context contains an un-shuffled standard deck of cards", () => {
				expect(shoe.getSnapshot().context.cards).toEqual(CARDS);
			});

			it("It can be shuffled", () => {
				expect(shoe.getSnapshot().can({ type: "SHUFFLE" })).toBe(true);
			});

			it("It can be drawn from", () => {
				expect(shoe.getSnapshot().can({ type: "DRAW" })).toBe(true);
			});
		});

		describe("When the shoe is shuffled", () => {
			beforeEach(() => {
				shoe.send({ type: "SHUFFLE" });
			});

			it("Reorders the cards", () => {
				console.log("Checking card order");
				expect(shoe.getSnapshot().context.cards).not.toEqual(CARDS);
			});
		});

		describe("When the shoe is drawn from once", () => {
			let receivedCard: Card;
			let topCard: Card;
			beforeEach(() => {
				topCard = shoe.getSnapshot().context.cards[0];
				shoe.send({ type: "DRAW", receiver: (card) => (receivedCard = card) });
			});

			it("The received card is from the top of the deck", () => {
				expect(receivedCard).toBe(topCard);
			});

			it("The received card is removed from the deck", () => {
				expect(shoe.getSnapshot().context.cards.find((card) => card.is(receivedCard))).toBeUndefined();
				expect(shoe.getSnapshot().context.cards.length).toEqual(CARDS.length - 1);
			});
		});

		[
			{ drawCount: 25, expectedState: "ready", expectedCan: "DRAW" },
			{ drawCount: 26, expectedState: "spent", expectedCan: "DRAW" },
			{ drawCount: 27, expectedState: "spent", expectedCan: "DRAW" },
		].map((testCase) => {
			describe(`When the shoe is drawn from ${testCase.drawCount} times`, () => {
				beforeEach(() => {
					for (let i = 1; i <= testCase.drawCount; i++) {
						shoe.send({ type: "DRAW" });
					}
				});

				it(`The shoe state is '${testCase.expectedState}'`, () => {
					expect(shoe.getSnapshot().value).toBe(testCase.expectedState);
				});

				it(`The '${testCase.expectedCan}' action is available`, () => {
					expect(shoe.getSnapshot().can({ type: testCase.expectedCan } as ShoeEvent)).toBe(true);
				});
			});
		});

		describe("When the shoe is drawn down completely", () => {
			beforeEach(() => {
				const cardCount = shoe.getSnapshot().context.cards.length;
				for (let i = 1; i <= cardCount; i++) {
					shoe.send({ type: "DRAW" });
				}
			});

			it("The state is 'empty'", () => {
				expect(shoe.getSnapshot().value).toBe("empty");
			});

			it("It can no longer be drawn from", () => {
				expect(shoe.getSnapshot().can({ type: "DRAW" })).toBe(false);
			});

			it("It can no longer be shuffled", () => {
				expect(shoe.getSnapshot().can({ type: "SHUFFLE" })).toBe(false);
			});
		});
	});
});
