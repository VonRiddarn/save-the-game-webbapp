import { IGDBMainEntity } from "./types";

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
): Promise<T[] | null> => {
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
	return data as T[] | null;
};

export const igdbGetEntityAvatar = async (entity: IGDBMainEntity, size: "small" | "big") => {
	if ("cover" in entity) {
		const img = await igdbGetImageId("covers", entity.cover);
		return img ? parsedLink(size, img) : "/images/icons/entities/icon-game-default.png";
	} else if ("logo" in entity) {
		const img = await igdbGetImageId("company_logos", entity.logo);
		return img ? parsedLink(size, img) : "/images/icons/entities/icon-company-default.png";
	} else if ("mug_shot" in entity) {
		const img = await igdbGetImageId("character_mug_shots", entity.mug_shot);
		return img ? parsedLink(size, img) : "/images/icons/entities/icon-character-default.png";
	}
};

const parsedLink = (size: string, id: string) =>
	`https://images.igdb.com/igdb/image/upload/t_cover_${size}/${id}.webp`;

export const igdbGetImageId = async (endpoint: string, id: number): Promise<string | null> =>
	(await igdbQuerySingle<{ image_id: string }>(endpoint, `fields image_id; where id = ${id};`))?.image_id ??
	null;
