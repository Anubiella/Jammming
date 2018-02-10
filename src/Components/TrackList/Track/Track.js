import React from 'react';
import './Track.css';

const track = (props) => {

  let audioEl = null;

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

  const playTrack = (e) => {
    e.preventDefault();
    audioEl.play();
  }

  const pauseTrack = (e) => {
    e.preventDefault();
    audioEl.pause();
  }

  const volumeUp = (e) => {
    e.preventDefault();
    audioEl.volume+=0.1;
  }

  const volumeDown = (e) => {
    e.preventDefault();
    audioEl.volume-=0.1;
  }

  return (
    <div className="Track">
      <div className="Track-information">
        <h3>{props.track.name}</h3>
        <p>{props.track.artist} | {props.track.album}</p>
        <div>
          <audio ref={(audio) => { audioEl = audio; }} src={props.track.preview} type="audio/mpeg"/>
          <button onClick={(e)=>playTrack(e)}>Play</button>
          <button onClick={(e)=>pauseTrack(e)}>Pause</button>
          <button onClick={(e)=>volumeUp(e)}>Vol+</button>
          <button onClick={(e)=>volumeDown(e)}>Vol-</button>
        </div>
      </div>
      {renderAction()}
    </div>
  );
};

export default track;
