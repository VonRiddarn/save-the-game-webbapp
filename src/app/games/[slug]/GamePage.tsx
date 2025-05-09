"use client";

import { useNotifications } from "@/features/notification-center";
import { useIGDB } from "@/hooks/useIGDB";
import { getCachedEntity, setCachedEntity } from "@/services/igdb/visitedEntitiesCache";
import { IGDBGame } from "@/services/igdb/types";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { v4 as uuid4 } from "uuid";

type GamePageProps = {
	slug: string;
};

const GamePage = ({ slug }: GamePageProps) => {
	const { query, loading, error } = useIGDB<IGDBGame[]>();
	const [game, setGame] = useState<IGDBGame | null>(null);
	const hasFiredRef = useRef(false);
	const ENDPOINT = "games";

	const notifications = useNotifications();
	const router = useRouter();

	useEffect(() => {
		const id = uuid4();
		// Note: The cache uses the session storage and will only clear after the window has closed.
		// This means we can keep the cache for stuff when manually entering an adress in the url!
		const cached = getCachedEntity(ENDPOINT, slug);
		if (cached) {
			setGame((cached as IGDBGame) ?? null);
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
						id: id,
						message: `Couldn't find "${ENDPOINT}/${slug}". Redirecting...`,
						type: "toast",
						persist: true,
						timestamp: new Date().getTime(),
						severity: "error",
						actions: [
							{
								label: "Retry",
								severity: "primary",
								onClick: function (): void {
									router.push(`/${ENDPOINT}/${slug}`);
									notifications.dispatch({
										type: "DISMISS_ID",
										id: id,
										method: "soft",
									});
								},
							},
							{
								label: "OK",
								severity: "secondary",
								onClick: function (): void {
									notifications.dispatch({
										type: "DISMISS_ID",
										id: id,
										method: "soft",
									});
								},
							},
						],
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
