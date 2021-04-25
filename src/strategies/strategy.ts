import { Card } from "../cards";

export enum Action {
  Hit = "Hit",
  Stay = "Stay",
  Split = "Split",
  DoubleDown = "Double Down"
}

export interface Strategy {
  (upCard: Card, ...cards: Card[]): Action;
}