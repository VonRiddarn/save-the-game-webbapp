"use client";
import PanelLoader from "@/components/PanelLoader/PanelLoader";
import styles from "./CharacterPage.module.scss";
import Panel from "@/components/Panel/Panel";
import { useNotifications } from "@/features/notification-center";
import { useIGDB } from "@/services/hooks/useIGDB";
import { igdbGetImageLink, igdbQuerySingle } from "@/services/igdb/query.utilities";
import { IGDBCharacter } from "@/services/igdb/types";
import { igdbDefaultImageFromEndPoint } from "@/services/igdb/utilities";
import { setCachedEntity } from "@/services/igdb/visitedEntitiesCache";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { v4 as uuid4 } from "uuid";
import FavoriteButton from "@/components/FavoriteButton/FavoriteButton";
import EntityList from "@/components/EntityList/EntityList";

type CharacterPageProps = {
	slug: string;
};

const CharacterPage = ({ slug }: CharacterPageProps) => {
	const { query, loading, error } = useIGDB<IGDBCharacter[]>();
	const [character, setCharacter] = useState<IGDBCharacter | null>(null);

	const hasFiredRef = useRef(false);
	const ENDPOINT = "characters";

	const notifications = useNotifications();
	const router = useRouter();
	const [imgUrl, setImgUrl] = useState<string>(igdbDefaultImageFromEndPoint(ENDPOINT));

	useEffect(() => {
		const notificationID = uuid4();

		const fetchImage = async (entity: IGDBCharacter) => {
			let imageUrl = igdbDefaultImageFromEndPoint(ENDPOINT);

			const res = await igdbQuerySingle<{ image_id: string }>(
				"character_mug_shots",
				`fields *; where id = ${entity.mug_shot};`
			);
			if (res?.image_id) {
				imageUrl = igdbGetImageLink("big", res.image_id);
			}

			setImgUrl(imageUrl); // Update the state with the found image or default
		};

		query(ENDPOINT, `fields *; where slug = "${slug}";`).then((data) => {
			if (hasFiredRef.current) return;
			if (data && data.length > 0) {
				setCharacter(data[0]);
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

	if (loading && !character) return <PanelLoader />;
	if (error) return <p>Error: {error}</p>;
	if (!character) return null;

	return (
		<div className={styles["wrapper"]}>
			<Panel className={styles["panel"]}>
				<div className={styles["content"]}>
					<FavoriteButton
						entity={{
							endpoint: ENDPOINT,
							id: character.id,
						}}
					/>
					<div className={styles["header"]}>
						<h1>{character.name}</h1>
					</div>
					<img src={imgUrl} alt={`Mug shot of ${character.name}`} />
					<p>{character.description}</p>
				</div>
			</Panel>
			<Panel className={styles["panel"]}>
				<EntityList
					endpoint={"games"}
					query={`fields: id; where id = (${character.games.join(",")});`}
				/>
			</Panel>
		</div>
	);
};

export default CharacterPage;
