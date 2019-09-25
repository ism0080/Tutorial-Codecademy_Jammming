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
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} />
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks}/>
          </div>
        </div>
      </div>
    )
  }
}
export default App;
