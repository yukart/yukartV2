import axios from 'axios'

const addMovieInFavoriteList = (username, movie) => {
	
	return (dispatch) => {
		
		return axios.get('/api/addMovieInFavoriteList/'+username+"/"+movie)
		      .then(function (message) {
						dispatch({
								type : 'FAVORITE_SUCCESS',
								items : movie,
								error : null,
						})
		      })
			.catch(function(error) {
				console.error(error);
				dispatch({
					type : 'FAVORITE_ERROR',
					items : [],
					error : error,
				})
			})
	}
}
export default addMovieInFavoriteList;