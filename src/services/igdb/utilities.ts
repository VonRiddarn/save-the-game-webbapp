import { IGDBNamedEntityEndpoint } from "./types";

export const getEndpointFromKey = (key: string): IGDBNamedEntityEndpoint => {
	return key.split("_")[0] as IGDBNamedEntityEndpoint;
};
