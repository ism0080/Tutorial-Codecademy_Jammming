import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: [
        {
          id: '1131',
          name: 'Dave',
          artist: 'Professor X',
          album: 'Professor X'
        },
        {
          id: '12331',
          name: 'Hot (ft Gunna)',
          artist: 'Young Thug',
          album: 'Hot'

        }
      ],
      playlistName: 'DJ Mackdaddy',
      playlistTracks: [
        {
          id: '111',
          name: 'Awake',
          artist: 'Tkay Maidza',
          album: 'Awake'
        },
        {
          id: '222',
          name: 'intro',
          artist: 'DaBaby',
          album: 'Untitled'
        }
      ]
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }

  addTrack(track) {
    let tracks = this.state.playlistTracks;
    if (tracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    } 
      tracks.push(track);
      this.setState({
        playlistTracks: tracks
      })

  }

  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);
    this.setState({playlistTracks: tracks});
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} 
                            onAdd={this.addTrack} />
            <Playlist playlistName={this.state.playlistName} 
                      playlistTracks={this.state.playlistTracks} 
                      onRemove={this.removeTrack}/>
          </div>
        </div>
      </div>
    )
  }
}
export default App;
