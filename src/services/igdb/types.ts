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
	rating: number;
	screenshots: number[];
	similar_games: number[];
	summary: string;
	themes: number[];
	total_rating: number;
	game_type: number; // 0 = Main game, anything else is expansions, dlc, etc
};

export type IGDBCharacter = IGDBNamedEntity & {
	akas: string[];
	description: string;
	games: number[];
	mug_shot: number;
	character_gender: number;
	character_species: number;
};

export type IGDBCompany = IGDBNamedEntity & {
	change_date: number;
	change_date_category: number;
	country: number;
	description: string;
	developed: number[];
	logo: number;
	parent: number;
	start_date: number;
	start_date_category: number;
	status: number;
	start_date_format: number;
};
