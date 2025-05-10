"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

export type CompletedGame = {
	id: number;
	hours?: number;
	completed: boolean;
};

// Doing it this way because I want to use the hover-view in VSCode
const CompletedGamesContext = createContext<{
	completedGames: CompletedGame[];
	addCompletedGame: (game: CompletedGame) => void;
	getHoursSpent: () => number;
	getGame: (id: number) => CompletedGame | null;
} | null>(null);

export const CompletedGamesProvider = ({ children }: { children: ReactNode }) => {
	const [completedGames, setCompletedGames] = useState<CompletedGame[]>([]);

	const getGame = (id: number): CompletedGame | null => {
		const game = completedGames.find((game) => game.id === id);
		return game || null;
	};

	const addCompletedGame = (game: CompletedGame) => {
		setCompletedGames((prevGames) => {
			const existingGameIndex = prevGames.findIndex((g) => g.id === game.id);
			if (existingGameIndex !== -1) {
				// Overwrite the existing game
				const updatedGames = [...prevGames];
				updatedGames[existingGameIndex] = { ...prevGames[existingGameIndex], ...game };
				return updatedGames;
			}
			// Add the new game
			return [...prevGames, game];
		});
	};

	// Reduce the array, take the UNIX time alpha, convert it to hours and add it to the return.
	// We can do this with no conditional check because we know the endDate is enforced to be after startDate
	const getHoursSpent = () => {
		return completedGames.reduce((totalHours, game) => {
			if (game.hours !== undefined) {
				return totalHours + game.hours;
			}
			return totalHours;
		}, 0);
	};

	return (
		<CompletedGamesContext.Provider value={{ completedGames, addCompletedGame, getHoursSpent, getGame }}>
			{children}
		</CompletedGamesContext.Provider>
	);
};

export const useCompletedGames = () => {
	const context = useContext(CompletedGamesContext);
	if (!context) {
		throw new Error("useCompletedGames must be used within a CompletedGamesProvider");
	}
	return context;
};
