import "./App.css";

function App() {
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

	const state = generateRandomString(16);
	localStorage.setItem("stateKey", state);
	const scopes: string = "playlist-read-collaborative playlist-read-private";

	function buildSpotifyAuthRequestURL() {
		const clientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
		const redirect_url = process.env.REACT_APP_SPOTIFY_REDIRECT_URL;
		const authUrl = "https://accounts.spotify.com/authorize";

		if (
			typeof clientSecret === "string" &&
			typeof redirect_url === "string" &&
			state.length > 15
		) {
			return (
				authUrl +
				"?response_type=token" +
				`&client_id=${encodeURIComponent(clientSecret)}` +
				`&scope=${scopes}` +
				`&redirect_uri=${encodeURIComponent(redirect_url)}` +
				`&state=${encodeURIComponent(state)}`
			);
		} else {
			console.log("error");
		}
	}

	return (
		<div className="App">
			<header className="App-header">
				Convert Your Spotify Playlist to Apple Music
			</header>
			<button onClick={() => console.log(buildSpotifyAuthRequestURL())}>
				Log Into Spotify
			</button>
		</div>
	);
}

export default App;
