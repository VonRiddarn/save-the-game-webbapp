import styles from "./EntityCard.module.scss";
import { useIGDB } from "@/hooks/useIGDB";
import { igdbGetImageLink, igdbQuerySingle } from "@/services/igdb/query.utilities";
import { IGDBGame, IGDBMainEntity, IGDBMainEntityEndpoint } from "@/services/igdb/types";
import { igdbDefaultImageFromEndPoint } from "@/services/igdb/utilities";
import React, { useEffect, useState } from "react";

type EntityCardProps = {
	id: number;
	endpoint: IGDBMainEntityEndpoint;
};

const EntityCard = ({ id, endpoint }: EntityCardProps) => {
	const { query, loading, error } = useIGDB();
	const [entityData, setEntityData] = useState<IGDBMainEntity | null>(null);
	const [imgUrl, setImgUrl] = useState<string>(igdbDefaultImageFromEndPoint(endpoint));

	useEffect(() => {
		const fetchImage = async (entity: IGDBMainEntity) => {
			let imageUrl = igdbDefaultImageFromEndPoint(endpoint); // Start with default image

			if ("cover" in entity) {
				const res = await igdbQuerySingle<{ image_id: string }>(
					"covers",
					`fields *; where id = ${entity.cover};`
				);
				if (res?.image_id) {
					imageUrl = igdbGetImageLink("big", res.image_id);
				}
			}

			if ("logo" in entity) {
				const res = await igdbQuerySingle<{ image_id: string }>(
					"company_logos",
					`fields *; where id = ${entity.logo};`
				);
				if (res?.image_id) {
					imageUrl = igdbGetImageLink("big", res.image_id);
				}
			}

			if ("mug_shot" in entity) {
				const res = await igdbQuerySingle<{ image_id: string }>(
					"character_mug_shots",
					`fields *; where id = ${entity.mug_shot};`
				);
				if (res?.image_id) {
					imageUrl = igdbGetImageLink("big", res.image_id);
				}
			}

			setImgUrl(imageUrl); // Update the state with the found image or default
		};

		const fetchEntity = async () => {
			if (!id || !endpoint) return;

			const queryBody = `fields *; where id = ${id};`;
			const data = await query(endpoint, queryBody);
			setEntityData((data as IGDBMainEntity[])[0]);
			fetchImage((data as IGDBMainEntity[])[0]);
		};

		fetchEntity();
	}, [id, endpoint, query]);

	if (loading) return <p>Loading...</p>;
	if (error) return null;
	if (!entityData) return <p>No data found</p>;

	return (
		<div className={styles["entity-card"]}>
			{/*eslint-disable-next-line @next/next/no-img-element*/}
			<img src={imgUrl} alt={`Image of ${entityData.name}`} />
			<span>
				<h2>{entityData.name}</h2>
				<p>{endpoint === "games" && (entityData as IGDBGame).summary}</p>
			</span>
		</div>
	);
};

export default EntityCard;
