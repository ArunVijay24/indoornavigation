import { ALLHIGHLIGHTS, HIGHLIGHTSBYID, ALLMALLS } from './actionType';
import API_CALL from '..';

// test/highlights -table url
// export const getAllHighlights = () => {
// 	return API_CALL({
// 		method: 'get',
// 		url: `highlights`,
// 		type: ALLHIGHLIGHTS
// 	})
// }

//highlightsByMall - select dropdown
export const getHighlightsById = (payload) => ({
	type: HIGHLIGHTSBYID,
	payload: payload
});

//  get all malls
export const getAllMalls = (payload) => ({
	type: ALLMALLS,
	payload: payload
});
