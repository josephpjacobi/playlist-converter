import React from "react";
import "./App.css";

// require("dotenv").config();

function App() {
	console.log(process.env.REACT_APP_SPOTIFY_CLIENT_ID);

	return (
		<div className="App">
			<header className="App-header">
				Convert Your Spotify Playlist to Apple Music
			</header>
			<button onClick={() => console.log("Click")}>
				Log Into Spotify
			</button>
		</div>
	);
}

export default App;
