import axios from 'axios'

const addTrackInFavoriteList = (username, track) => {
	
	return (dispatch) => {
		
		return axios.get('/api/addTrackInFavoriteList/'+username+"/"+track)
		      .then(function (message) {
						dispatch({
								type : 'FAVORITE_TRACK_ADD_SUCCESS',
								items : message.data,
								error : null,
						})
		      })
			.catch(function(error) {
				console.error(error);
				dispatch({
					type : 'FAVORITE_TRACK_ADD_ERROR',
					items : [],
					error : error,
				})
			})
	}
}
export default addTrackInFavoriteList;