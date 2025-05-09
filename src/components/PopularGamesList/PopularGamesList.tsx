"use client";

import { useEffect, useState } from "react";
import { useIGDB } from "@/hooks/useIGDB";
import { IGDBGame } from "@/services/igdb/types";

const PopularGamesList = () => {
	const { query, loading, error } = useIGDB<IGDBGame[]>();
	const [games, setGames] = useState<IGDBGame[]>([]);

	useEffect(() => {
		query("games", "fields *; limit 10;").then((data) => {
			if (data) {
				setGames(data);
			}
		});
	}, [query]);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error}</p>;

	return (
		<div>
			<h2>Top 10 Games</h2>
			<ul>
				{games.map((game) => (
					<li key={game.id}>
						<h3>{game.name}</h3>
						<p>{game.summary}</p>
					</li>
				))}
			</ul>
		</div>
	);
};

export default PopularGamesList;
