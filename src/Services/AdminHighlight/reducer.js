import { GET_HIGHLIGHT_TABLE_DATA } from './action-types';

let initialState = {
	requesting: false,
	response: {
		highlightTableData: []
	},
	statusCode: undefined
};

export const highlightReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case GET_HIGHLIGHT_TABLE_DATA.REQ:
			return {
				...state,
				requesting: true,
				statusCode: undefined
			};
		case GET_HIGHLIGHT_TABLE_DATA.RES:
			return {
				...state,
				requesting: false,
				response: {
					...state.response,
					highlightTableData: payload.data.data
				},
				statusCode: undefined
			};
		case GET_HIGHLIGHT_TABLE_DATA.FAIL:
			return {
				...state,
				requesting: false,
				statusCode: payload.status
			};
		default:
			return state;
	}
};
