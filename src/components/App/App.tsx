import React, { useEffect, useState } from 'react'

import Spotify from '../../util/Spotify'
import SpotifyNew from '../../util/SpotifyNew'
import { Playlist, UserPlayList } from '../Playlist'
import { SearchBar } from '../SearchBar'
import { SearchResults } from '../SearchResults'
import './App.css'
import { Bar } from './Bar'

const App = () => {
  const [searchResults, setSearchResults] = useState([])
  const [playlistName, setPlaylistName] = useState<string>('(New Playlist)')
  const [playlistTracks, setPlaylistTracks] = useState<TrackProps[]>([])
  const [userPlaylists, setUserPlaylists] = useState<[]>([])

  const addTrack = (track: TrackProps) => {
    const tracks: TrackProps[] = [...playlistTracks]
    if (tracks.find((savedTrack) => savedTrack.id === track.id)) {
      return
    }
    tracks.push(track)
    setPlaylistTracks(tracks)
  }

  const removeTrack = (track: TrackProps) => {
    let tracks = [...playlistTracks]
    tracks = tracks.filter((currentTrack) => currentTrack.id !== track.id)
    setPlaylistTracks(tracks)
  }

  const updatePlaylistName = (name: string) => {
    setPlaylistName(name)
  }

  const savePlaylist = () => {
    const tracks = [...playlistTracks]
    const trackUris = tracks.map((track) => track.uri)
    if (!trackUris.length) {
      return window.alert('Add tracks to the playlist')
    }
    Spotify.savePlaylist(playlistName, trackUris)?.then(() => {
      setPlaylistTracks([])
      setPlaylistName('(New Playlist)')
    })
  }

  const search = (searchTerm: string) => {
    Spotify.search(searchTerm).then((results) => {
      setSearchResults(results)
    })
  }

  useEffect(() => {
    Spotify.getUserPlaylists().then((playlists) => {
      setUserPlaylists(playlists)
    })
  })

  const testClick = () => {
    return SpotifyNew.search('Love')
  }

  return (
    <div>
      <Bar />
      <div className='App'>
        <button onClick={testClick}></button>
        <SearchBar onSearch={search} />
        <div className='App-playlist'>
          <SearchResults searchResults={searchResults} onAdd={addTrack} />
          <Playlist
            playlistName={playlistName}
            playlistTracks={playlistTracks}
            onRemove={removeTrack}
            onNameChange={updatePlaylistName}
            onSave={savePlaylist}
          />
          <UserPlayList playlists={userPlaylists} />
        </div>
      </div>
    </div>
  )
}

export default App

export interface TrackProps {
  album?: string
  artist?: string
  id: string
  image?: string
  name: string
  tracks: string
  uri?: string
}
