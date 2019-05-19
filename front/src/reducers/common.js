const defaultState = {
  appName: 'YukArt',
  film: [],
  artist: [],
  track: [],
  connexion: "",
  verificationTest: false,
  username: "",
  inscription: "",
  favoriteMovieList: [],
  popularMovieList: [],
  recommandationMovieList: []
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
      state.appName= 'YukArt';
      state.film= [];
      state.artist= [];
      state.track= [];
      state.connexion= "";
      state.verificationTest= false;
      state.username= "";
      state.inscription= "";
      state.favoriteMovieList= [];
      return {
        ...state
      }; 
    case "INSCRIPTION_SUCCESS":
      state.inscription = action.items;
      return {
        ...state
      };
    case "FAVORITE_MOVIE_ADD_SUCCESS":
      let tmp=[...state.favoriteMovieList]; //MANDATORY TO SETSTATE THE STORE
      tmp.push(action.items);
      state.favoriteMovieList = tmp;
      return {
        ...state
      };
    case "FAVORITE_MOVIE_REMOVE_SUCCESS":
      let tmp2=[...state.favoriteMovieList]; //MANDATORY TO SETSTATE THE STORE
      state.favoriteMovieList = tmp2.filter(l=>l.title!==action.items);
      return {
        ...state
      };
    case "FAVORITE_MOVIE_LOAD_SUCCESS":
      state.favoriteMovieList = action.items;
      return {
        ...state
      };
    case "RESET_SUCCESS":
      state.film= [];
      state.artist= [];
      state.track= [];
      return {
        ...state
      }; 

    case "POPULAR_MOVIE_LOAD_SUCCESS":
      state.popularMovieList=action.items
      return {
        ...state
      };
    case "RECOMMANDATION_MOVIE_LOAD_SUCCESS":
        state.recommandationMovieList=action.items
        return {
          ...state
        };
    default:
      return state;
  }
  
};
