import { IGDBMainEntityEndpoint } from "./types";

export const igdbQuerySingle = async <T>(
	endpoint: string,
	queryBody: string,
	signal?: AbortSignal
): Promise<T | null> => {
	const res = await fetch(`/api/igdb/${endpoint}`, {
		method: "POST",
		headers: {
			"Content-Type": "text/plain",
		},
		body: queryBody,
		signal,
	});

	if (!res.ok) {
		throw new Error(`Request failed with status ${res.status}`);
	}

	const data = await res.json();
	return data[0] as T | null;
};

export const igdbQueryArray = async <T>(
	endpoint: string,
	queryBody: string,
	signal?: AbortSignal
): Promise<T[]> => {
	const res = await fetch(`/api/igdb/${endpoint}`, {
		method: "POST",
		headers: {
			"Content-Type": "text/plain",
		},
		body: queryBody,
		signal,
	});

	if (!res.ok) {
		throw new Error(`Request failed with status ${res.status}`);
	}

	const data = await res.json();
	return data as T[] | [];
};

export const igdbGetImageLink = (size: string, id: string) =>
	`https://images.igdb.com/igdb/image/upload/t_cover_${size}/${id}.webp`;

export const igdbGetImageId = async (endpoint: string, id: number): Promise<string | null> =>
	(await igdbQuerySingle<{ image_id: string }>(endpoint, `fields image_id; where id = ${id};`))?.image_id ??
	null;

export const igdbFetchImage = async (endpoint: IGDBMainEntityEndpoint, id: number) => {
	switch (endpoint) {
		case "games": {
			const gameImg = await igdbGetImageId("covers", id);
			return gameImg ? igdbGetImageLink("size", gameImg) : null;
		}
		case "companies": {
			const companyImg = await igdbGetImageId("company_logos", id);
			return companyImg ? igdbGetImageLink("size", companyImg) : null;
		}
		case "characters": {
			const characterImg = await igdbGetImageId("character_mug_shots", id);
			return characterImg ? igdbGetImageLink("size", characterImg) : null;
		}
		default:
			throw new Error("Unknown endpoint");
	}
};
