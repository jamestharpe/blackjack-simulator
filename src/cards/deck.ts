import { AnyEventObject, interpret, Interpreter } from "xstate";
import { Card } from ".";
import { DeckContext, DeckMachine, DeckSettings } from "./machine";

export default class Deck {
	shuffle(): Deck {
		if (this.service.state.done) throw new Error("Cannot discard from empty deck");
		this.service.send("SHUFFLE");
		return this;
	}

	get cards(): ReadonlyArray<Card> {
		return this.service.state.context.cards;
	}

	discard(): Card {
		if (this.service.state.done) throw new Error("Cannot discard from empty deck");
		const result = this.service.send("DISCARD").context.discarded as Card;
		return result;
	}

	private service: Interpreter<
		DeckContext,
		any,
		AnyEventObject,
		{
			value: any;
			context: DeckContext;
		}
	>;

	constructor(settings: DeckSettings = { deckCount: 1 }) {
		this.service = interpret(DeckMachine.withContext({ ...DeckMachine.context, ...{ settings } })).start();
	}
}
