import { EventObject, Machine } from "xstate";

export type GameEventId = "NEXT";

export interface GameEvent extends EventObject {
	type: GameEventId;
}

export interface GameSettings {
	deckCount: number;
}

export interface GameContext {}

const gameMachine = Machine<GameContext, GameEvent>(
	{
		initial: "initializing",
		strict: true,
		context: {},
		states: {
			dealing: {
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
	},
	{
		actions: {},
		guards: {},
	}
);

export default gameMachine;
