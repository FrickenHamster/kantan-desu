import { ADD, DELETE, SET_SEARCH_ANIME } from './constants';

const initialState = {
	//animes: {0:{id: 0, title: 'poop', description: 'pooppop', img: 'https://img.buzzfeed.com/thumbnailer-prod-us-east-1/video-api/assets/117944.jpg' }},
	animes: {},	
	searchAnimeList: []
};
export default (state = initialState, action) => {
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
			
		case SET_SEARCH_ANIME: {
			return {
				...state,
				searchAnimeList: action.payload.animes
			}
		}
			
		default:
			return state;
	}
}
