import { createStore, applyMiddleware, combineReducers } from "redux";

import anime from './modules/anime/index';

import { routerReducer, routerMiddleware } from 'react-router-redux'
import history from '../config/history';


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

	return createStore(rootReducer, applyMiddleware(middleware));
}
