import axios from 'axios'

const loadRecommandationsAlbums = (username) => {
	
	return (dispatch) => {
		
		return axios.get('/api/loadRecommandationsAlbums/'+username)
		      .then(function (message) {
						dispatch({
								type : 'RECOMMANDATION_ALBUM_LOAD_SUCCESS',
								items : message.data,
								error : null,
						})
		      })
			.catch(function(error) {
				console.error(error);
				dispatch({
					type : 'RECOMMANDATION_ALBUM_LOAD_ERROR',
					items : [],
					error : error,
				})
			})
	}
}
export default loadRecommandationsAlbums;