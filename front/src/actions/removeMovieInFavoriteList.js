import axios from 'axios'

const removeMovieInFavoriteList = (username, movie) => {
	
	return (dispatch) => {
		
		return axios.get('/api/removeMovieInFavoriteList/'+username+"/"+movie)
		      .then(function (message) {
						dispatch({
								type : 'FAVORITE_REMOVE_SUCCESS',
								items : movie,
								error : null,
						})
		      })
			.catch(function(error) {
				console.error(error);
				dispatch({
					type : 'FAVORITE_REMOVE_ERROR',
					items : [],
					error : error,
				})
			})
	}
}
export default removeMovieInFavoriteList;