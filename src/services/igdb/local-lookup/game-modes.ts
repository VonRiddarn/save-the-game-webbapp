export const GAME_MODES: Record<number, string> = {
	1: "Single player",
	2: "Multiplayer",
	3: "Co-operative",
	4: "Split screen",
	5: "Massively Multiplayer Online (MMO)",
	6: "Battle Royale",
};

export const getGameModeName = (id: number): string => GAME_MODES[id] ?? "Unknown";
