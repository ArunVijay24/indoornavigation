import { GET_ALL_MALLS_DATA } from './action-types';

let initialState = {
	requesting: false,
	response: {
		allMallsData: []
	},
	statusCode: undefined
};

export const mallDataReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case GET_ALL_MALLS_DATA.REQ:
			return {
				...state,
				requesting: true,
				statusCode: undefined
			};
		case GET_ALL_MALLS_DATA.RES:
			return {
				...state,
				requesting: false,
				response: {
					...state.response,
					allMallsData: payload.data.data
				},
				statusCode: undefined
			};
		case GET_ALL_MALLS_DATA.FAIL:
			return {
				...state,
				statusCode: payload.status
			};
		default:
			return state;
	}
};
