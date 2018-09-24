import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import { composeWithDevTools } from 'redux-devtools-extension'
// import Reactotron from 'ReactotronConfig'
import users from 'redux/modules/users';

const env = process.env.NODE_ENV;

const history = createHistory();

// it need to conecting routerRuducer and history objcect 
const middlewares = [thunk, routerMiddleware(history)];

if(env === 'development') {
    const { logger } =  require('redux-logger');
    middlewares.push(logger);
}

const reducer =  combineReducers({
    users,
    router: routerReducer
});

let store;
if(env === 'development') {
    
    // store = initialState => Reactotron.createStore(
    store = initialState => createStore(
        reducer,
        composeWithDevTools(applyMiddleware(...middlewares)));
        
} else {
    store = initialState => createStore(reducer, applyMiddleware(...middlewares));
}


//it need to making router.
export { history };

export default store();