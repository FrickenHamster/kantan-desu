import { createStore, applyMiddleware, combineReducers } from "redux";
import { persistStore, persistReducer } from 'redux-persist';

import anime from './modules/anime/index';
import config from './modules/config/index';

import { connectRouter, routerMiddleware } from 'connected-react-router';
import history from '../config/history';

import thunk from 'redux-thunk';

const middleware = routerMiddleware(history);
import { composeWithDevTools } from 'redux-devtools-extension';


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
		config: config.reducers,
	});
	
	const store = createStore(
		connectRouter(history)(rootReducer),
		composeWithDevTools(
			applyMiddleware(
				middleware,
				thunk
			)
		)
	);

	const persistor = persistStore(store);
	return { store, persistor }
}
