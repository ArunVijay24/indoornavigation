import { HIGHLIGHTBYMALL } from './action-types';

let initialState = {
    requesting: false,
    response: {
        mallData: []
    },
    statusCode: undefined
}

export const highlightMallDataReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case HIGHLIGHTBYMALL.REQ:
            return {
                ...state,
                requesting: true,
                statusCode: undefined
            }
        case HIGHLIGHTBYMALL.RES: 
            return {
                ...state,
                requesting: false,
                response: {
                    ...state.response,
                    mallData: payload.data.data
                },
                statusCode: undefined
            }
        case HIGHLIGHTBYMALL.FAIL:
            return {
                ...state,
                statusCode: payload.status
            }
        case HIGHLIGHTBYMALL.CLEAR_MALL_DATASOURCE:
            return {
                ...state,
                response: {
                    ...state.response,
                    mallData: []
                }
            }
        default:
            return state;
    }
}