import { Game, Company, Character } from "@/services/igdb/types";

export type EntityCollection = { games: Game[]; companies: Company[]; characters: Character[] };

export type SearchBarVesselProps = {
	currentInput: string;
	onChange: (value: string) => void;
	entities: EntityCollection;
};
