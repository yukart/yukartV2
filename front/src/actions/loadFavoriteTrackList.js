import axios from 'axios'

const loadFavoriteTrackList = (username) => {
	
	return (dispatch) => {
		
		return axios.get('/api/loadFavoriteTrackList/'+username)
		      .then(function (message) {
						dispatch({
								type : 'FAVORITE_TRACK_LOAD_SUCCESS',
								items : message.data,
								error : null,
						})
		      })
			.catch(function(error) {
				console.error(error);
				dispatch({
					type : 'FAVORITE_TRACK_LOAD_ERROR',
					items : [],
					error : error,
				})
			})
	}
}
export default loadFavoriteTrackList;