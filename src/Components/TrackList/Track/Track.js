import React from 'react';
import './Track.css';

const track = (props) => {

  function renderAction() {
    if (props.isRemoval){
      return <a className="Track-action" onClick={(e)=>removeTrack(e,props.track)}>-</a>;
    } else {
      return <a className="Track-action" onClick={(e)=>addTrack(e,props.track)}>+</a>;
    }
  };

  const addTrack = (e, track) => {
    e.preventDefault();
    return props.onAdd(track);
  };

  const removeTrack = (e, track) => {
    e.preventDefault();
    return props.onRemove(track);
  };

  return (
    <div className="Track">
      <div className="Track-information">
        <h3>{props.track.name}</h3>
        <p>{props.track.artist} | {props.track.album}</p>
      </div>
      {renderAction()}
    </div>
  );
};

export default track;
