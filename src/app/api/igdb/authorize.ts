import { loadToken, saveToken } from "./tokenCache";
import { Token } from "./types";

let accessToken: string | null = null;
let tokenExpiry: number | null = null;

const fetchNewToken = async (): Promise<Token> => {
	const localToken = await loadToken();

	// Checks if we have a token saved to file, but are not using it.
	// Eg: if the server has restarted
	if (localToken) {
		if (localToken.access_token && localToken.expires_in && Date.now() < localToken.expires_in * 1000) {
			return localToken;
		}
	}

	// Use environment variables to make it easier to share project on github
	const clientId = process.env.NEXT_PUBLIC_IGDB_CLIENT_ID;
	const clientSecret = process.env.IGDB_CLIENT_SECRET;

	if (!clientId || !clientSecret)
		throw new Error("Client ID or Secret is not setup in environment variables");

	const res = await fetch(
		`https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`,
		{
			method: "POST",
		}
	);
	if (!res.ok) throw new Error("Failed to fetch token");

	return await res.json();
};

export async function getValidToken(): Promise<string> {
	if (accessToken && tokenExpiry && Date.now() < tokenExpiry * 1000) {
		return accessToken;
	}

	const tokenData = await fetchNewToken();
	await cacheAndSaveToken(tokenData);

	return tokenData.access_token;
}

const cacheAndSaveToken = async (token: Token) => {
	const now = Date.now();
	accessToken = token.access_token;
	tokenExpiry = now + token.expires_in;

	const localToken = await loadToken();
	if (token !== localToken) await saveToken(token);
};
