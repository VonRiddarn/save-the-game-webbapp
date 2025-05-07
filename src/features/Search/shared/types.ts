import { Game, Company, Character } from "@/services/igdb/types";

export type SearchBarVesselProps = {
	currentInput: string;
	onChange: (value: string) => void;
	entities: { games: Game[]; companies: Company[]; characters: Character[] };
};
