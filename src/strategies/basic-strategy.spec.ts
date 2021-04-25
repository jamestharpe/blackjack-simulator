import expect from "expect";
import {
	aceOfDiamonds,
	aceOfHearts, aceOfSpades,
	eightOfDiamonds, eightOfHearts,
	eightOfSpades,
	fiveOfDiamonds,
	fiveOfHearts, fiveOfSpades,
	fourOfDiamonds,
	fourOfHearts, fourOfSpades,
	nineOfDiamonds,
	nineOfHearts,
	nineOfSpades,
	sevenOfDiamonds, sevenOfHearts, sevenOfSpades,
	sixOfDiamonds, sixOfHearts, sixOfSpades,
	threeOfDiamonds, threeOfHearts, threeOfSpades, twoOfDiamonds,
	twoOfHearts,
	twoOfSpades
} from "../cards";
import { basicStrategy } from "./basic-strategy";
import { Action } from "./strategy";

describe("Basic Strategy", () => {
  // Splits

  it("Always Split Aces", () => {
    expect(basicStrategy(aceOfSpades, aceOfHearts, aceOfDiamonds)).toBe(
      Action.Split
    );
  });

  it("Split twos against two through seven", () => {
    expect(basicStrategy(twoOfSpades, twoOfHearts, twoOfDiamonds)).toBe(
      Action.Split
    );

    expect(basicStrategy(threeOfSpades, twoOfHearts, twoOfDiamonds)).toBe(
      Action.Split
    );

    expect(basicStrategy(fourOfSpades, twoOfHearts, twoOfDiamonds)).toBe(
      Action.Split
    );

    expect(basicStrategy(fiveOfSpades, twoOfHearts, twoOfDiamonds)).toBe(
      Action.Split
    );

    expect(basicStrategy(sixOfSpades, twoOfHearts, twoOfDiamonds)).toBe(
      Action.Split
    );

    expect(basicStrategy(sevenOfSpades, twoOfHearts, twoOfDiamonds)).toBe(
      Action.Split
    );
  });

  it("Split threes against two through seven", () => {
    expect(basicStrategy(twoOfSpades, threeOfHearts, threeOfDiamonds)).toBe(
      Action.Split
    );

    expect(basicStrategy(threeOfSpades, threeOfHearts, threeOfDiamonds)).toBe(
      Action.Split
    );

    expect(basicStrategy(fourOfSpades, threeOfHearts, threeOfDiamonds)).toBe(
      Action.Split
    );

    expect(basicStrategy(fiveOfSpades, threeOfHearts, threeOfDiamonds)).toBe(
      Action.Split
    );

    expect(basicStrategy(sixOfSpades, threeOfHearts, threeOfDiamonds)).toBe(
      Action.Split
    );

    expect(basicStrategy(sevenOfSpades, threeOfHearts, threeOfDiamonds)).toBe(
      Action.Split
    );
  });

  it("Split fours against five and six", () => {
    expect(basicStrategy(fiveOfSpades, fourOfHearts, fourOfDiamonds)).toBe(
      Action.Split
    );

    expect(basicStrategy(sixOfSpades, fourOfHearts, fourOfDiamonds)).toBe(
      Action.Split
    );
  });

  it("Split sixes against two through six", () => {
    expect(basicStrategy(twoOfSpades, sixOfHearts, sixOfDiamonds)).toBe(
      Action.Split
    );

    expect(basicStrategy(threeOfSpades, sixOfHearts, sixOfDiamonds)).toBe(
      Action.Split
    );

    expect(basicStrategy(fourOfSpades, sixOfHearts, sixOfDiamonds)).toBe(
      Action.Split
    );

    expect(basicStrategy(fiveOfSpades, sixOfHearts, sixOfDiamonds)).toBe(
      Action.Split
    );

    expect(basicStrategy(sixOfSpades, sixOfHearts, sixOfDiamonds)).toBe(
      Action.Split
    );
  });

  it("Split sevens against two through seven", () => {
    expect(basicStrategy(twoOfSpades, sevenOfHearts, sevenOfDiamonds)).toBe(
      Action.Split
    );

    expect(basicStrategy(threeOfSpades, sevenOfHearts, sevenOfDiamonds)).toBe(
      Action.Split
    );

    expect(basicStrategy(fourOfSpades, sevenOfHearts, sevenOfDiamonds)).toBe(
      Action.Split
    );

    expect(basicStrategy(fiveOfSpades, sevenOfHearts, sevenOfDiamonds)).toBe(
      Action.Split
    );

    expect(basicStrategy(sixOfSpades, sevenOfHearts, sevenOfDiamonds)).toBe(
      Action.Split
    );

    expect(basicStrategy(sevenOfSpades, sevenOfHearts, sevenOfDiamonds)).toBe(
      Action.Split
    );
  });

  it("Always Split Eights", () => {
    expect(basicStrategy(aceOfSpades, eightOfHearts, eightOfDiamonds)).toBe(
      Action.Split
    );
  });

  it("Split nines against two through six, eight, and nine", () => {
    expect(basicStrategy(twoOfSpades, nineOfHearts, nineOfDiamonds)).toBe(
      Action.Split
    );

    expect(basicStrategy(threeOfSpades, nineOfHearts, nineOfDiamonds)).toBe(
      Action.Split
    );

    expect(basicStrategy(fourOfSpades, nineOfHearts, nineOfDiamonds)).toBe(
      Action.Split
    );

    expect(basicStrategy(fiveOfSpades, nineOfHearts, nineOfDiamonds)).toBe(
      Action.Split
    );

    expect(basicStrategy(sixOfSpades, nineOfHearts, nineOfDiamonds)).toBe(
      Action.Split
    );

    expect(basicStrategy(eightOfSpades, nineOfHearts, nineOfDiamonds)).toBe(
      Action.Split
    );

    expect(basicStrategy(nineOfSpades, nineOfHearts, nineOfDiamonds)).toBe(
      Action.Split
    );
  });

  // Double Downs

  it("Double nine against three through six", () => {
    expect(basicStrategy(threeOfSpades, sevenOfHearts, twoOfDiamonds)).toBe(
      Action.DoubleDown
    );

    expect(basicStrategy(fourOfSpades, sevenOfHearts, twoOfDiamonds)).toBe(
      Action.DoubleDown
    );

    expect(basicStrategy(fiveOfSpades, sevenOfHearts, twoOfDiamonds)).toBe(
      Action.DoubleDown
    );

    expect(basicStrategy(sixOfSpades, sevenOfHearts, twoOfDiamonds)).toBe(
      Action.DoubleDown
    );
  });

  it("Double ten against two through nine", () => {
    expect(basicStrategy(twoOfSpades, sevenOfHearts, threeOfDiamonds)).toBe(
      Action.DoubleDown
    );

    expect(basicStrategy(threeOfSpades, sevenOfHearts, threeOfDiamonds)).toBe(
      Action.DoubleDown
    );

    expect(basicStrategy(fourOfSpades, fiveOfHearts, fiveOfDiamonds)).toBe(
      Action.DoubleDown
    );

    expect(basicStrategy(fiveOfSpades, sevenOfHearts, threeOfDiamonds)).toBe(
      Action.DoubleDown
    );

    expect(basicStrategy(sixOfSpades, sevenOfHearts, threeOfDiamonds)).toBe(
      Action.DoubleDown
    );

    expect(basicStrategy(sevenOfSpades, sevenOfHearts, threeOfDiamonds)).toBe(
      Action.DoubleDown
    );

    expect(basicStrategy(eightOfSpades, sevenOfHearts, threeOfDiamonds)).toBe(
      Action.DoubleDown
    );

    expect(basicStrategy(nineOfSpades, sevenOfHearts, threeOfDiamonds)).toBe(
      Action.DoubleDown
    );
  });

  it("Double eleven against two through nine", () => {
    expect(basicStrategy(twoOfSpades, sevenOfHearts, fourOfDiamonds)).toBe(
      Action.DoubleDown
    );

    expect(basicStrategy(threeOfSpades, sevenOfHearts, fourOfDiamonds)).toBe(
      Action.DoubleDown
    );

    expect(basicStrategy(fourOfSpades, sevenOfHearts, fourOfDiamonds)).toBe(
      Action.DoubleDown
    );

    expect(basicStrategy(fiveOfSpades, sevenOfHearts, fourOfDiamonds)).toBe(
      Action.DoubleDown
    );

    expect(basicStrategy(sixOfSpades, sevenOfHearts, fourOfDiamonds)).toBe(
      Action.DoubleDown
    );

    expect(basicStrategy(sevenOfSpades, sevenOfHearts, fourOfDiamonds)).toBe(
      Action.DoubleDown
    );

    expect(basicStrategy(eightOfSpades, sevenOfHearts, fourOfDiamonds)).toBe(
      Action.DoubleDown
    );

    expect(basicStrategy(nineOfSpades, sevenOfHearts, fourOfDiamonds)).toBe(
      Action.DoubleDown
    );
  });

  it("Double soft thirteen against five or six", () => {
    expect(basicStrategy(fiveOfSpades, aceOfHearts, twoOfDiamonds)).toBe(
      Action.DoubleDown
    );

    expect(basicStrategy(sixOfSpades, aceOfHearts, twoOfDiamonds)).toBe(
      Action.DoubleDown
    );
  });

  it("Double soft fourteen against five or six", () => {
    expect(basicStrategy(fiveOfSpades, aceOfHearts, threeOfDiamonds)).toBe(
      Action.DoubleDown
    );

    expect(basicStrategy(sixOfSpades, aceOfHearts, threeOfDiamonds)).toBe(
      Action.DoubleDown
    );
  });

  it("Double soft fifteen against four through six", () => {
    expect(basicStrategy(fourOfSpades, aceOfHearts, fourOfDiamonds)).toBe(
      Action.DoubleDown
    );

    expect(basicStrategy(fiveOfSpades, aceOfHearts, fourOfDiamonds)).toBe(
      Action.DoubleDown
    );

    expect(basicStrategy(sixOfSpades, aceOfHearts, fourOfDiamonds)).toBe(
      Action.DoubleDown
    );
  });

  it("Double soft sixteen against four through six", () => {
    expect(basicStrategy(fourOfSpades, aceOfHearts, fiveOfDiamonds)).toBe(
      Action.DoubleDown
    );

    expect(basicStrategy(fiveOfSpades, aceOfHearts, fiveOfDiamonds)).toBe(
      Action.DoubleDown
    );

    expect(basicStrategy(sixOfSpades, aceOfHearts, fiveOfDiamonds)).toBe(
      Action.DoubleDown
    );
  });

  it("Double soft seventeen against three through six", () => {
    expect(basicStrategy(threeOfSpades, aceOfHearts, sixOfDiamonds)).toBe(
      Action.DoubleDown
    );

    expect(basicStrategy(fourOfSpades, aceOfHearts, sixOfDiamonds)).toBe(
      Action.DoubleDown
    );

    expect(basicStrategy(fiveOfSpades, aceOfHearts, sixOfDiamonds)).toBe(
      Action.DoubleDown
    );

    expect(basicStrategy(sixOfSpades, aceOfHearts, sixOfDiamonds)).toBe(
      Action.DoubleDown
    );
  });

  it("Double soft eighteen against three through six", () => {
    expect(basicStrategy(threeOfSpades, aceOfHearts, sevenOfDiamonds)).toBe(
      Action.DoubleDown
    );

    expect(basicStrategy(fourOfSpades, aceOfHearts, sevenOfDiamonds)).toBe(
      Action.DoubleDown
    );

    expect(basicStrategy(fiveOfSpades, aceOfHearts, sevenOfDiamonds)).toBe(
      Action.DoubleDown
    );

    expect(basicStrategy(sixOfSpades, aceOfHearts, sevenOfDiamonds)).toBe(
      Action.DoubleDown
    );
  });
});
