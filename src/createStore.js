import { createStore, applyMiddleware, combineReducers } from "redux";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import anime from './modules/anime/index';

import { routerReducer, routerMiddleware } from 'react-router-redux'
import history from '../config/history';

import thunk from 'redux-thunk';

const middleware = routerMiddleware(history);

const initialState = {
	animes: [
		'Meguca',
		'Steins;Gate',
		'Zero no Tsukaima'
	]
};

export default (state = initialState) => {
	const rootReducer = combineReducers({
		anime: anime.reducers,
		router: routerReducer
	});

	const store = createStore(rootReducer,
		applyMiddleware(
			middleware,
			thunk
		));

	const persistor = persistStore(store);
	return { store, persistor }
}
