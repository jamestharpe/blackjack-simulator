import { createActor, EventObject, setup } from "xstate";
import { createShoeActor, ShoeActor, ShoeSettings } from "./cards/shoe-actor";
import { createHandActor, HandActor } from "./hands/hand-actor";

export type GameEventId = "NEXT";

export interface GameEvent extends EventObject {
	type: GameEventId;
}

export interface GameContext {
	shoe: ShoeActor;
	hand: HandActor;
}

export type GameSettings = {
	shoeSettings: ShoeSettings;
};

const _createGameMachine = (settings: GameSettings) =>
	setup({
		types: {
			context: {} as GameContext,
			events: {} as GameEvent,
		},
		actions: {
			deal: ({ context }) =>
				context.shoe.send({
					type: "DRAW",
					receiver: (card) => context.hand.send({ type: "RECEIVE", card }),
				}),
		},
		guards: {
			//
		},
	}).createMachine({
		context: {
			shoe: createShoeActor(settings.shoeSettings).start(),
			hand: createHandActor().start(),
		},
		id: "game",
		initial: "initializing",
		states: {
			initializing: {
				on: {
					NEXT: "dealing",
				},
			},
			dealing: {
				entry: "deal",
				on: {
					NEXT: "playing",
				},
			},
			playing: {
				on: {
					NEXT: "settling",
				},
			},
			settling: {
				on: {
					NEXT: "ended",
				},
			},
			ended: {
				type: "final",
			},
		},
	});

const _createGameActor = (settings: GameSettings) => createActor(_createGameMachine(settings));

type GameMachine = ReturnType<typeof _createGameMachine>;
export type GameActor = ReturnType<typeof _createGameActor>;
export const createGameMachine = (settings: GameSettings): GameMachine => _createGameMachine(settings);
export const createGameActor = (settings: GameSettings): GameActor => _createGameActor(settings);
