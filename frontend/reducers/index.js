import {combineReducers} from 'redux';
import {syncHistoryWithStore, routerReducer} from 'react-router-redux';
import {reducer as reduxFormReducer} from 'redux-form';
import {commonReducer} from './CommonReducer';
import {userManagerListReducer, userListByManagerReducer, userDetailReducer} from '../reducers/UsersReducer';

const rootReducer = combineReducers({
    commonReducer,
    userManagerListReducer, userListByManagerReducer, userDetailReducer,
    form: reduxFormReducer,
    routing: routerReducer
});

export default rootReducer