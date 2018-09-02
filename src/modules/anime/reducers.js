import { ADD, DELETE, SET_DETAIL_ANIME, SET_SEARCH_ANIME, SET_SEARCH_BUSY } from './constants';

import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const initialState = {
	animes: {},	
	searchAnimeList: [],
	detailAnime: null,
	searchBusy: false,
};
const reducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD:
			return {
				...state,
				animes: {
					...state.animes, 
					[action.payload.anime.id]: action.payload.anime
				}
			};
		case DELETE:
			const newAnimes = Object.assign({}, state.animes);
			delete newAnimes[action.payload.id];
			return {
				...state,
				animes: newAnimes
			};
			
		case SET_SEARCH_BUSY :
			return {
				...state,
				searchBusy: action.payload.busy,
			};
			
		case SET_SEARCH_ANIME: {
			return {
				...state,
				searchAnimeList: action.payload.animes
			}
		}
		
		case SET_DETAIL_ANIME: {
			return {
				...state,
				detailAnime: action.payload.anime,
			}
		}
			
		default:
			return state;
	}
};

export default persistReducer({
		key: 'anime',
		storage: storage,
		blacklist: ['searchAnimeList']
	},
	reducer);
