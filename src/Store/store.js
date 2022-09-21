import { createStore } from 'redux';
import Reducer from '../Services/HighlighManagement/reducer';
const store = createStore(Reducer);
export default store;
