import axios from 'axios'

const addMovieInFavoriteList = (username, movie) => {
	
	return (dispatch) => {
		
		return axios.get('/api/addMovieInFavoriteList/'+username+"/"+movie)
		      .then(function (message) {
						dispatch({
								type : 'FAVORITE_MOVIE_ADD_SUCCESS',
								items : message.data,
								error : null,
						})
		      })
			.catch(function(error) {
				console.error(error);
				dispatch({
					type : 'FAVORITE_MOVIE_ADD_ERROR',
					items : [],
					error : error,
				})
			})
	}
}
export default addMovieInFavoriteList;