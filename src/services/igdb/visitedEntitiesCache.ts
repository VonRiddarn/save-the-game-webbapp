import { IGDBEntityExplicit, IGDBMainEntityReferenceFull } from "./types";
import { getEndpointFromKey } from "./utilities";

const STORAGE_KEY = "Visited_Entities";

type EntityCache = Record<string, IGDBEntityExplicit>;

const getCompositeKey = (endpoint: string, slug: string) => `${endpoint}_${slug}`;

export const getCachedEntities = (): EntityCache => {
	const data = sessionStorage.getItem(STORAGE_KEY);
	return data ? JSON.parse(data) : {};
};

export const getCachedEntitiesAsArray = (): IGDBMainEntityReferenceFull[] => {
	const entities = getCachedEntities();
	return Object.entries(entities).map(([key, value]) => {
		return {
			entity: value,
			endpoint: getEndpointFromKey(key),
		};
	});
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
