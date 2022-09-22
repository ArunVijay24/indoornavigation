import API_CALL from '..';
import { GET_HIGHLIGHT_TABLE_DATA } from './action-types';

export const getHighlightTableData = () => {
    return API_CALL({
        method: 'get',
        url: `highlights`,
        type: GET_HIGHLIGHT_TABLE_DATA
    })
}

export const getAllMallsData = (payload) => {
    return {
        type: GET_HIGHLIGHT_TABLE_DATA.MALL_DATA,
        payload
  }
}