import SpotifyWebApi from 'spotify-web-api-node'

const spotifyApi: SpotifyWebApi = new SpotifyWebApi()
let userId: string

export const SpotifyNew = {
  setAccessToken(token: string | undefined) {
    if (token) {
      spotifyApi.setAccessToken(token)
    }
    if (spotifyApi.getAccessToken()) {
      SpotifyNew.setUserId()
    }
  },

  setUserId() {
    spotifyApi.getMe().then(
      (data) => {
        userId = data.body.id
      },
      (err) => {
        window.alert(err)
      },
    )
  },

  searchSongs(term: string) {
    spotifyApi.searchTracks(term).then(
      (data) => {
        return data.body.tracks?.items.map((track) => ({
          album: track.album.name,
          artist: track.artists[0].name,
          id: track.id,
          name: track.name,
          uri: track.uri,
        }))
      },
      (err) => {
        window.alert(err)
      },
    )
  },

  searchPlaylist(term: string) {
    spotifyApi.searchPlaylists(term).then(
      (data) => {
        console.log('Found playlists are', data.body)
      },
      (err) => {
        window.alert(err)
      },
    )
  },

  getUser() {
    spotifyApi.getMe().then(
      (data) => {
        return { id: data.body.id, name: data.body.display_name, avatar: data.body.images && data.body.images[0].url }
      },
      (err) => {
        window.alert(err)
      },
    )
  },

  getUsersPlaylists() {
    spotifyApi.getUserPlaylists(userId).then(
      (data) => {
        console.log('Retrieved playlists', data.body)
      },
      (err) => {
        window.alert(err)
      },
    )
  },

  createPlaylist(name: string, type: boolean) {
    spotifyApi.createPlaylist(userId, name, { public: type }).then(
      (data) => {
        console.log('Created playlist!')
      },
      (err: any) => {
        window.alert(err)
      },
    )
  },

  addToPlaylist(id: string, songArr: []) {
    // Add tracks to a playlist
    // ? '5ieJqeLJjjI8iJWaxeBLuK', ["spotify:track:4iV5W9uYEdYUVa79Axb7Rh", "spotify:track:1301WleyT98MSxVHPZCA6M"]
    spotifyApi.addTracksToPlaylist(id, songArr).then(
      (data) => {
        console.log('Added tracks to playlist!')
      },
      (err) => {
        window.alert(err)
      },
    )
  },

  //   changePlaylistDetails() {
  // spotifyApi.changePlaylistDetails('5ieJqeLJjjI8iJWaxeBLuK',
  // {
  //   name: 'This is a new name for my Cool Playlist, and will become private',
  //   'public' : false
  // }).then(function(data) {
  //    console.log('Playlist is now private!');
  // }, function(err) {
  //   console.log('Something went wrong!', err);
  // });
  //   }
}

export default SpotifyNew
