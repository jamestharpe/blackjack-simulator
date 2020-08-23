import { Card, evaluate, BLACKJACK } from "./cards";
import { Strategy, Action } from "./strategies/strategy";
import { dealerStrategy } from "./strategies/dealer-strategy";
import { basicStrategy } from "./strategies/basic-strategy";

export class Hand {
  constructor(public wager: number = 0, public cards: Card[] = []) {}

  get value() {
    return evaluate(...this.cards).value;
  }

  get busted() {
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

  get hand() {
    return this.hands[this.handIndex];
  }

  nextAction(upCard: Card) {
    const result = this.strategy(upCard, ...this.hand.cards);
    if (result === Action.Stay || result === Action.DoubleDown)
      this.handIndex++;

    return result;
  }

  settle() {
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

  get upCard() {
    return this.hand.cards[0];
  }
}
