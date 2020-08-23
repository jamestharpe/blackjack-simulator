import expect from "expect";
import { Game, GameState } from "./game";

describe("Game", () => {

  let game: Game;

  beforeEach(() => {
    game = new Game();
  });

  it("Creates the deck of cards", () => {
    expect(game.deck.cards.length).toEqual(52);
  });

  it("Creates the players", () => {
    expect(game.players.length).toEqual(2); // Dealer and player
  });

  it("Creates the dealer", () => {
    expect(game.dealer.name).toEqual("Dealer");
  });

  describe("Given a new game, when next() is called, it...", () => {
    beforeEach(() => {
      game.next();
    });

    it("Deals cards to the players", () => {
      expect(game.players.every((p) => p.hand.cards.length === 2)).toBe(true);
    });

    it("Sets the current player to the first player", () => {
      expect(game.player).toBe(game.players[0]);
    });

    it("Sets the state to 'dealt'", () => {
      expect(game.state).toBe(GameState.Play);
    });
  });
});
