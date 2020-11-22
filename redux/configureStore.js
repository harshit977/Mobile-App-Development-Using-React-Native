import {createStore,applyMiddleware,combineReducers} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { favorites } from './favorites';
import { dishes } from './dishes';
import { comments } from './comments';
import { promotions } from './promotions';
import {leaders} from './leaders';
import {persistStore,persistCombineReducers} from 'redux-persist';
import storage from 'redux-persist';

export const ConfigureStore = () => {



    const store = createStore(
        combineReducers({
            dishes,
            comments,
            promotions,
            leaders,
            favorites
        }),
        applyMiddleware(thunk, logger)
    );
    
    

    return store;
}