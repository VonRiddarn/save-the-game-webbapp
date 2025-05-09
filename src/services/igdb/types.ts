// META
export type Token = {
	access_token: string;
	expires_in: number;
	token_type: string; // Honestly, this will always be bearer, so kinda unecessary
};

// Entities
export type IGDBMainEntityEndpoint = "games" | "companies" | "characters";

export type IGDBMainEntityReferenceFull = {
	entity: IGDBMainEntity;
	endpoint: IGDBMainEntityEndpoint;
};

export type IGDBMainEntityReferenceId = {
	id: number;
	endpoint: IGDBMainEntityEndpoint;
};

export type IGDBEntity = {
	id: number;
	created_at: number;
	updated_at: number;
	checksum: string;
};

export type IGDBNamedEntity = IGDBEntity & {
	name: string;
	slug: string;
};

export type IGDBMainEntity = IGDBGame | IGDBCompany | IGDBCharacter;

export type IGDBGame = IGDBNamedEntity & {
	artworks: number[];
	category: number;
	cover: number;
	first_release_date: number;
	game_modes: number[];
	genres: number[];
	involved_companies: number[];
	screenshots: number[];
	similar_games: number[];
	summary: string;
	themes: number[];
	total_rating: number;
	game_type: number; // 0 = Main game, anything else is expansions, dlc, etc
};

export type IGDBGameParsed = IGDBNamedEntity & {
	artworks: { ids: number[]; image_ids: string[] };
	category: { id: number; name: string };
	cover: { id: number; image_id: string };
	first_release_date: { date: number; human: string };
	game_modes: { ids: number[]; names: string[] };
	genres: { ids: number[]; names: string[] };
	involved_companies: { ids: number[]; names: string[] };
	screenshots: { ids: number[]; image_ids: string[] };
	similar_games: number[];
	summary: string;
	themes: { ids: number[]; names: string[] };
	total_rating: number;
	game_type: { id: number; name: string }; // 0 = Main game, anything else is expansions, dlc, etc
};

export type IGDBCharacter = IGDBNamedEntity & {
	akas: string[];
	description: string;
	games: number[];
	mug_shot: number;
	character_gender: number;
	character_species: number;
};

export type IGDBCharacterParsed = IGDBNamedEntity & {
	akas: string[];
	description: string;
	games: { ids: number[]; names: string[] };
	mug_shot: { id: number; image_id: string };
	character_gender: { id: number; name: string };
	character_species: { id: number; name: string };
};

export type IGDBCompany = IGDBNamedEntity & {
	change_date: number;
	change_date_category: number;
	country: number;
	description: string;
	developed: number[];
	logo: number;
	parent?: number;
	start_date: number;
	status: number;
};

export type IGDBCompanyParsed = IGDBNamedEntity & {
	change_date: { date: number; human: string };
	country: { id: number; iso: string };
	description: string;
	developed: { ids: number[]; names: string[] };
	logo: { id: number; image_id: string };
	parent?: { id: number; name: string };
	start_date: { date: number; human: string };
	status: { id: number; name: string };
};
