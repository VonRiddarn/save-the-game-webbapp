import { IGDBEntityExplicit } from "./types";

const getSessionStorageKey = (endpoint: string, slug: string) => `Cached_${endpoint}_${slug}`;

export const getCachedEntity = (endpoint: string, slug: string): IGDBEntityExplicit | null => {
	const key = getSessionStorageKey(endpoint, slug);
	const cachedData = sessionStorage.getItem(key);
	return cachedData ? JSON.parse(cachedData) : null;
};

export const setCachedEntity = (endpoint: string, slug: string, entity: IGDBEntityExplicit): void => {
	const key = getSessionStorageKey(endpoint, slug);
	sessionStorage.setItem(key, JSON.stringify(entity));
};
