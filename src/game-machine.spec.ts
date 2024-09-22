import expect from "expect";
import { CARDS_PER_DECK } from "./cards";
import { createGameActor } from "./game-machine";

describe("Game Actors", () => {
	it("Can deal a card", () => {
		const DECK_COUNT = 6;
		// Arrange
		const game = createGameActor({ shoeSettings: { deckCount: DECK_COUNT } }).start();

		const { value, context } = game.getSnapshot();
		expect(value).toBe("initializing");

		const cardsInShoe = context.shoe.getSnapshot().context.cards.length;
		expect(cardsInShoe).toBe(CARDS_PER_DECK * DECK_COUNT);

		const cardsInHand = context.hand.getSnapshot().context.cards.length;
		expect(cardsInHand).toBe(0);

		game.send({ type: "NEXT" });

		expect(game.getSnapshot().value).toBe("dealing");
		expect(game.getSnapshot().context.hand.getSnapshot().context.cards.length).toBe(1);
		expect(game.getSnapshot().context.shoe.getSnapshot().context.cards.length).toBe(cardsInShoe - 1);
	});
});
