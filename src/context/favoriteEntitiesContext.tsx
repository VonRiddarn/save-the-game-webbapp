"use client";

import React, { createContext, useContext, useReducer, ReactNode } from "react";
import { IGDBMainEntityEndpoint } from "@/services/igdb/types";

type FavoriteEntity = {
	endpoint: IGDBMainEntityEndpoint;
	id: number;
};

type FavoriteEntitiesState = Record<string, FavoriteEntity>;

type FavoriteEntitiesAction =
	| { type: "ADD"; payload: FavoriteEntity }
	| { type: "REMOVE"; payload: FavoriteEntity };

const parseKey = (endpoint: IGDBMainEntityEndpoint, id: number) => `${endpoint}_${id}`;

const favoriteEntitiesReducer = (
	state: FavoriteEntitiesState,
	action: FavoriteEntitiesAction
): FavoriteEntitiesState => {
	switch (action.type) {
		case "ADD": {
			const key = parseKey(action.payload.endpoint, action.payload.id);
			return { ...state, [key]: action.payload };
		}
		case "REMOVE": {
			const key = parseKey(action.payload.endpoint, action.payload.id);
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { [key]: _, ...rest } = state;
			// Basically, create 2 objects:
			// _:FavoriteEntity and rest:FavoriteEntity[] then just toss _.
			return rest;
		}
		default:
			return state;
	}
};

const FavoriteEntitiesContext = createContext<{
	state: FavoriteEntitiesState;
	addEntity: (entity: FavoriteEntity) => void;
	removeEntity: (entity: FavoriteEntity) => void;
	getAllEntities: (endpoint: IGDBMainEntityEndpoint) => FavoriteEntity[];
} | null>(null);

export const FavoriteEntitiesProvider = ({ children }: { children: ReactNode }) => {
	const [state, dispatch] = useReducer(favoriteEntitiesReducer, {});

	const getAllEntities = (endpoint: IGDBMainEntityEndpoint): FavoriteEntity[] => {
		return Object.values(state).filter((entity) => entity.endpoint === endpoint);
	};

	const addEntity = (entity: FavoriteEntity) => {
		dispatch({ type: "ADD", payload: entity });
	};

	const removeEntity = (entity: FavoriteEntity) => {
		dispatch({ type: "REMOVE", payload: entity });
	};

	return (
		<FavoriteEntitiesContext.Provider value={{ state, addEntity, removeEntity, getAllEntities }}>
			{children}
		</FavoriteEntitiesContext.Provider>
	);
};

export const useFavoriteEntities = () => {
	const context = useContext(FavoriteEntitiesContext);
	if (!context) {
		throw new Error("useFavoriteEntities must be used within a FavoriteEntitiesProvider");
	}

	return context;
};
