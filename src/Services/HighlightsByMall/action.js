import { HIGHLIGHTBYMALL } from './action-types';
import API_CALL from '..';

export const getByMallData = (payload) => {
    return API_CALL({
        method: 'get',
        url: `highlightsByMall`,
        params: { id: payload },
        type: HIGHLIGHTBYMALL
    })
}

export const clearMallDataSource = () => {
    return {
        type: HIGHLIGHTBYMALL.CLEAR_MALL_DATASOURCE
    }
}