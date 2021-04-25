import { Card, Face } from "../cards";

export const BLACKJACK = 21;

export function evaluate(...cards: Card[]): { value: number; isSoft: boolean } {
	const values = {
		Ace: 1,
		Two: 2,
		Three: 3,
		Four: 4,
		Five: 5,
		Six: 6,
		Seven: 7,
		Eight: 8,
		Nine: 9,
		Ten: 10,
		Jack: 10,
		Queen: 10,
		King: 10,
	};

	const aces = cards.filter((c) => c.face === Face.Ace);
	let value = cards.reduce((value, current) => {
		return value + values[current.face];
	}, 0);

	const isSoft = value <= 11 && aces.length > 0;
	while (value <= 11 && aces.pop()) {
		value += 10;
	}

	return { value, isSoft };
}
