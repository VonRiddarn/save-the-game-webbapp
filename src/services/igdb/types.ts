export type Token = {
	access_token: string;
	expires_in: number;
	token_type: string; // Honestly, this will always be bearer, so kinda unecessary
};
