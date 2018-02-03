import React from 'react';
import './SearchResults.css';
import TrackList from '../TrackList/TrackList';

const searchResults = (props) => {
    return (
      <div className="SearchResults">
        <h2>Results</h2>
          <TrackList onAdd={props.onAdd} tracks={props.searchResults}/>
      </div>
    );
};

export default searchResults;
