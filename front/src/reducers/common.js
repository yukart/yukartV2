
const defaultState = {
  appName: 'YukArt',
  films: [""],
  film: null
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case "ADD_FILM":
    	state.films.push(action.film);
    	return {
	    	...state
    	};
    case "FETCH_FILM_SUCCESS":
    	state.film = action.items;
    	return {
	    	...state
    	};
    default:
      return state;
  }
};
