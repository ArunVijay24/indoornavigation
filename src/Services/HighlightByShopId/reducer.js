import { HIGHLIGHTBYSHOPID } from './action-types';

const initialState = {
	requesting: false,
	response: {
	    shopDatas: [],
	},
	statusCode: undefined
};

export const shopReducer = (state = initialState, { type, payload }) => {
	switch (type) {	
		case HIGHLIGHTBYSHOPID.REQ:
			return {
				...state,
				requesting: true,
				statusCode: undefined
			}
		case HIGHLIGHTBYSHOPID.RES:
			return {
				...state,
				requesting: false,
				response: {
					...state.response,
					shopDatas: payload.data.data
				},
				statusCode: undefined
			}
		case HIGHLIGHTBYSHOPID.FAIL:
			return {
				...state,
				statusCode: payload.status
			}
		case HIGHLIGHTBYSHOPID.CLEAR_SHOP_DATA:
			return {
				...state,
				response: {
					...state.response,
					shopDatas: []
				}
			}
		default:
			return state;
	}
};
