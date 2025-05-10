import { useState, useCallback } from "react";

export const useIGDB = <T>() => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const query = useCallback(
		async (
			endpoint: string,
			queryBody: string,
			signal?: AbortSignal,
			retries = 3,
			delay = 1000
		): Promise<T | null> => {
			setLoading(true);
			setError(null);

			const fetchWithRetry = async (attempt: number): Promise<T | null> => {
				try {
					const res = await fetch(`/api/igdb/${endpoint}`, {
						method: "POST",
						headers: {
							"Content-Type": "text/plain",
						},
						body: queryBody,
						signal,
					});

					if (res.status === 429 && attempt < retries) {
						// Optional: Check for Retry-After header
						const retryAfter = res.headers.get("Retry-After");
						const waitTime = retryAfter ? parseFloat(retryAfter) * 1000 : delay * 2 ** attempt;

						await new Promise((resolve) => setTimeout(resolve, waitTime));
						return fetchWithRetry(attempt + 1);
					}

					if (!res.ok) {
						throw new Error(`Request failed with status ${res.status}`);
					}

					const data = await res.json();
					return data as T;
				} catch (err) {
					if ((err as Error).name === "AbortError") return null;
					if (attempt >= retries) {
						setError((err as Error).message || "Unknown error");
						return null;
					}
					await new Promise((resolve) => setTimeout(resolve, delay * 2 ** attempt));
					return fetchWithRetry(attempt + 1);
				}
			};

			try {
				return await fetchWithRetry(0);
			} finally {
				setLoading(false);
			}
		},
		[]
	);

	return { query, loading, error };
};
