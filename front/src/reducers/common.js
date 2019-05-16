
const defaultState = {
  appName: 'YukArt',
  film: [],
  artist: [],
  track: [],
  connexion: "",
  verificationTest: false,
  username: "",
  inscription: "",
  favoriteList: []
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
      state.connexion = action.items[1];
      state.username = action.items[0];
      return {
        ...state
      }; 
    case "VERIFICATION_CODE_SUCCESS":
      state.verificationTest = action.items;
      return {
        ...state
      }; 
      
    case "DECONNEXION_SUCCESS":
      state.connexion = false;
      state.username = "";
      return {
        ...state
      }; 
    case "INSCRIPTION_SUCCESS":
      state.inscription = action.items;
      return {
        ...state
      };
    case "FAVORITE_SUCCESS":
      let tmp=[...state.favoriteList]; //MANDATORY TO SETSTATE THE STORE
      tmp.push(action.items);
      state.favoriteList = tmp;
      return {
        ...state
      };
    default:
      return state;
  }
};
