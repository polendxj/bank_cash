/**
 * Created by Administrator on 2016/8/3.
 */
import 'babel-core/polyfill'
import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {Router, Route, browserHistory, IndexRoute, Redirect} from 'react-router'
import {syncHistoryWithStore, routerReducer} from 'react-router-redux'
import App from './containers/App'
import HomeContainer from './containers/HomeContainer'
import MembershipContainer from './containers/MembershipContainer'
import NeedDownloadFlowContainer from './containers/NeedDownloadFlowContainer'
import NeedCodeSelectContainer from './containers/NeedCodeSelectContainer'
import NeedRenewFeeContainer from './containers/NeedRenewFeeContainer'
import configureStore from './store/configureStore'

let store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)

render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App}>
                <IndexRoute component={HomeContainer}/>
                <Route path="/home" component={HomeContainer}/>
                <Route path="/membership" component={MembershipContainer}/>
                <Route path="/flowWarning" component={NeedDownloadFlowContainer}/>
                <Route path="/codeSelect" component={NeedCodeSelectContainer}/>
                <Route path="/renewFee" component={NeedRenewFeeContainer}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('wrap')
)



