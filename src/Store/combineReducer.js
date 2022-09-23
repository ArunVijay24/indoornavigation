import { combineReducers } from 'redux';

import { highlightReducer } from '../Services/AdminHighlight/reducer';
import { shopReducer } from '../Services/HighlightByShopId/reducer';
import { mallDataReducer } from '../Services/AllMallsData/reducer';

export default combineReducers({ highlightReducer, shopReducer, mallDataReducer });