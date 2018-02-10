import React from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList';

const playlist = (props) => {

  const handleNameChange = (e) => {
    e.preventDefault();
    return props.onNameChange(e.target.value);
  };

  return (
    <div className="Playlist">
      <input onChange={(e)=>handleNameChange(e)} value={props.listName} />
        <TrackList isRemoval={true} tracks={props.listTracks} onRemove={props.onRemove}/>
      <a className="Playlist-save" onClick={props.onSave}>SAVE TO SPOTIFY</a>
    </div>
  );
};

export default playlist;
