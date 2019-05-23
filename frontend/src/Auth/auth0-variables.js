import { AUTH0_AUTH_DOMAIN, AUTH0_CLIENT_ID } from "../constants";

export const AUTH_CONFIG = {
	domain: AUTH0_AUTH_DOMAIN,
	clientId: AUTH0_CLIENT_ID,
	callbackUrl: "http://localhost:3000/callback"
};
