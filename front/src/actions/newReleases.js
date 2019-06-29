import axios from 'axios'

const newReleases = (name) => {
	
	return (dispatch) => {
		
		return axios.get('/api/'+name)
		      .then(function (message) {
		    	  dispatch({
		    			type : 'FETCH_ALBUM_SUCCESS',
		    			items : message.data,
		    			error : null,
		    		  })
		      })
			.catch(function(error) {
				console.error(error);
				dispatch({
					type : 'FETCH_ALBUM_ERROR',
					items : [],
					error : error,
				})
			})
	}
}
export default newReleases;