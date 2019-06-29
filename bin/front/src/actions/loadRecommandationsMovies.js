import axios from 'axios'

const loadRecommandationsMovies = (username) => {
	
	return (dispatch) => {
		
		return axios.get('/api/loadRecommandationsMovies/'+username)
		      .then(function (message) {
						dispatch({
								type : 'RECOMMANDATION_MOVIE_LOAD_SUCCESS',
								items : message.data,
								error : null,
						})
		      })
			.catch(function(error) {
				console.error(error);
				dispatch({
					type : 'RECOMMANDATION_MOVIE_LOAD_ERROR',
					items : [],
					error : error,
				})
			})
	}
}
export default loadRecommandationsMovies;