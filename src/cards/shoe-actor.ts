import { assert } from "console";
import { assign, createActor, setup } from "xstate";
import CARDS, { Card } from ".";
import shuffle from "../utils/shuffle";
import { empty, spent } from "./guards";

type ShuffleEvent = { type: "SHUFFLE" };
type DrawEvent = { type: "DRAW"; receiver?: (card: Card) => void };

export type ShoeEvent = ShuffleEvent | DrawEvent;

export type ShoeSettings = {
	deckCount: number;
	cutCardPosition: number;
};

export interface ShoeContext {
	readonly cards: ReadonlyArray<Card>;
	readonly cutCardPosition: number;
}

const createDecks = (count: number): ReadonlyArray<Card> =>
	Array(count)
		.fill([...CARDS])
		.reduce((result, copy) => result.concat(copy));

const _createShoeMachine = (settings: ShoeSettings) =>
	setup({
		types: {
			context: {} as ShoeContext,
			events: {} as ShoeEvent,
		},
		actions: {
			shuffle: assign(({ context }) => ({
				cards: shuffle(context.cards),
			})),
			draw: assign(({ context, event }) => {
				const { receiver } = event as DrawEvent;

				const cards = [...context.cards];
				const drawnCard = cards.shift() as Card;
				assert(drawnCard, "Draw action called on an empty shoe");

				receiver?.(drawnCard);

				return { cards };
			}),
		},
		guards: {
			empty,
			spent,
		},
	}).createMachine({
		context: {
			cards: createDecks(settings.deckCount),
			cutCardPosition: settings.cutCardPosition,
		},
		id: "shoe",
		initial: "ready",
		states: {
			ready: {
				on: {
					SHUFFLE: "shuffling",
					DRAW: "drawing",
				},
			},
			shuffling: {
				always: {
					target: "ready",
				},
				entry: {
					type: "shuffle",
				},
			},
			drawing: {
				entry: {
					type: "draw",
				},
				always: [
					{
						target: "empty",
						guard: "empty",
					},
					{
						target: "spent",
						guard: "spent",
					},
					{
						target: "ready",
					},
				],
			},
			spent: {
				on: {
					DRAW: "drawing",
				},
			},
			empty: {
				type: "final",
			},
		},
	});

const _createShoeActor = (settings: ShoeSettings) => createActor(_createShoeMachine(settings)).start();

export type ShoeActor = ReturnType<typeof _createShoeActor>;
export const createShoeActor = (settings: ShoeSettings): ShoeActor => createActor(_createShoeMachine(settings));
