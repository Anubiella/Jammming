import React, { Component } from 'react';
import './SearchBar.css';

class SearchBar extends Component {

      state = {
        term: ''
      };


search = () => {
  this.props.onSearch(this.state.term);
}

handleKeyPress = (event) => {
  if (event.key==='Enter') {
    this.props.onSearch(this.state.term);
  }
}

handleTermChange = (event) => {
  (event).preventDefault();
  this.setState({term: event.target.value});
}


  render() {
    return (
      <div className="SearchBar">
        <input onKeyPress={(e)=>this.handleKeyPress(e)}
               onChange={(e)=>this.handleTermChange(e)}
               placeholder="Enter A Song, Album, or Artist" />
        <a onClick={this.search}>SEARCH</a>
      </div>
    );
  }
};

export default SearchBar;
