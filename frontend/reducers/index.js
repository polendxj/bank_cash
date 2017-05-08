import {combineReducers} from 'redux'
import {syncHistoryWithStore, routerReducer} from 'react-router-redux'
import {commonReducer} from './CommonReducer'
import {reducer as reduxFormReducer} from 'redux-form'

const rootReducer = combineReducers({
    commonReducer,
    form: reduxFormReducer,
    routing: routerReducer
})

export default rootReducer