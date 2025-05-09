import { useEffect, useState } from "react";

export const useIGDBEntity = <T>(endpoint: string, queryBody: string, signal?: AbortSignal) => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [data, setData] = useState<T | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			setError(null);

			try {
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

				const entity = (await res.json())[0];
				setData(entity as T);
			} catch (err) {
				// Abort triggers an error, so we bypass it here
				if ((err as Error).name === "AbortError") return null;
				setError((err as Error).message || "Unknown error");
				return null;
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [endpoint, queryBody, signal]);

	return { data, loading, error };
};
