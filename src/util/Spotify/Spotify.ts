let accessToken: string
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
      window.history.pushState('Access Token', '', '/')
      return accessToken
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`
      window.location = (accessUrl as unknown) as Location
    }
    return
  },

  async search(term: string) {
    const searchAccessToken = Spotify.getAccessToken()
    const headers = { Authorization: `Bearer ${searchAccessToken}` }
    // Search for Song
    const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers,
    })
    const jsonResponse = await response.json()
    if (!jsonResponse.tracks) {
      return []
    }
    // Return song JSON
    return jsonResponse.tracks.items.map((track: any) => ({
      album: track.album.name,
      artist: track.artists[0].name,
      id: track.id,
      image: track.album.images[0].url,
      name: track.name,
      uri: track.uri,
    }))
  },

  async savePlaylist(name: string, trackUris: Array<string | undefined>) {
    if (!name || !trackUris.length) {
      return
    }

    const saveAccessToken = Spotify.getAccessToken()
    const headers = { Authorization: `Bearer ${saveAccessToken}` }
    let userId: string

    // Get UserID
    const response = await fetch('https://api.spotify.com/v1/me', {
      headers,
    })
    const jsonResponse = await response.json()
    userId = jsonResponse.id

    // Get User PLaylists
    const response1 = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
      body: JSON.stringify({ name }),
      headers,
      method: 'POST',
    })
    const jsonResponse1 = await response1.json()
    const playlistId = jsonResponse1.id

    // Save User Playlist
    const response2 = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
      body: JSON.stringify({ uris: trackUris }),
      headers,
      method: 'POST',
    })
    return response2
  },

  async getUserPlaylists() {
    const userAccessToken = Spotify.getAccessToken()
    const headers = { Authorization: `Bearer ${userAccessToken}` }
    let userId

    // Get User Id
    const response = await fetch('https://api.spotify.com/v1/me', {
      headers,
    })
    const jsonResponse = await response.json()
    userId = jsonResponse.id
    // Get User Playlists
    const response1 = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
      headers,
      method: 'GET',
    })
    const jsonResponse1 = await response1.json()
    if (!jsonResponse1.items) {
      return []
    }
    // Return User Playlists
    return jsonResponse1.items.map((item: any) => ({
      id: item.id,
      image: item.images[0].url,
      name: item.name,
      tracks: item.tracks.total,
    }))
  },

  async getUserInformation() {
    const userInfoAccessToken = Spotify.getAccessToken()
    const headers = { Authorization: `Bearer ${userInfoAccessToken}` }

    // Get user Info
    const response = await fetch('https://api.spotify.com/v1/me', {
      headers,
    })
    const jsonResponse = await response.json()
    // Return user info
    return {
      avatar: jsonResponse.images[0].url,
      name: jsonResponse.display_name,
    }
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
