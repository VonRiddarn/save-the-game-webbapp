export const igdbQuery = async <T>(
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

export const igdbQueryAll = async <T>(
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
