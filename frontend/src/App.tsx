import { useEffect, useState } from "react";
import "./App.css";

function App() {
	const [loggedIn, setLoggedIn] = useState(false);
	const [loading, setLoading] = useState([false, ""]);
	const [stateKey, setStateKey] = useState(generateRandomString(16));
	const [accessToken, setAccessToken] = useState("");

	const scopes: string =
		"playlist-read-collaborative playlist-read-private user-read-private user-read-email";

	function generateRandomString(length: number): string {
		let text: string = "";
		const possible: string =
			"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

		for (let i = 0; i < length; i++) {
			text =
				text +
				possible.charAt(Math.floor(Math.random() * possible.length));
		}

		return text;
	}

	function buildSpotifyAuthRequestURL() {
		const clientID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
		const redirect_url = process.env.REACT_APP_SPOTIFY_REDIRECT_URL;
		const authUrl = "https://accounts.spotify.com/authorize";

		if (
			typeof clientID === "string" &&
			typeof redirect_url === "string" &&
			stateKey.length > 15
		) {
			return (
				authUrl +
				"?response_type=code" +
				`&client_id=${encodeURIComponent(clientID)}` +
				`&scope=${encodeURIComponent(scopes)}` +
				`&redirect_uri=${redirect_url}` +
				`&state=${encodeURIComponent(stateKey)}`
			);
		} else {
			console.log("error");
		}
	}

	// useState(() => {
	// 	function getAccessTokenFromURL(): string | null {
	// 		const accessToken = new URLSearchParams(
	// 			window.location.href.split("#").pop()
	// 		).get("access_token");
	// 		return accessToken;
	// 	}

	// 	const params = getAccessTokenFromURL();

	// 	if (params) {
	// 		setAccessToken(params);
	// 	}
	// });

	// async function authorizeSpotifyUser() {
	// 	const authURL = buildSpotifyAuthRequestURL();
	// 	console.log(authURL);

	// 	try {
	// 		if (typeof authURL === "string") {
	// 			const spotifyAuthResponse = await fetch(authURL);
	// 			if (!spotifyAuthResponse.ok) {
	// 				throw Error(
	// 					`${spotifyAuthResponse.status} ${spotifyAuthResponse.statusText}`
	// 				);
	// 			}
	// 			// const spotifyAuthJSONResponse =
	// 			// 	await spotifyAuthResponse.json();
	// 			// return spotifyAuthJSONResponse;
	// 		} else {
	// 			throw Error("The buildSpotifyAuthURL did not return a string");
	// 		}
	// 	} catch (error) {
	// 		console.log(
	// 			"There was an issue authenticating the Spotify user: ",
	// 			error
	// 		);
	// 	}
	// }

	async function getSpotifyCredentials() {
		const response = await fetch("http://localhost:8000/spotify/authorize");
		console.log(response);
	}

	const SpotifyLogin = () => {
		return (
			<a href={buildSpotifyAuthRequestURL()}>
				<button>Log Into Spotify</button>
			</a>
		);
	};

	interface SpotifyUserProps {
		accessToken: string;
	}

	const SpotifyUserPage = ({ accessToken }: SpotifyUserProps) => {
		useEffect(() => {
			async function getCurrentUsersPlaylistData() {
				const playlistReponse = await fetch(
					"https://api.spotify.com/me/playlists"
				);
				const jsonResponse = await playlistReponse.json();
				return jsonResponse;
			}

			console.log(getCurrentUsersPlaylistData());
		}, []);
		return <div></div>;
	};

	return (
		<div className="App">
			<header className="App-header">
				Convert Your Spotify Playlist to Apple Music
			</header>
			{accessToken ? (
				<SpotifyUserPage accessToken={accessToken} />
			) : (
				<SpotifyLogin />
			)}
		</div>
	);
}

export default App;
