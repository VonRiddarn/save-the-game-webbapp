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
