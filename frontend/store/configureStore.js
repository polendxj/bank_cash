import {createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import { Router, Route, browserHistory } from 'react-router'
import { routerMiddleware, push } from 'react-router-redux'
import rootReducer from '../reducers/index'

const createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware,
    routerMiddleware(browserHistory)
)(createStore)

export default function configureStore(initialState) {
    const store = createStoreWithMiddleware(rootReducer, initialState)

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers')
            store.replaceReducer(nextRootReducer)
        })
    }

    return store
}
