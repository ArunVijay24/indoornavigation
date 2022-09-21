import { ALLHIGHLIGHTS, HIGHLIGHTSBYID, ALLMALLS } from './actionType';

export const getAllHighlights = (payload) => ({
	type: ALLHIGHLIGHTS,
	payload: payload
});
export const getHighlightsById = (payload) => ({
	type: HIGHLIGHTSBYID,
	payload: payload
});
export const getAllMalls = (payload) => ({
	type: ALLMALLS,
	payload: payload
});
