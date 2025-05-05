/*
	This entire file is meant to act like a proxy.
	Its sole purpose is to gain and chach authorization and send the user queries to IGDB.
*/

import { getValidToken } from "@/services/igdb/authorize";

type RouteContext = {
	params: { endpoint: string };
};

export const POST = async (req: Request, { params }: RouteContext) => {
	// Next.JS gives us some shit about awaiting this. IDK what it does.
	const endpoint = (await params).endpoint;
	const body = await req.text();

	const token = await getValidToken();

	const clientId = process.env.NEXT_PUBLIC_IGDB_CLIENT_ID;
	if (!clientId) throw new Error("Client ID is not setup in environment variables");

	const igdbResponse = await fetch(`https://api.igdb.com/v4/${endpoint}`, {
		method: "POST",
		headers: {
			"Client-ID": clientId,
			Authorization: `Bearer ${token}`,
		},
		body,
	});

	if (!igdbResponse.ok) {
		return new Response("Failed to fetch from IGDB", { status: igdbResponse.status });
	}

	const data = await igdbResponse.json();
	return Response.json(data);
};
