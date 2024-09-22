import { Card } from ".";

type ShoeContextArgs = {
	context: {
		cards: ReadonlyArray<Card>;
		cutCardPosition?: number;
	};
};

export const empty = (args: ShoeContextArgs): boolean => args.context.cards.length === 0;
export const spent = ({ context }: ShoeContextArgs): boolean => context.cards.length <= (context.cutCardPosition ?? 0);
