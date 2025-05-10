"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

type CompletedGame = {
	id: number;
	startDate?: number;
	endDate?: number;
	completed: boolean;
};

type CompletedGamesContextType = {
	completedGames: CompletedGame[];
	addCompletedGame: (game: CompletedGame) => void;
	editCompletedGame: (id: number, updatedGame: CompletedGame) => void;
};

const CompletedGamesContext = createContext<CompletedGamesContextType | undefined>(undefined);

export const CompletedGamesProvider = ({ children }: { children: ReactNode }) => {
	const [completedGames, setCompletedGames] = useState<CompletedGame[]>([]);

	const addCompletedGame = (game: CompletedGame) => {
		setCompletedGames((prevGames) => [...prevGames, game]);
	};

	const editCompletedGame = (id: number, updatedGame: CompletedGame) => {
		setCompletedGames((prevGames) =>
			prevGames.map((game) => (game.id === id ? { ...game, ...updatedGame } : game))
		);
	};

	return (
		<CompletedGamesContext.Provider value={{ completedGames, addCompletedGame, editCompletedGame }}>
			{children}
		</CompletedGamesContext.Provider>
	);
};

export const useCompletedGames = (): CompletedGamesContextType => {
	const context = useContext(CompletedGamesContext);
	if (!context) {
		throw new Error("useCompletedGames must be used within a CompletedGamesProvider");
	}
	return context;
};
