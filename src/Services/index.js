import axios from 'axios';
// import store from '../Store/store';
///https://findmyway-be-server.azurewebsites.net/FindMyWay/api/admin/add-highlight
// const ROOT_URL = 'https://findmyway-be-server.azurewebsites.net/FindMyWay/api/admin/';
// const ROOT_URL = 'https://192.168.68.187:3000/FindMyWay/api/admin/';
const ROOT_URL = 'http://192.168.68.123:3000/FindMyWay/api/admin/';

function API_CALL({ method, url, data, type, callback, file, onUploadProgress, params }) {
	if (callback) {
		axios({
			method,
			url: ROOT_URL + url,
			data,
			params,

			validateStatus: (status) => {
				if (status === 401) return false;
				else return true; // I'm always returning true, you may want to do it depending on the status received
			},
			responseType: file ? 'arraybuffer' : 'json'
		}).then((data) => {
			return callback(data);
		});
	} else {
		return function(dispatch) {
			dispatch({
				type: type.REQ
			});
			axios({
				method,
				url: ROOT_URL + url,
				data,
				params,
				validateStatus: (status) => {
					if (status === 401) return false;
					else return true; // I'm always returning true, you may want to do it depending on the status received
				}
			})
				.then((response) => {
					if (response.status === 200) {
						dispatch({
							type: type.RES,
							payload: response
						});
					} else {
						dispatch({
							type: type.FAIL,
							payload: response
						});
					}
				})
				.catch((error) => {
					// store.dispatch(triggerLogout()); // Hanlde 401
				});
		};
	}
}

export default API_CALL;
