// META
export type Token = {
	access_token: string;
	expires_in: number;
	token_type: string; // Honestly, this will always be bearer, so kinda unecessary
};

// Entities
export type Game = {
	id: number;
	artworks: number[];
	category: number;
	cover: number;
	created_at: number;
	external_games: number[];
	first_release_date: number;
	game_modes: number[];
	genres: number[];
	involved_companies: number[];
	keywords: number[];
	name: string;
	platforms: number[];
	player_perspectives: number[];
	rating: number;
	rating_count: number;
	release_dates: number[];
	screenshots: number[];
	similar_games: number[];
	slug: string;
	summary: string;
	tags: number[];
	themes: number[];
	total_rating: number;
	total_rating_count: number;
	updated_at: number;
	url: string;
	videos: number[];
	websites: number[];
	checksum: string;
	language_supports: number[];
	game_localizations: number[];
	game_type: number;
};

export type Platform = {
	id: number;
	abbreviation: string;
	alternative_name: string;
	category: number;
	created_at: number;
	name: string;
	platform_logo: number;
	platform_family: number;
	slug: string;
	summary: string;
	updated_at: number;
	url: string;
	versions: number[];
	websites: number[];
	checksum: string;
	platform_type: number;
};

export type Genre = {
	id: number;
	created_at: number;
	name: string;
	slug: string;
	updated_at: number;
	url: string;
	checksum: string;
};

export type ReleaseDate = {
	id: number;
	category: number;
	created_at: number;
	date: number;
	game: number;
	human: string; // Parsed date. Eg: "Oct 10, 2018"
	m: number; // Month
	platform: number;
	region: number;
	updated_at: number;
	y: number; // Year
	checksum: string;
	date_format: number;
	release_region: number;
};

export type Character = {
	id: number;
	akas: string[];
	created_at: number;
	description: string;
	games: number[];
	mug_shot: number;
	name: string;
	slug: string;
	updated_at: number;
	url: string;
	checksum: string;
	character_gender: number;
	character_species: number;
};
