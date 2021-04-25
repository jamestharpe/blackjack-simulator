import { Card, Face } from "../cards";
import { evaluate } from "../rules";
import { Action, Strategy } from "./strategy";

// Based on https://www.onlinecasinohound.com/wp-content/uploads/2012/04/blackjack-strategy-print.jpg

function shouldSplit(upCard: Card, ...cards: Card[]) {
	if (cards.length !== 2) return false;

	const [c1, c2] = cards;
	if (c1.face !== c2.face) return false;

	const upCardValue = evaluate(upCard).value;

	return (
		// Always Split Aces
		c1.face === Face.Ace ||
		// Split twos and threes against two through seven
		((c1.face === Face.Two || c1.face === Face.Three) && upCardValue >= 2 && upCardValue <= 7) ||
		// Split fours against five or six
		(c1.face === Face.Four && upCardValue >= 5 && upCardValue <= 6) ||
		// Split sixes against two through six
		(c1.face === Face.Six && upCardValue >= 2 && upCardValue <= 6) ||
		// Split sevens against two through seven
		(c1.face === Face.Seven && upCardValue >= 2 && upCardValue <= 7) ||
		// Always Split Eights
		c1.face === Face.Eight ||
		// Split nines against everything except seven, ten, and ace
		(c1.face === Face.Nine && ![Face.Seven, Face.Ten, Face.Ace].some((face) => face === upCard.face))
	);
}

function shouldDouble(upCard: Card, ...cards: Card[]) {
	if (cards.length !== 2) return false;
	const upCardValue = evaluate(upCard).value;
	const { value, isSoft } = evaluate(...cards);
	return (
		(value === 9 && upCardValue >= 3 && upCardValue <= 6) ||
		(value === 10 && upCardValue >= 2 && upCardValue <= 9) ||
		(value === 11 && upCardValue >= 2 && upCardValue <= 9) ||
		(value === 13 && isSoft && upCardValue >= 5 && upCardValue <= 6) ||
		(value === 14 && isSoft && upCardValue >= 5 && upCardValue <= 6) ||
		(value === 15 && isSoft && upCardValue >= 4 && upCardValue <= 6) ||
		(value === 16 && isSoft && upCardValue >= 4 && upCardValue <= 6) ||
		(value === 17 && isSoft && upCardValue >= 3 && upCardValue <= 6) ||
		(value === 18 && isSoft && upCardValue >= 3 && upCardValue <= 6)
	);
}

function shouldHit(upCard: Card, ...cards: Card[]) {
	const upCardValue = evaluate(upCard).value;
	const { value } = evaluate(...cards);

	return (
		value <= 11 ||
		(value === 12 && !(upCardValue >= 4 && upCardValue <= 6)) ||
		(value >= 13 && value <= 16 && upCardValue >= 7)
	);
}

export const basicStrategy: Strategy = (upCard: Card, ...cards: Card[]) => {
	return shouldSplit(upCard, ...cards)
		? Action.Split
		: shouldDouble(upCard, ...cards)
		? Action.DoubleDown
		: shouldHit(upCard, ...cards)
		? Action.Hit
		: Action.Stay;
};
