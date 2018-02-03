import React from 'react';
import './TrackList.css';
import Track from './Track/Track';

const trackList = (props) => {
  if (props.tracks) {
    return (
        <div className="TrackList">
          {props.tracks.map((track) => {
             return <Track track={track} key={track.id} onAdd={props.onAdd} isRemoval={props.isRemoval} onRemove={props.onRemove} />;
            })}
        </div>
      );
  } else {
    return null;
  }
};

export default trackList;
