import { igdbGetImageId, igdbGetImageLink } from "@/services/igdb/query.utilities";
import { IGDBMainEntityEndpoint, IGDBMainEntityReferenceFull } from "@/services/igdb/types";
import { useEffect, useState } from "react";

export const useEntityAvatar = (entityRef: IGDBMainEntityReferenceFull, size: "small" | "big") => {
	const { endpoint, entity } = entityRef;

	const [imageUrl, setImageUrl] = useState<string>(defaultImage(endpoint));

	useEffect(() => {
		if (!entity) return;

		const fetchImage = async () => {
			if ("cover" in entity) {
				const gameImg = await igdbGetImageId("covers", entity.cover);
				if (gameImg) setImageUrl(igdbGetImageLink(size, gameImg));
			} else if ("logo" in entity) {
				const companyImg = await igdbGetImageId("company_logos", entity.logo);
				if (companyImg) setImageUrl(igdbGetImageLink(size, companyImg));
			} else if ("mug_shot" in entity) {
				const characterImg = await igdbGetImageId("character_mug_shots", entity.mug_shot);
				if (characterImg) setImageUrl(igdbGetImageLink(size, characterImg));
			}
		};

		fetchImage();
	}, [entity, entityRef, size]);

	return { imageUrl: imageUrl };
};

const defaultImage = (endpoint: IGDBMainEntityEndpoint) => {
	switch (endpoint) {
		case "games":
			return "/images/icons/entities/icon-game-default.png";
		case "companies":
			return "/images/icons/entities/icon-company-default.png";
		case "characters":
			return "/images/icons/entities/icon-character-default.png";
		default:
			return "/images/icons/entities/icon-default.png";
	}
};
