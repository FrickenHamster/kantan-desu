import {
	ADD,
	ALPHABETICAL,
	DELETE, 
	RELEASE_DATE,
	SET_DETAIL_ANIME,
	SET_SEARCH_ANIME,
	SET_SEARCH_BUSY,
	SORT_ANIME_LIST
} from './constants';

import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { createMigrate } from 'redux-persist';
import migrations from './migrations';
import moment from 'moment';

const initialState = {

	animes: {},
	searchAnimeList: [],
	listOrder: [],
	detailAnime: null,
	searchBusy: false,
};
const reducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD: {
			const newListOrder = state.listOrder.includes(action.payload.anime.id) ? 
				state.listOrder :
				[
					...state.listOrder,
					action.payload.anime.id,
				];
			return {
				...state,
				animes: {
					...state.animes,
					[action.payload.anime.id]: action.payload.anime
				},
				listOrder: newListOrder
			};
		}
		case DELETE:
			const newAnimes = Object.assign({}, state.animes);
			delete newAnimes[action.payload.id];
			const newListOrder = state.listOrder.slice();
			const pos = newListOrder.indexOf(action.payload.id);
			if (pos !== -1)
				newListOrder.splice(pos, 1);
			return {
				...state,
				animes: newAnimes,
				listOrder: newListOrder,
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
		
		case SORT_ANIME_LIST: {
			let newListOrder;
			switch (action.payload.sortBy) {
				case ALPHABETICAL :
					newListOrder = state.listOrder.slice().sort((a, b) => state.animes[a].title >= state.animes[b].title ? 1 : -1);
					break;
				case RELEASE_DATE:
					newListOrder = state.listOrder.slice().sort((a, b) => moment(state.animes[a].startDate).isBefore(moment(state.animes[b].startDate) ? 1 : -1));
					break;
				default:
					newListOrder = state.listOrder;
					break;
			}
			
			return {
				...state,
				listOrder: newListOrder
			}
		}

		default:
			return state;
	}
};

export default persistReducer({
		key: 'anime',
		version: 0,
		storage: storage,
		blacklist: ['searchAnimeList'],
		migrate: createMigrate(migrations, {debug: false}),
	},
	reducer);
