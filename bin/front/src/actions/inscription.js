import axios from 'axios'

const inscription = (login, pass, mail) => {
	
	return (dispatch) => {
		
		return axios.get('/api/inscription/'+login+"/"+pass+"/"+mail)
		      .then(function (message) {
		    	  dispatch({
		    			type : 'INSCRIPTION_SUCCESS',
		    			items : message.data,
		    			error : null,
		    		  })
		      })
			.catch(function(error) {
				console.error(error);
				dispatch({
					type : 'INSCRIPTION_ERROR',
					items : [],
					error : error,
				})
			})
	}
}
export default inscription;