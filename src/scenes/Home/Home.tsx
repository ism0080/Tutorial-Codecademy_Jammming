import React, { useState } from 'react'

import { Bar, Playlist, SearchBar, SearchResults, SideDrawer } from 'components'
import Spotify from 'util/Spotify/Spotify'

// import './Home.css'

export const HomeScene = () => {
  const [searchResults, setSearchResults] = useState([])
  const [playlistName, setPlaylistName] = useState<string>('(New Playlist)')
  const [playlistTracks, setPlaylistTracks] = useState<TrackSearch[]>([])
  // const [setUserPlaylists] = useState<[]>([])
  const [sideDrawer, setSideDrawer] = useState<boolean>(false)

  const addTrack = (track: TrackSearch) => {
    const tracks: TrackSearch[] = [...playlistTracks]
    if (tracks.find((savedTrack) => savedTrack.id === track.id)) {
      return
    }
    tracks.push(track)
    setPlaylistTracks(tracks)
  }

  const removeTrack = (track: TrackSearch) => {
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
    Spotify.search(searchTerm).then((results: any) => {
      setSearchResults(results)
    })
  }

  const sideDrawerHandler = () => {
    setSideDrawer(!sideDrawer)
  }

  return (
    <>
      <Bar drawerClick={sideDrawerHandler} />
      <div className='App'>
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
          {sideDrawer ? <SideDrawer drawerClick={sideDrawerHandler} /> : null}
        </div>
      </div>
    </>
  )
}
