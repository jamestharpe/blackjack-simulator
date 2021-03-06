import expect from "expect";
import { Player } from "./player";

describe("Player", () => {
  it("Creates", () => {
    const player = new Player();
    expect(player.name).toEqual("Player");
    expect(player.hands.length).toEqual(1);
    expect(player.hands[0]).toEqual(player.hand);
  });
});
