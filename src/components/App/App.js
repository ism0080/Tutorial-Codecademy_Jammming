import React, { useEffect, useState } from 'react';
import './App.css';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import { Playlist } from '../Playlist/Playlist';
import { UserPlayList } from '../Playlist/UserPlayList'
import Spotify from '../../util/Spotify';

const App = () => {
  const [searchResults, setSearchResults] = useState([])
  const [playlistName, setPlaylistName] = useState('(New Playlist)')
  const [playlistTracks, setPlaylistTracks] = useState([])
  const [userPlaylists, setUserPlaylists] = useState([])

  const addTrack = (track) => {
    let tracks = [...playlistTracks];
    if (tracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
    tracks.push(track);
    setPlaylistTracks(tracks);
  }

  const removeTrack = (track) => {
    let tracks = [...playlistTracks];
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);
    setPlaylistTracks(tracks);
  }

  const updatePlaylistName = (name) => {
    setPlaylistName(name);
  }

  const savePlaylist = () => {
    const tracks = [...playlistTracks]
    const trackUris = tracks.map(track => track.uri);
    if (!trackUris.length) {
      return window.alert('No Songs in Playlist')
    }
    Spotify.savePlaylist(playlistName, trackUris).then(() => {
      setPlaylistTracks([]);
      setPlaylistName('(New Playlist)');
    });
  }

  const search = (searchTerm) => {
    Spotify.search(searchTerm).then(searchResults => {
      setSearchResults(searchResults);
    });
  }

  useEffect(() => {
    Spotify.getUserPlaylists().then(playlists => {
      setUserPlaylists(playlists)
    })
  })

  return (
    <div>
      <h1>&#9835; DJ <span className="highlight">Mackdaddy Playlist</span> Creator &#9835;</h1>
      <div className="App">
        <SearchBar onSearch={search} />
        <div className="App-playlist">
          <SearchResults searchResults={searchResults}
            onAdd={addTrack} />
          <Playlist playlistName={playlistName}
            userPlaylists={userPlaylists}
            playlistTracks={playlistTracks}
            onRemove={removeTrack}
            onNameChange={updatePlaylistName}
            onSave={savePlaylist} />
          <UserPlayList playlists={userPlaylists} />
        </div>
      </div>
    </div>
  )
}

export default App;
