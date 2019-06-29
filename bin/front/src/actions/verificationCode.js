import axios from 'axios'

const verificationCode = (username,code) => {
	
	return (dispatch) => {
		
		return axios.get('/api/verificationCode/'+username+"/"+code)
		      .then(function (message) {
					dispatch({
						type : 'VERIFICATION_CODE_SUCCESS',
						items : message.data,
						error : null,
						})
		      })
			.catch(function(error) {
				console.error(error);
				dispatch({
					type : 'VERIFICATION_CODE_ERROR',
					items : [],
					error : error,
				})
			})
	}
}
export default verificationCode;