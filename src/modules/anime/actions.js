import { ADD, DELETE, DETAIL, SET_DETAIL_ANIME, SET_SEARCH_ANIME, SET_SEARCH_BUSY, SORT_ANIME_LIST } from './constants';
import { pushHistory } from "../config/actions";

export const addAnime = (theChosenOne) => {
	return {
		type: ADD,
		payload: {
			anime: theChosenOne
		}
	}
};

export const deleteAnime = (id) => {
	return {
		type: DELETE,
		payload: {
			id: id
		}
	}
};

export const goToAnimeDetail = id => {
	return (dispatch, getState) => {
		let anime;
		const state = getState();
		anime = state.anime.animes[id];
		if (!anime) {
			for (let i = 0; i < state.anime.searchAnimeList.length; i++) {
				let curr = state.anime.searchAnimeList[i];
				if (curr.id.toString() === id) {
					anime = curr;
					break;
				}
			}
		}
		
		dispatch({
			type: SET_DETAIL_ANIME,
			payload: {
				anime: anime,
			}
		});

		dispatch(pushHistory(`/animedetail/${id}`));
		return fetch(`https://kitsu.io/api/edge/anime/${id}`)
			.then(resp => resp.json())
			.then(json => {
				const data = json.data;
				dispatch({
					type: SET_DETAIL_ANIME,
					payload: {
						anime: {
							id: data.id,
							title: data.attributes.titles.en_jp,
							description: data.attributes.synopsis,
							img: data.attributes.posterImage.tiny,
							largeImg: data.attributes.posterImage.large,
							medium: data.attributes.subtype,
							episodeCount: data.attributes.episodeCount,
							startDate: data.attributes.startDate,
							endDate: data.attributes.endDate,
							averageRating: data.attributes.averageRating,
							ageRating: data.attributes.ageRatingGuide,
						},
					}
				});
			});
	}
};

export const fetchAnimeDetails = id => {
	return dispatch => {
		return fetch(`https://kitsu.io/api/edge/anime/${id}`)
			.then(resp => resp.json())
			.then(json => {
				
			})

	}
};

export const searchAnime = (query) => {
	return dispatch => {
		
		dispatch({
			type: SET_SEARCH_BUSY,
			payload: {
				busy: true
			}
		});
		
		return fetch(`https://kitsu.io/api/edge/anime?filter[text]=${query}`)
			.then(resp => resp.json())
			.then(json => {
				const data = json.data.map(item => ({
					id: item.id,
					title: item.attributes.titles.en_jp,
					startDate: item.attributes.startDate,
					description: item.attributes.synopsis,
					img: item.attributes.posterImage.tiny,
					medium: item.attributes.subtype
				}));
				dispatch({
					type: SET_SEARCH_ANIME,
					payload: {animes: data}
				});
				dispatch({
					type: SET_SEARCH_BUSY,
					payload: {
						busy: false
					}
				});
			})
	}
	
};

export const sortAnime = sortBy => {
	return {
		type: SORT_ANIME_LIST,
		payload: {
			sortBy
		},
	}
};
