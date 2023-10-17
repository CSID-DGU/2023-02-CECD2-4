import { combineReducers } from 'redux';
import toggleAdminHeader from './modules/toggleAdminHeader';
import toggleAddManage from './modules/toggleAddManage';

const rootReducer = combineReducers({toggleAdminHeader, toggleAddManage});

export default rootReducer;