import path from "path";
import fs from "fs/promises";
import { Token } from "./types";

const tokenPath = path.resolve(process.cwd(), "tokenCache.json");

export const saveToken = async (token: Token) =>
	await fs.writeFile(tokenPath, JSON.stringify(token), "utf-8");

export const loadToken = async (): Promise<Token | null> => {
	try {
		const data = await fs.readFile(tokenPath, "utf-8");
		return JSON.parse(data) as Token;
	} catch {
		return null;
	}
};
