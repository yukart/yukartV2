
const defaultState = {
  appName: 'YukArt',
  film: [],
  artist: []
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
    default:
      return state;
  }
};
