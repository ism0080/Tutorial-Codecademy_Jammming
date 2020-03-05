/* eslint-disable @typescript-eslint/camelcase */
import axios, { AxiosInstance } from 'axios'

let instance: AxiosInstance

const Spotify = {
  setAccessToken(token: any) {
    instance = axios.create({
      baseURL: 'https://api.spotify.com/v1/',
      headers: { Authorization: `Bearer ${token}` },
    })
  },

  async search(term: string) {
    const res = await instance.get(`search?type=track&q=${term}`)
    const { tracks } = res.data as SpotifyApi.SearchResponse

    if (!tracks) {
      return []
    }

    return tracks?.items.map((track: any) => ({
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

    const res1 = await instance.get('me')
    const { id: userId } = res1.data as SpotifyApi.CurrentUsersProfileResponse

    const res2 = await instance.post(`users/${userId}/playlists`, {
      name,
    })
    const { id: playlistId } = res2.data

    const res3 = await instance.post(`users/${userId}/playlists/${playlistId}/tracks`, {
      uris: trackUris,
    })
    return res3
  },

  async getUserPlaylists() {
    const userId = await instance.get('me')
    const { id } = userId.data as SpotifyApi.CurrentUsersProfileResponse

    const res = await instance.get(`users/${id}/playlists`)
    const { items } = res.data as SpotifyApi.ListOfUsersPlaylistsResponse

    if (!items) {
      return []
    }

    return items.map((item) => ({
      id: item.id,
      image: item.images[0].url,
      name: item.name,
      tracks: item.tracks.total,
    }))
  },

  async getUserInformation() {
    const res = await instance.get('me')
    const { images, display_name } = res.data as SpotifyApi.CurrentUsersProfileResponse

    return {
      avatar: images && images[0].url,
      name: display_name,
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
*/
