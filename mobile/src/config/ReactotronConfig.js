import Reactotron, { asyncStorage } from 'reactotron-react-native';
import {reactotronRedux} from 'reactotron-redux';
import reactotronSaga from 'reactotron-redux-saga';

if (__DEV__) {
    const  tron = Reactotron
    .configure({host: '10.1.1.26'})
    .useReactNative(asyncStorage())
    .use(reactotronRedux())
    .use(reactotronSaga())
    .connect();

    tron.clear();

    console.tron = tron;

}