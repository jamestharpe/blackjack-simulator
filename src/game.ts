import { Card } from "./cards";
import Deck from "./cards/deck";
import { Dealer, Hand, Player } from "./player";
import { BLACKJACK, evaluate } from "./rules";
import { Action } from "./strategies/strategy";

export enum GameState {
	// Time to...
	Deal = "Deal",
	Play = "Play",
	Settle = "Settle",
	End = "End",
}

export interface GameConfig {
	numberOfPlayers: number;
}

export class Game {
	deck = new Deck().shuffle();
	players: Player[];
	playerIndex = 0;
	state: GameState = GameState.Deal;

	constructor(config: GameConfig = { numberOfPlayers: 1 }) {
		if (config.numberOfPlayers < 1) throw new Error("Not enough players");

		const players: Player[] = [];
		for (let i = 1; i <= config.numberOfPlayers; i++) {
			players.push(new Player(`Player ${i}`));
		}
		this.players = [...players, new Dealer()];
	}

	get dealer(): Dealer {
		return <Dealer>this.players[this.players.length - 1];
	}

	get player(): Player {
		return this.players[this.playerIndex];
	}

	get minimumCards(): number {
		return this.players.length * 8;
	}

	next(): Game {
		return this[this.state]();
	}

	private [GameState.Deal]() {
		if (this.state !== GameState.Deal) throw new Error(`Unexpected Game State: ${this.state}`);

		this.players.forEach((player) => player.hand.cards.push(<Card>this.deck.discard(), <Card>this.deck.discard()));
		this.playerIndex = 0;
		this.state = GameState.Play;
		return this;
	}

	private hit(hand: Hand) {
		if (!this.player) throw new Error(`There is no current player`);
		if (hand.value > BLACKJACK) throw new Error(`Cannot hit a hand with a value greater than ${BLACKJACK}`);

		hand.cards.push(<Card>this.deck.discard());
		return this.player.hand;
	}

	private split() {
		if (!this.player) throw new Error(`There is no current player`);
		if (this.player.hand.cards.length !== 2)
			throw new Error(`Cannot split a hand with ${this.player.hand.cards.length} cards`);

		const [cardOne, cardTwo] = this.player.hand.cards;
		if (evaluate(cardOne).value !== evaluate(cardTwo).value)
			throw new Error(`Cannot split ${cardOne.face} and ${cardTwo.face}`);

		this.player.hands.push(new Hand(this.player.hand.wager, [<Card>this.player.hand.cards.pop()]));

		return this.player.hand;
	}

	private [GameState.Play]() {
		while (this.player && this.player.hand) {
			const hand = this.player.hand;
			const action = this.player.nextAction(this.dealer.upCard);
			switch (action) {
				case Action.Hit:
				case Action.DoubleDown:
					this.hit(hand);
					break;
				case Action.Split:
					this.split();
					break;
				case Action.Stay:
					break;
				default:
					throw new Error(`Unknown action: ${action}`);
			}
			console.log(
				`${this.player.name} chose to ${action}`,
				this.player.hands.map((h) => h.cards),
				this.player.hands.map((h) => h.value)
			);
			if (!this.player.hand) this.playerIndex++;
		}

		this.state = GameState.Settle;
		return this;
	}

	private [GameState.Settle]() {
		// TODO: Write this method
		this.players.forEach((player) => player.settle());
		this.state = this.deck.cards.length > this.minimumCards ? GameState.Deal : GameState.End;

		this.playerIndex = 0;
		console.log(`Game settled\n`);
		return this;
	}

	private [GameState.End]() {
		console.log("Game has completed!");
		return this;
	}
}

const game = new Game({ numberOfPlayers: 2 });
while (game.state !== GameState.End) {
	game.next();
}
