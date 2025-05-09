export const CHARACTER_SPECIES: Record<number, string> = {
	1: "Human",
	2: "Alien",
	3: "Animal",
	4: "Android",
	5: "Unknown",
};

export const getCharacterSpecies = (id: number): string => CHARACTER_SPECIES[id] ?? "Unknown";
