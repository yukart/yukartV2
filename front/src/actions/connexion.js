import axios from 'axios'

const connexion = (login, pass) => {
	
	return (dispatch) => {
		
		return axios.get('/api/connexion/'+login+"/"+pass)
		      .then(function (message) {
				  if(message.data) {
					dispatch({
		    			type : 'CONNEXION_SUCCESS',
		    			items : login,
		    			error : null,
		    		  })
				  }
				  else {
					dispatch({
		    			type : 'CONNEXION_ERROR',
		    			items : [],
		    			error : null,
		    		  })
				  }
		    	 
		      })
			.catch(function(error) {
				console.error(error);
				dispatch({
					type : 'CONNEXION_ERROR',
					items : [],
					error : error,
				})
			})
	}
}
export default connexion;