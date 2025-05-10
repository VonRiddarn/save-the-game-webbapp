import { IGDBMainEntity, IGDBMainEntityEndpoint } from "./types";

export const getEndpointFromKey = (key: string): IGDBMainEntityEndpoint => {
	return key.split("_")[0] as IGDBMainEntityEndpoint;
};

export const entityToEndPoint = (entity: IGDBMainEntity): IGDBMainEntityEndpoint => {
	if ("cover" in entity) {
		return "games";
	} else if ("logo" in entity) {
		return "companies";
	} else if ("mug_shot" in entity) {
		return "characters";
	} else {
		throw new Error("Unknown entity type");
	}
};

export const igdbDefaultImageFromEndPoint = (endpoint: IGDBMainEntityEndpoint) => {
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
