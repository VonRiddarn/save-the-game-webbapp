"use client";

import { useNotifications } from "@/features/notification-center";
import { useIGDB } from "@/hooks/useIGDB";
import { getCachedEntity, setCachedEntity } from "@/services/igdb/visitedEntitiesCache";
import { Game } from "@/services/igdb/types";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type GamePageProps = {
	slug: string;
};

const GamePage = ({ slug }: GamePageProps) => {
	const { query, loading, error } = useIGDB<Game[]>();
	const [game, setGame] = useState<Game | null>(null);
	const hasFiredRef = useRef(false);
	const ENDPOINT = "games";

	const notifications = useNotifications();
	const router = useRouter();

	useEffect(() => {
		// Note: The cache uses the session storage and will only clear after the window has closed.
		// This means we can keep the cache for stuff when manually entering an adress in the url!
		const cached = getCachedEntity(ENDPOINT, slug);
		if (cached) {
			setGame((cached as Game) ?? null);
			hasFiredRef.current = true;
			return;
		}

		query(ENDPOINT, `fields *; where slug = "${slug}";`).then((data) => {
			if (hasFiredRef.current) return;
			if (data && data.length > 0) {
				setGame(data[0]);
				setCachedEntity(ENDPOINT, slug, data[0]);
			} else {
				notifications.dispatch({
					type: "PUSH",
					payload: {
						message: `Couldn't find "${ENDPOINT}/${slug}". Redirecting...`,
						type: "toast",
						persist: true,
						timestamp: new Date().getTime(),
						id: Math.random().toString(36).substr(2, 9),
						severity: "error",
					},
				});
				router.push("/search");
			}

			hasFiredRef.current = true;
		});
	}, [notifications, query, router, slug]);

	if (loading && !game) return <p>Loading...</p>;
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
