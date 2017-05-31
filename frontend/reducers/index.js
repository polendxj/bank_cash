import {combineReducers} from 'redux';
import {syncHistoryWithStore, routerReducer} from 'react-router-redux';
import {reducer as reduxFormReducer} from 'redux-form';
import {commonReducer} from './CommonReducer';
import {
    userManagerListReducer,
    userListByManagerReducer,
    userDetailReducer,
    userCountOfManagerReducer,
    sendEmailReducer
} from '../reducers/UsersReducer';
import {getBindCardUsers,getOperations,getTaskUsers,getTaskHistory,getNewTenTask} from '../reducers/StatisticReducer'

const rootReducer = combineReducers({
    commonReducer,
    userManagerListReducer, userListByManagerReducer, userDetailReducer, userCountOfManagerReducer,sendEmailReducer,
    getBindCardUsers,getOperations,getTaskUsers,getTaskHistory,getNewTenTask,
    form: reduxFormReducer,
    routing: routerReducer
});

export default rootReducer