import { Game, Company, Character, IGDBNamedEntityReference } from "@/services/igdb/types";

export type EntityCollection = { games: Game[]; companies: Company[]; characters: Character[] };

export type SearchBarVesselProps = {
	currentInput: string;
	onChange: (value: string) => void;
	entities: IGDBNamedEntityReference[];
};
