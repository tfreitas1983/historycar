import { legacy_createStore as createStore, compose, applyMiddleware } from 'redux';


export default (reducers, middlewares) => {
    const enhancer = applyMiddleware(...middlewares);
    return createStore(reducers, enhancer);
};