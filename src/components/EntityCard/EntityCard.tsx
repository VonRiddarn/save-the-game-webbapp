import styles from "./EntityCard.module.scss";
import { useIGDB } from "@/hooks/useIGDB";
import { igdbGetImageLink, igdbQuerySingle } from "@/services/igdb/query.utilities";
import { IGDBCompany, IGDBGame, IGDBMainEntity, IGDBMainEntityEndpoint } from "@/services/igdb/types";
import { endpointToSingular, igdbDefaultImageFromEndPoint } from "@/services/igdb/utilities";
import React, { useEffect, useState } from "react";
import GameCardContent from "./components/GameCardContent";
import CompanyCardContent from "./components/CompanyCardContent";

type EntityCardProps = {
	id: number;
	endpoint: IGDBMainEntityEndpoint;
	size: "long" | "short";
};

const EntityCard = ({ id, endpoint, size }: EntityCardProps) => {
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

	const getCardContent = () => {
		switch (endpoint) {
			case "games":
				return <GameCardContent entity={entityData as IGDBGame} size={size} imgUrl={imgUrl} />;
			case "companies":
				return <CompanyCardContent entity={entityData as IGDBCompany} size={size} imgUrl={imgUrl} />;
			case "characters":
				return "Character Card";
			default:
				return null;
		}
	};

	if (loading) return <div className={`${styles["entity-card"]} ${styles["entity-card--loading"]}`}></div>;

	if (error) return null;
	if (!entityData) return <p>No data found</p>;

	return (
		<div
			className={`${styles["entity-card"]} ${styles[`entity-card--${endpointToSingular(endpoint)}`]} ${
				size === "short" ? styles["entity-card--short"] : ""
			} listing`}
		>
			{getCardContent()}
		</div>
	);
};

export default EntityCard;
