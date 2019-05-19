import axios from 'axios'

const loadPopularMovies = () => {
	
	return (dispatch) => {
		
		return axios.get('/api/loadPopularMovies/')
		      .then(function (message) {
					dispatch({
							type : 'POPULAR_MOVIE_LOAD_SUCCESS',
							items : message.data,
							error : null,
					})
		      })
			.catch(function(error) {
				console.error(error);
				dispatch({
					type : 'POPULAR_MOVIE_LOAD_ERROR',
					items : [],
					error : error,
				})
			})
	}
}
export default loadPopularMovies;