# Project Steps

# 1 Get Access Token from Spotify - DONE

# 1A Enable Refresh Token

# 2 Get User Profile Information

2.1 Get Current Users Profile Endpoint: GET /me

    Response:
    {
      "country": "string",
      "display_name": "string", <--------- display name OR "Spotify User" if null
      "email": "string", <---------------- email
      "explicit_content": {
        "filter_enabled": true,
        "filter_locked": true
      },
      "external_urls": {
        "spotify": "string"
      },
      "followers": {
        "href": "string",
        "total": 0
      },
      "href": "string",
      "id": "string", <-------------------- id (Spotify User ID)
      "images": [ <------------------------ images.url to display on profile page
        {
          "url": "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228\n",
          "height": 300,
          "width": 300
        }
      ],
      "product": "string",
      "type": "string",
      "uri": "string"
    }

2.2 Handle Errors:
401 - Reauthenticate the User
403?
429 - Exceeded rate limit - try again in X amount of time

# 3 Get User's Playlists

    2.1 Get Current User's Playlists Endpoint: GET /me/playlists
      limit=50

      Response:
      {
        "href": "https://api.spotify.com/v1/me/shows?offset=0&limit=20\n",
        "items": [   <--------------------------------------------------------- items an Array of Objects ??? - NEED TO SEE WHAT THIS LOOKS LIKE
          {}         <--------------------------------------------------------- I need the PLAYLIST ID from each playlist
        ],
        "limit": 20,
        "next": "https://api.spotify.com/v1/me/shows?offset=1&limit=1", <------- next (URL to the next page of playlists OR null)
        "offset": 0,
        "previous": "https://api.spotify.com/v1/me/shows?offset=1&limit=1", <--- previous IF NOT NULL (previous page of playlists OR null)
        "total": 4
      }

# 4 User Selects Which Playlist they would like to convert

    4.1 Conditionally render radio buttons to select the playlist?

# 5 Get Playlist Details for selected playlist

    5.1 Which endpoint should I use?

        Start with Option 2, if a user wants to copy the name/description/playlist image over to Apple Music then we can use Option 1

     OPTION 1:
      Get Playlist Endpoint: GET /playlists/{playlist_id}

        Response:
          {
            "collaborative": true,
            "description": "string", <------------------------------------------------------------------- description (description of playlist)
            "external_urls": {
              "spotify": "string"
            },
            "followers": {
              "href": "string",
              "total": 0
            },
            "href": "string",
            "id": "string",
            "images": [
              {
                "url": "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228\n", <------------ images.url (Playlist image?)
                "height": 300,
                "width": 300
              }
            ],
            "name": "string", <---------------------------------------------------------------------------- name (Name of the playlist)
            "owner": {
              "display_name": "string",
              "external_urls": {
                "spotify": "string"
              },
              "followers": {
                "href": "string",
                "total": 0
              },
              "href": "string",
              "id": "string",
              "images": [
                {
                  "url": "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228\n",
                  "height": 300,
                  "width": 300
                }
              ],
              "type": "user",
              "uri": "string"
            },
            "public": true,
            "snapshot_id": "string",
            "tracks": { <------------------------------------------------------------------------------------ tracks.items (Array or Objects)
              "href": "https://api.spotify.com/v1/me/shows?offset=0&limit=20\n",
              "items": [
                {} <------------------------------------------------------------------------------------------ NEED TO SEE WHAT OBJECT LOOKS LIKE
              ],
              "limit": 20,
              "next": "https://api.spotify.com/v1/me/shows?offset=1&limit=1",
              "offset": 0,
              "previous": "https://api.spotify.com/v1/me/shows?offset=1&limit=1",
              "total": 4
            },
            "type": "string",
            "uri": "string"
          }

     OPTION 2:
      Get Playlist Items Endpoint: GET /playlists/{playlist_id}/tracks

      Response:
       {
          "href": "https://api.spotify.com/v1/me/shows?offset=0&limit=20\n",
          "items": [
            {} <------------------------------------------------------------------------------------------ NEED TO SEE WHAT OBJECT LOOKS LIKE
          ],
          "limit": 20,
          "next": "https://api.spotify.com/v1/me/shows?offset=1&limit=1", <-------------------------------- next (If playlist has over 50 songs)
          "offset": 0,
          "previous": "https://api.spotify.com/v1/me/shows?offset=1&limit=1", <----------------------------- previos (If playlist has over 50 songs and user goes to the next page)
          "total": 4
        }

# 6 "Covert Playlist"
