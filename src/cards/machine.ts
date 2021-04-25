import { assign, EventObject, Machine } from "xstate";
import { Card, default as allCards } from ".";
import shuffle from "../utils/shuffle";

export type DeckEventId = "SHUFFLE" | "DISCARD";

export interface DeckEvent extends EventObject {
	type: DeckEventId;
}

export interface DeckSettings {
	deckCount: number;
}

export interface DeckContext {
	readonly settings: DeckSettings;
	readonly cards: ReadonlyArray<Card>;
	readonly discarded?: Card;
}

export const DeckMachine = Machine<DeckContext, DeckEvent>(
	{
		initial: "initializing",
		strict: true,
		context: {
			settings: {
				deckCount: 1,
			},
			cards: [],
		},
		states: {
			initializing: {
				entry: ["initialize"],
				always: { target: "ready" },
			},
			ready: {
				on: {
					SHUFFLE: "shuffling",
					DISCARD: "discarding",
				},
			},
			shuffling: {
				entry: ["shuffle"],
				always: { target: "ready" },
			},
			discarding: {
				entry: ["discard"],
				always: [{ target: "empty", cond: "empty" }, { target: "ready" }],
			},
			empty: {
				type: "final",
			},
		},
	},
	{
		actions: {
			initialize: assign({
				cards: (context) =>
					Array(context.settings.deckCount)
						.fill([...allCards])
						.reduce((result, copy) => result.concat(copy)),
			}),
			shuffle: assign({
				cards: ({ cards }) => shuffle(cards),
			}),
			discard: assign((context) => {
				const cards = [...context.cards];
				const discarded = cards.shift();
				return {
					cards,
					discarded,
				};
			}),
		},
		guards: {
			empty: (context) => context.cards.length === 0,
		},
	}
);
