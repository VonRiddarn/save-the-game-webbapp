import { IGDBEntityExplicit } from "./types";

const STORAGE_KEY = "Visited_Entities";

type EntityCache = Record<string, IGDBEntityExplicit>;

const getCompositeKey = (endpoint: string, slug: string) => `${endpoint}_${slug}`;

const getCachedEntities = (): EntityCache => {
	const data = sessionStorage.getItem(STORAGE_KEY);
	return data ? JSON.parse(data) : {};
};

const saveCachedEntities = (entities: EntityCache): void => {
	sessionStorage.setItem(STORAGE_KEY, JSON.stringify(entities));
};

export const getCachedEntity = (endpoint: string, slug: string): IGDBEntityExplicit | null => {
	const key = getCompositeKey(endpoint, slug);
	const allEntities = getCachedEntities();
	return allEntities[key] ?? null;
};

export const setCachedEntity = (endpoint: string, slug: string, entity: IGDBEntityExplicit): void => {
	const key = getCompositeKey(endpoint, slug);
	const allEntities = getCachedEntities();
	allEntities[key] = entity;
	saveCachedEntities(allEntities);
};
