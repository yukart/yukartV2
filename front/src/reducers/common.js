
const defaultState = {
  appName: 'YukArt',
  film: [],
  artist: [],
  track: [],
  connexion: false,
  inscription: "",
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case "FETCH_FILM_SUCCESS":
    	state.film = action.items;
    	return {
	    	...state
    	};
    case "FETCH_ARTIST_SUCCESS":
      state.artist = action.items;
      return {
        ...state
      };
    case "RESET":
        state.artist = [];
        state.film = [];
        state.track = [];
        return {
          ...state
        };
    case "FETCH_TRACK_SUCCESS":
      state.track = action.items;
      return {
        ...state
      }; 
    case "CONNEXION_SUCCESS":
      state.connexion = action.items;
      return {
        ...state
      }; 
    case "CONNEXION_ERROR":
      state.connexion = false;
      return {
        ...state
      };
    case "INSCRIPTION_SUCCESS":
      state.inscription = action.items;
      return {
        ...state
      };
    default:
      return state;
  }
};
