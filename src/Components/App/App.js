import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

class App extends Component{

    state = {
        searchResults: [],
        playlistName: 'New Playlist',
        playlistTracks: []
      };

  addTrack = (newTrack) => {
    let tempList = this.state.playlistTracks;
    tempList.push(newTrack);
    return this.setState({playlistTracks: tempList});
  }

  removeTrack = (track) => {
    let test = this.state.playlistTracks.filter((item)=>{
      return item.id!==track.id;
    });
    this.setState({playlistTracks: test});
  }

  updatePlaylistName = (newName) => {
    this.setState({playlistName: newName});
  }

  savePlaylist = () => {
    let trackURIs = this.state.playlistTracks.map((track)=>{
      return track.uri;
    });
    Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
     this.setState({
       playlistName: 'New Playlist',
       playlistTracks: []
     });
   });
  }

  searchTerm = (term) => {
    Spotify.search(term).then(searchResults => {
     this.setState({searchResults: searchResults});
   });
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
           <SearchBar onSearch={this.searchTerm} />
          <div className="App-playlist">
            <SearchResults  onAdd={(track)=>this.addTrack(track)}
              searchResults={this.state.searchResults} />
            <Playlist onSave={this.savePlaylist} listName={this.state.playlistName}
              onNameChange={this.updatePlaylistName} listTracks={this.state.playlistTracks}
              onRemove={(track)=>this.removeTrack(track)} />
          </div>
        </div>
      </div>
    );
  }
};

export default App;
