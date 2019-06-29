import axios from 'axios'

const removeTrackInFavoriteList = (username, track) => {
	
	return (dispatch) => {
		
		return axios.get('/api/removeTrackInFavoriteList/'+username+"/"+track)
		      .then(function (message) {
						dispatch({
								type : 'FAVORITE_TRACK_REMOVE_SUCCESS',
								items : track,
								error : null,
						})
		      })
			.catch(function(error) {
				console.error(error);
				dispatch({
					type : 'FAVORITE_TRACK_REMOVE_ERROR',
					items : [],
					error : error,
				})
			})
	}
}
export default removeTrackInFavoriteList;