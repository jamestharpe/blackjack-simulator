import { Card, evaluate } from "../cards";
import { Action, Strategy } from "./strategy";

export const dealerStrategy: Strategy = (upCard: Card, ...cards: Card[]) => {
  const { isSoft, value } = evaluate(...cards);
  if (value < 17) return Action.Hit;
  if (isSoft && value === 17) return Action.Hit;
  return Action.Stay;
};
