// NOTE: This file is 100% AI generated for super quick and dirty testing.
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
			<h2 className="text-xl font-bold mb-2">Top 10 Games</h2>
			<ul className="space-y-2">
				{games?.map((game) => (
					<li key={game.id} className="p-2 border rounded">
						<p className="font-semibold">{game.name}</p>
						{game.genres && (
							<p className="text-sm text-gray-500">
								Genres: {game.genres.map((g) => g.name).join(", ")}
							</p>
						)}
					</li>
				))}
			</ul>
		</div>
	);
}
