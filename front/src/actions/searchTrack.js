import axios from 'axios'

const searchTrack = (name) => {
	
	return (dispatch) => {
		
		return axios.get('/api/track/'+name)
		      .then(function (message) {
		    	  dispatch({
		    			type : 'FETCH_TRACK_SUCCESS',
		    			items : message.data,
		    			error : null,
		    		  })
		      })
			.catch(function(error) {
				console.error(error);
				dispatch({
					type : 'FETCH_TRACK_ERROR',
					items : [],
					error : error,
				})
			})
	}
}
export default searchTrack;