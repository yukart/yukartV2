import axios from 'axios'

const searchFilmByTitle = (name) => {
	
	return (dispatch) => {
		
		return axios.get('/api/filmByTitle/'+name)
		      .then(function (message) {
		    	  dispatch({
		    			type : 'FETCH_FILM_SUCCESS',
		    			items : message.data,
		    			error : null,
		    		  })
		      })
			.catch(function(error) {
				console.error(error);
				dispatch({
					type : 'FETCH_FILM_ERROR',
					items : [],
					error : error,
				})
			})
	}
}
export default searchFilmByTitle;