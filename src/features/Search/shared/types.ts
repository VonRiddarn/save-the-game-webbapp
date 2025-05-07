import { IGDBEntityExplicit } from "@/services/igdb/types";

export type SearchBarVesselProps = {
	currentInput: string;
	onChange: (value: string) => void;
	entities: IGDBEntityExplicit[];
};
