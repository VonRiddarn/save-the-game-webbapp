// NOTE: This file is 98% AI generated for super quick and dirty testing.
// TODO: Remove this file later
"use client";

import { useEffect, useState } from "react";
import { useIGDB } from "@/hooks/useIGDB";

type Game = {
	id: number;
	name: string;
	genres?: { name: string }[];
};

export default function DGameList() {
	const { query, loading, error } = useIGDB<Game[]>();
	const [games, setGames] = useState<Game[] | null>(null);

	useEffect(() => {
		query("games", "fields name,genres.name; limit 10;").then((data) => {
			if (data) setGames(data);
		});
	}, [query]);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error}</p>;

	return (
		<div>
			<h2>Top 10 Games</h2>
			<ul>
				{games?.map((game) => (
					<li key={game.id}>
						<h3>{game.name}</h3>
						{game.genres && <p>Genres: {game.genres.map((g) => g.name).join(", ")}</p>}
					</li>
				))}
			</ul>
		</div>
	);
}
