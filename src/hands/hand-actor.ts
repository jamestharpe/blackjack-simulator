import { assign, createActor, setup } from "xstate";
import { Card } from "../cards";
import { empty } from "../cards/guards";

export type HandContext = {
	cards: ReadonlyArray<Card>;
};

export type ReceiveEvent = {
	type: "RECEIVE";
	card: Card;
};

export type HandEvent = ReceiveEvent;

const _createHandMachine = () =>
	setup({
		types: {
			context: {} as HandContext,
			events: {} as HandEvent,
		},
		actions: {
			receive: assign((assignment) => ({
				cards: [...assignment.context.cards, assignment.event.card],
			})),
		},
		guards: {
			empty,
		},
	}).createMachine({
		context: {
			cards: [],
		},
		id: "hand",
		initial: "receiving",
		states: {
			receiving: {
				on: {
					RECEIVE: {
						actions: ["receive"],
					},
				},
			},
		},
	});

const _createHandActor = () => createActor(_createHandMachine());

type HandMachine = ReturnType<typeof _createHandMachine>;
export type HandActor = ReturnType<typeof _createHandActor>;
export const createHandMachine = (): HandMachine => _createHandMachine();
export const createHandActor = (): HandActor => _createHandActor();
