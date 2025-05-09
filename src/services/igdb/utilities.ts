import { IGDBMainEntityEndpoint } from "./types";

export const getEndpointFromKey = (key: string): IGDBMainEntityEndpoint => {
	return key.split("_")[0] as IGDBMainEntityEndpoint;
};
