import axios from 'axios'

const searchArtist = (name) => {
	
	return (dispatch) => {
		
		return axios.get('/api/artist/'+name)
		      .then(function (message) {
		    	  dispatch({
		    			type : 'FETCH_ARTIST_SUCCESS',
		    			items : message.data,
		    			error : null,
		    		  })
		      })
			.catch(function(error) {
				console.error(error);
				dispatch({
					type : 'FETCH_ARTIST_ERROR',
					items : [],
					error : error,
				})
			})
	}
}
export default searchArtist;