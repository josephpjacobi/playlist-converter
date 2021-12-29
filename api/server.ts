require("dotenv").config({ path: ".env" });

import express from "express";
import cors from "cors";
import fetch from "cross-fetch";

const port = 8000;
const clientID = process.env.SPOTIFY_CLIENT_ID;
const redirect_url = process.env.SPOTIFY_REDIRECT_URL;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

function buildSpotifyHeadersObject() {
	return {
		Authorization:
			"Basic " +
			Buffer.from(`${clientID}:${clientSecret}`).toString("base64"),
		"Content-Type": "application/x-www-form-urlencoded",
	};
}

async function requestAccessToken(code: string) {
	if (typeof code === "string" && typeof redirect_url === "string") {
		const body = new URLSearchParams({
			code: code,
			redirect_uri: redirect_url,
			grant_type: "authorization_code",
		});

		const response = await fetch("https://accounts.spotify.com/api/token", {
			method: "POST",
			headers: buildSpotifyHeadersObject(),
			body: body,
		});

		const json = await response.json();
		return json;
	}
}

async function refreshAccessToken(refreshToken: string) {}

const app = express();

app.use(cors());

app.get("/redirect", async (req, res, next) => {
	const { code, state, error } = req.query;

	if (!error && typeof code === "string") {
		const { access_token, token_type, expires_in, refresh_token, scope } =
			await requestAccessToken(code);
		console.log(access_token, token_type, expires_in, refresh_token, scope);

		res.send({ code, state });
	} else {
		res.send({ error, state });
	}
});

app.listen(port, () => {
	console.log(`Server running on port: ${port}`);
});
