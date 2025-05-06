"use client";

import { useIGDB } from "@/hooks/useIGDB";
import { getCachedEntity, setCachedEntity } from "@/services/igdb/cache";
import { Game } from "@/services/igdb/types";
import { useEffect, useState } from "react";

type GamePageProps = {
	slug: string;
};

const GamePage = ({ slug }: GamePageProps) => {
	const { query, loading, error } = useIGDB<Game[]>();
	const [game, setGame] = useState<Game | null>(null);
	const ENDPOINT = "games";

	useEffect(() => {
		// Note: The cache uses the session storage and will only clear after the window has closed.
		// This means we can keep the cache for stuff when manually entering an adress in the url!
		const cached = getCachedEntity(ENDPOINT, slug);
		if (cached) {
			setGame((cached as Game) ?? null);
			return;
		}

		query(ENDPOINT, `fields *; where slug = "${slug}";`).then((data) => {
			if (data && data.length > 0) {
				setGame(data[0]);
				setCachedEntity(ENDPOINT, slug, data[0]);
			}
		});
	}, [query, slug]);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error}</p>;

	return (
		game && (
			<div>
				<h1>{game.name}</h1>
				<p>{game.summary}</p>
			</div>
		)
	);
};

export default GamePage;
