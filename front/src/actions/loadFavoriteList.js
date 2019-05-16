import axios from 'axios'

const loadFavoriteList = (username) => {
	
	return (dispatch) => {
		
		return axios.get('/api/loadFavoriteList/'+username)
		      .then(function (message) {
						dispatch({
								type : 'FAVORITE_LOAD_SUCCESS',
								items : message.data,
								error : null,
						})
		      })
			.catch(function(error) {
				console.error(error);
				dispatch({
					type : 'FAVORITE_LOAD_ERROR',
					items : [],
					error : error,
				})
			})
	}
}
export default loadFavoriteList;