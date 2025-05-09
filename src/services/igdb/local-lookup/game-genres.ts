export const GAME_GENRES: Record<number, string> = {
	2: "Point-and-click",
	4: "Fighting",
	5: "Shooter",
	7: "Music",
	8: "Platform",
	9: "Puzzle",
	10: "Racing",
	11: "Real Time Strategy (RTS)",
	12: "Role-playing (RPG)",
	13: "Simulator",
};

export const getGameGenreName = (id: number): string => GAME_GENRES[id] ?? "Unknown";
