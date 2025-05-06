"use client";

import { useIGDB } from "@/hooks/useIGDB";
import { Game } from "@/services/igdb/types";
import { useEffect, useState } from "react";

type GamePageProps = {
	slug: string;
};

const GamePage = ({ slug }: GamePageProps) => {
	const { query, loading, error } = useIGDB<Game[]>();
	const [game, setGame] = useState<Game | null>(null);

	useEffect(() => {
		query("games", `fields *; where slug = "${slug}";`).then((data) => {
			if (data) setGame(data.length > 0 ? data[0] : null);
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
