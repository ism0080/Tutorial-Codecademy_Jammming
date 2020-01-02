let accessToken
const redirectUri = 'http://localhost:3000/'
const clientId = 'b14de9fe7da744dba3bd803d7e62881f'

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken
    }
    // Check for access token match
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/) // The page URL (window.location.href)
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/)

    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1]
      const expiresIn = Number(expiresInMatch[1])
      // Clears the parameters from the URL to grab a new access token
      window.setTimeout(() => (accessToken = ''), expiresIn * 1000)
      window.history.pushState('Access Token', null, '/')
      return accessToken
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`
      window.location = accessUrl
    }
    return
  },

  search(term) {
    const searchAccessToken = Spotify.getAccessToken()

    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: {
        Authorization: `Bearer ${searchAccessToken}`,
      },
    })
      .then((response) => {
        return response.json()
      })
      .then((jsonResponse) => {
        if (!jsonResponse.tracks) {
          return []
        }
        return jsonResponse.tracks.items.map((track) => ({
          album: track.album.name,
          artist: track.artists[0].name,
          id: track.id,
          name: track.name,
          uri: track.uri,
        }))
      })
  },

  savePlaylist(name, trackUris) {
    if (!name || !trackUris.length) {
      return
    }

    const accessToken = Spotify.getAccessToken()
    const headers = { Authorization: `Bearer ${accessToken}` }
    let userId

    // Get User ID and add playlist to their playlist
    return fetch('https://api.spotify.com/v1/me', {
      headers,
    })
      .then((response) => response.json())
      .then((jsonResponse) => {
        userId = jsonResponse.id
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
          body: JSON.stringify({ name }),
          headers,
          method: 'POST',
        })
          .then((response) => response.json())
          .then((jsonResponse) => {
            const playlistId = jsonResponse.id
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
              headers,
              method: 'POST',
              body: JSON.stringify({ uris: trackUris }),
            })
          })
      })
  },

  getUserPlaylists() {
    const accessToken = Spotify.getAccessToken()
    const headers = { Authorization: `Bearer ${accessToken}` }
    let userId

    return fetch('https://api.spotify.com/v1/me', {
      headers,
    })
      .then((response) => response.json())
      .then((jsonResponse) => {
        userId = jsonResponse.id
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
          headers,
          method: 'GET',
        })
          .then((response) => {
            return response.json()
          })
          .then((jsonResponse) => {
            if (!jsonResponse.items) {
              return []
            }
            return jsonResponse.items.map((item) => ({
              id: item.id,
              image: item.images[0].url,
              name: item.name,
              tracks: item.tracks.total,
            }))
          })
      })
  },
}

export default Spotify

/*
    TODO: Things to Add:
    - Your Current Top artists
    - View songs in playlists
    - Edit songs in playlists
    - Song player
    - Show users Name
    - Webpack
*/
