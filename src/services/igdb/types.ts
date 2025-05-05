// META
export type Token = {
	access_token: string;
	expires_in: number;
	token_type: string; // Honestly, this will always be bearer, so kinda unecessary
};

// Entities
export type IGDBEntity = {
	id: number;
	created_at: number;
	updated_at: number;
	checksum: string;
};

export type IGDBNamedEntity = IGDBEntity & {
	name: string;
	slug: string;
	url: string;
};

export type Game = IGDBNamedEntity & {
	artworks: number[];
	category: number;
	cover: number;
	external_games: number[];
	first_release_date: number;
	game_modes: number[];
	genres: number[];
	involved_companies: number[];
	keywords: number[];
	platforms: number[];
	player_perspectives: number[];
	rating: number;
	rating_count: number;
	release_dates: number[];
	screenshots: number[];
	similar_games: number[];
	summary: string;
	tags: number[];
	themes: number[];
	total_rating: number;
	total_rating_count: number;
	videos: number[];
	websites: number[];
	language_supports: number[];
	game_localizations: number[];
	game_type: number;
};

export type Platform = IGDBNamedEntity & {
	abbreviation: string;
	alternative_name: string;
	category: number;
	platform_logo: number;
	platform_family: number;
	summary: string;
	versions: number[];
	websites: number[];
	platform_type: number;
};

export type Genre = IGDBNamedEntity;

export type Character = IGDBNamedEntity & {
	akas: string[];
	description: string;
	games: number[];
	mug_shot: number;
	character_gender: number;
	character_species: number;
};

export type ReleaseDate = IGDBEntity & {
	category: number;
	date: number;
	game: number;
	human: string;
	m: number;
	platform: number;
	region: number;
	y: number;
	date_format: number;
	release_region: number;
};
