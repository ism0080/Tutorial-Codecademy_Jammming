import SpotifyWebApi from 'spotify-web-api-node'

// const spotifyApi = new SpotifyWebApi({
//   clientId: 'b14de9fe7da744dba3bd803d7e62881f',
//   redirectUri: 'http://localhost:3000/',
// })
let accessToken: string
let spotifyApi: SpotifyWebApi
const scopes = ['user-read-private', 'user-read-email']
const redirectUri = 'http://localhost:3000/'
const clientId = 'b14de9fe7da744dba3bd803d7e62881f'
const state = 'some-state-of-my-choice'

const SpotifyNew = {
  getAccessToken() {
    spotifyApi = new SpotifyWebApi({
      clientId,
      redirectUri,
    })

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

  getToken(): SpotifyWebApi {
    spotifyApi = new SpotifyWebApi({
      clientId,
      redirectUri,
    })
    if (spotifyApi.getAccessToken()) {
      console.log('yes')
    }
    const authorizeURL = spotifyApi.createAuthorizeURL(scopes, state)
    window.location = (authorizeURL as unknown) as Location
    const token = spotifyApi.getAccessToken() || ''
    spotifyApi.setAccessToken(token)
    return spotifyApi
  },

  search(term: string) {
    const searchAccessToken: string = SpotifyNew.getAccessToken() || ''
    spotifyApi.setAccessToken(searchAccessToken)
    spotifyApi.searchTracks(term).then(
      function(data) {
        return data.body.tracks?.items.map((track) => ({
          album: track.album.name,
          artist: track.artists[0].name,
          id: track.id,
          name: track.name,
          uri: track.uri,
        }))
      },
      function(err) {
        console.error(err)
      },
    )
  },
}

export default SpotifyNew
