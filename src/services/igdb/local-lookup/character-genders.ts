export const CHARACTER_GENDERS: Record<number, string> = {
	0: "Male",
	1: "Female",
	2: "Other",
};

export const getCharacterGender = (id: number): string => CHARACTER_GENDERS[id] ?? "Unknown";
