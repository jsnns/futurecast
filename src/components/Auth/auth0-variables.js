import { AUTH0_AUTH_DOMAIN, AUTH0_CLIENT_ID } from "../../constants";

export const AUTH_CONFIG = {
	domain: AUTH0_AUTH_DOMAIN,
	clientId: AUTH0_CLIENT_ID,
	callbackUrl:
		process.env.NODE_ENV === "development"
			? "http://localhost:3000/callback"
			: "https://futurecast.sansburyhome.com/callback"
};
