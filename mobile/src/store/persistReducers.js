
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default reducers => {
    const persistedReducer = persistReducer(
        {
            key: 'root',
            storage: AsyncStorage,
            //whitelist: ['auth', 'user'],
        },
        reducers
    );
    return persistedReducer;
};