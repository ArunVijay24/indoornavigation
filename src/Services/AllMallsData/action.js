import { GET_ALL_MALLS_DATA } from './action-types';
import API_CALL from '..';

export const getAllMallsData = () => {
    return API_CALL({
        method: 'get',
        url: `malls`,
        type: GET_ALL_MALLS_DATA
    })
}