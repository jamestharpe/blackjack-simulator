import { BLACKJACK, Card, evaluate } from "./cards/cards";
import { basicStrategy } from "./strategies/basic-strategy";
import { dealerStrategy } from "./strategies/dealer-strategy";
import { Action, Strategy } from "./strategies/strategy";

export class Hand {
  constructor(public wager: number = 0, public cards: Card[] = []) {}

  get value(): number {
    return evaluate(...this.cards).value;
  }

  get busted(): boolean {
    return this.value > BLACKJACK;
  }
}

export class Player {
  handIndex = 0;
  hands: Hand[] = [new Hand()];
	
  constructor(
    public name: string = "Player",
    public bank: number = 0,
    public strategy: Strategy = basicStrategy
  ) {}

  get hand(): Hand {
    return this.hands[this.handIndex];
  }

  nextAction(upCard: Card): Action {
    const result = this.strategy(upCard, ...this.hand.cards);
    if (result === Action.Stay || result === Action.DoubleDown)
      this.handIndex++;

    return result;
  }

  settle(): void {
    this.bank += this.hands
      .map((hand) => hand.wager)
      .reduce((prev, curr) => prev + curr, 0);
    console.log(`${this.name} has $${this.bank}`);
    this.hands = [new Hand()];
    this.handIndex = 0;
  }
}

export class Dealer extends Player {
  constructor(public name: string = "Dealer") {
    super(name, 0, dealerStrategy);
  }

  get upCard(): Card {
    return this.hand.cards[0];
  }
}
