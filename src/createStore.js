import { createStore, applyMiddleware, combineReducers } from "redux";

import anime from './modules/anime/index';

const initialState = {
	animes: [
		'Meguca',
		'Steins;Gate',
		'Zero no Tsukaima'
	]
};

export default (state = initialState) => {
	const rootReducer = combineReducers({
		anime: anime.reducers
	});

	return createStore(rootReducer);
}
