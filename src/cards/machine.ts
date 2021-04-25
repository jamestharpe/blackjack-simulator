import { EventObject, Machine, MachineConfig, StateSchema } from "xstate";
import { Card } from "./cards";

interface DeckContext {
	cards: Card[];
}

type DeckStateSchema = StateSchema<DeckContext>

type DeckEvent = EventObject

const config: MachineConfig<DeckContext, DeckStateSchema, DeckEvent> = {
	
}

export const DeckMachine = Machine(config);
