import { combineReducers } from 'redux';

import { highlightReducer } from '../Services/AdminHighlight/reducer';
import { shopReducer } from '../Services/HighlightByShopId/reducer';
import { mallDataReducer } from '../Services/AllMallsData/reducer';
import { highlightMallDataReducer } from '../Services/HighlightsByMall/reducer';

export default combineReducers({ highlightReducer, shopReducer, mallDataReducer, highlightMallDataReducer });