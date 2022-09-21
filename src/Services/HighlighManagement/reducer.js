import { ALLHIGHLIGHTS, HIGHLIGHTSBYID, ALLMALLS } from './actionType';
const initialState = {
	allHighlights: [],
	highlightById: [],
	allMalls: []
};

const Reducer = (state = initialState, action) => {
	switch (action.type) {
		case ALLHIGHLIGHTS:
			return {
				allHighlights: [ ...state.allHighlights, action.payload ]
			};
		case HIGHLIGHTSBYID:
			return {
				highlightById: [ ...state.highlightById, action.payload ]
			};
		case ALLMALLS:
			return {
				allMalls: [ ...state.allMalls, action.payload ]
			};
		default:
			return state;
	}
};
export default Reducer;
