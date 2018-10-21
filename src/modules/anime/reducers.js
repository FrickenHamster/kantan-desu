import {
	ADD,
	ALPHABETICAL, BACKLOG,
	DELETE, RATING,
	RELEASE_DATE,
	SET_DETAIL_ANIME,
	SET_SEARCH_ANIME,
	SET_SEARCH_BUSY,
	SORT_ANIME_LIST, SET_FLOW, WATCHED, SEARCH, DELETE_STANDBY
} from './constants';

import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { createMigrate } from 'redux-persist';
import migrations from './migrations';
import moment from 'moment';

const initialState = {

	animes: {},
	searchAnimeList: [],
	listOrder: [],
	watchedList: [],
	detailAnime: null,
	searchBusy: false,
};
const reducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD: {
			const newListOrder = [
					...state.listOrder,
					action.payload.anime.id,
				];
			return {
				...state,
				animes: {
					...state.animes,
					[action.payload.anime.id]: {...action.payload.anime, flowState: BACKLOG}
				},
				listOrder: newListOrder
			};
		}
		
		case SET_FLOW: {
			
			const newState = {...state};
			const anime = state.animes[action.payload.id];
			if (anime.flowState === action.payload.toState) {
				return state;
			}
			
			switch (anime.flowState) {
				case BACKLOG: {
					const newListOrder = [...state.listOrder];
					const pos = newListOrder.indexOf(action.payload.id);
					if (pos !== -1)
						newListOrder.splice(pos, 1);
					newState.listOrder = newListOrder;
					break;
				}
					
				case WATCHED: {
					const newWatchedList = [...state.watchedList];
					const pos = newWatchedList.indexOf(action.payload.id);
					if (pos !== -1)
						newWatchedList.splice(pos, 1);
					newState.watchedList = newWatchedList;
					break;
				}
			}
			
			const newAnimes = {
				...state.animes,
				[anime.id] : {
					...anime,
					flowState: action.payload.toState
				}
			};
			
			switch (action.payload.toState) {
				case BACKLOG: {
					newState.listOrder = [...state.listOrder, action.payload.id];
					break;
				}

				case WATCHED: {
					newState.watchedList = [...state.watchedList, action.payload.id];
					break;
				}
			}
			newState.animes = newAnimes;
			return newState;
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
			const newAnimes = {...state.animes};
			for (const key in newAnimes) {
				if (newAnimes[key].flowState === SEARCH || newAnimes[key].flowState === DELETE_STANDBY)
					delete newAnimes[key];
			}
			for (const anime of action.payload.animes) {
				if (!newAnimes[anime.id])
					newAnimes[anime.id] = anime;
			}
			const searchAnimeList = action.payload.animes.map(item => item.id);
			return {
				...state,
				animes: newAnimes,
				searchAnimeList
			}
		}

		case SET_DETAIL_ANIME: {
			return {
				...state,
				animes: {
					...state.animes,
					[action.payload.anime.id]: action.payload.anime,
				},
				//detailAnime: action.payload.anime,
			}
		}
		
		case SORT_ANIME_LIST: {
			let newListOrder;
			switch (action.payload.sortBy) {
				case ALPHABETICAL :
					newListOrder = state.listOrder.slice().sort((a, b) => state.animes[a].title >= state.animes[b].title ? 1 : -1);
					break;
				case RELEASE_DATE:
					newListOrder = state.listOrder.slice().sort((a, b) => (moment(state.animes[a].startDate).isBefore(moment(state.animes[b].startDate))) ? 1 : -1);
					break;
				case RATING:
					newListOrder = state.listOrder.slice().sort((a, b) => state.animes[a].averageRating < state.animes[b].averageRating ? 1 : -1);
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
		version: 1,
		storage: storage,
		blacklist: ['searchAnimeList'],
		migrate: createMigrate(migrations, {debug: false}),
	},
	reducer);
