import { RouteComponentProps } from '@reach/router'
import React, { useState } from 'react'

import { Bar, Playlist, SearchBar, SearchResults, SideDrawer } from 'components'
import Spotify from 'util/Spotify/Spotify'
// ToDO: import SpotifyNew from 'util/Spotify'

// import './Home.css'

export const HomeScene = ({ uri }: RouteComponentProps) => {
  const [searchResults, setSearchResults] = useState([])
  const [playlistName, setPlaylistName] = useState<string>('(New Playlist)')
  const [playlistTracks, setPlaylistTracks] = useState<TrackProps[]>([])
  // const [setUserPlaylists] = useState<[]>([])
  const [sideDrawer, setSideDrawer] = useState<boolean>(false)

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
    Spotify.savePlaylist(playlistName, trackUris, uri)?.then(() => {
      setPlaylistTracks([])
      setPlaylistName('(New Playlist)')
    })
  }

  const search = (searchTerm: string) => {
    Spotify.search(searchTerm, uri).then((results: any) => {
      setSearchResults(results)
    })
  }

  // const testClick = () => {
  //   return SpotifyNew.search('Love')
  // }

  const sideDrawerHandler = () => {
    setSideDrawer(!sideDrawer)
  }

  return (
    <>
      <Bar drawerClick={sideDrawerHandler} token={uri} />
      <div className='App'>
        {/* <button onClick={testClick}></button> */}
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

export interface TrackProps {
  album?: string
  artist?: string
  id: string
  image?: string
  name: string
  tracks: string
  uri?: string
}
