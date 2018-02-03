let accessToken;
const Client_ID = '93f07c5bb75b4b10955adf394b77785e';
const redirect_URI = 'http://jammming_furno.surge.sh/';


const Spotify = {

  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (accessTokenMatch&&expiresInMatch) {
      accessToken = accessTokenMatch[1];
      let expiresIn = Number(expiresInMatch[1]);
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
        const accessUrl = 'https://accounts.spotify.com/authorize?client_id='+Client_ID+'&response_type=token&scope=playlist-modify-public&redirect_uri='+redirect_URI;
        window.location = accessUrl;
    }
},

  search(term){
    const accessToken = Spotify.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
  }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      if (!jsonResponse.tracks) {
        return [];
      }
      return jsonResponse.tracks.items.map(track => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri
      }));
    });
  },

  savePlaylist(playlistName, uriList){
    if (!playlistName||!uriList) {
        return;
    }

    const accessToken = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` };
    let userID;

    return fetch(`https://api.spotify.com/v1/me`, {headers})
    .then(response => {
        return response.json();
      }).then(jsonResponse => {
        userID = jsonResponse.id
        return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`,
          {headers: headers, method: 'POST', body: JSON.stringify({name:playlistName})})
          .then(response => response.json()).then(jsonResponse=>{
            const playlistID = jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`,
              {headers: headers, method: 'POST', body: JSON.stringify({uris: uriList})});
          });
        });

  }



};

export default Spotify;
