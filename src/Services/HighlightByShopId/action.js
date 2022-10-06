import { HIGHLIGHTBYSHOPID } from './action-types';
import API_CALL from '..';

export const getShopId = (payload) => {
	return API_CALL({
		method: 'get',
		url: `shopById`,
		type: HIGHLIGHTBYSHOPID,
		params: { id: payload }
	});
};

export const clearShopData = () => {
	return {
		type: HIGHLIGHTBYSHOPID.CLEAR_SHOP_DATA
	};
};
