"use client";
import PanelLoader from "@/components/PanelLoader/PanelLoader";
import styles from "./GamePage.module.scss";
import Panel from "@/components/Panel/Panel";
import { useNotifications } from "@/features/notification-center";
import { useIGDB } from "@/services/hooks/useIGDB";
import { igdbGetImageLink, igdbQuerySingle } from "@/services/igdb/query.utilities";
import { IGDBGame } from "@/services/igdb/types";
import { igdbDefaultImageFromEndPoint } from "@/services/igdb/utilities";
import { setCachedEntity } from "@/services/igdb/visitedEntitiesCache";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { v4 as uuid4 } from "uuid";
import FavoriteButton from "@/components/FavoriteButton/FavoriteButton";
import GameCompletionForm from "@/components/GameCompletionForm/GameCompletionForm";
import EntityList from "@/components/EntityList/EntityList";

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
	const [imgUrl, setImgUrl] = useState<string>(igdbDefaultImageFromEndPoint(ENDPOINT));

	useEffect(() => {
		const notificationID = uuid4();

		const fetchImage = async (entity: IGDBGame) => {
			let imageUrl = igdbDefaultImageFromEndPoint(ENDPOINT); // Start with default image

			const res = await igdbQuerySingle<{ image_id: string }>(
				"covers",
				`fields *; where id = ${entity.cover};`
			);
			if (res?.image_id) {
				imageUrl = igdbGetImageLink("big", res.image_id);
			}

			setImgUrl(imageUrl); // Update the state with the found image or default
		};

		query(ENDPOINT, `fields *; where slug = "${slug}";`).then((data) => {
			if (hasFiredRef.current) return;
			if (data && data.length > 0) {
				setGame(data[0]);
				fetchImage(data[0]);
				setCachedEntity(ENDPOINT, slug, data[0]);
			} else {
				notifications.dispatch({
					type: "PUSH",
					payload: {
						id: notificationID,
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
										id: notificationID,
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
										id: notificationID,
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

	if (loading && !game) return <PanelLoader />;
	if (error) return <p>Error: {error}</p>;
	if (!game) return null;

	const rating = (game.total_rating / 10).toFixed(2);

	return (
		<main className={styles["main"]}>
			<Panel className={styles["panel"]}>
				<div className={styles["content"]}>
					<FavoriteButton
						entity={{
							endpoint: ENDPOINT,
							id: game.id,
						}}
					/>
					<GameCompletionForm id={game.id} />
					<div className={styles["header"]}>
						<h1>{game.name}</h1>
						<p>⭐ {rating !== "NaN" ? rating : "?.??"}</p>
					</div>
					<img src={imgUrl} alt={`Image of ${game.name}`} />
					<p>{game.summary}</p>
				</div>
			</Panel>
			<Panel className={styles["panel"]} header={{ title: "Studios involved", style: 2 }}>
				<EntityList
					endpoint={"companies"}
					query={`fields: id; where id = (${game.involved_companies.join(",")});`}
				/>
			</Panel>
			<Panel className={styles["panel"]} header={{ title: "Similar Games", style: 2 }}>
				<EntityList
					endpoint={"games"}
					query={`fields: id; where id = (${game.similar_games.join(",")});`}
				/>
			</Panel>
		</main>
	);
};

export default GamePage;
