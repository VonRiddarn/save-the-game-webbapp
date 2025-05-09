import { useState } from "react";
import { useCallback } from "react";

export const useIGDB = <T>() => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	// Using a callback so that we are using the SAME query method.
	// This makes it so that if we include it as a dependency for linter reasons it wont bite us in the ass
	const query = useCallback(
		async (endpoint: string, queryBody: string, signal?: AbortSignal): Promise<T | null> => {
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

				const data = await res.json();
				return data as T;
			} catch (err) {
				// Abort triggers an error, so we bypass it here
				if ((err as Error).name === "AbortError") return null;
				setError((err as Error).message || "Unknown error");
				return null;
			} finally {
				setLoading(false);
			}
		},
		[]
	);

	return { query, loading, error };
};
