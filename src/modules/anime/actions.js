import { ADD, DELETE, DETAIL, SET_SEARCH_ANIME } from './constants';

export const addAnime = (name, description) => {
	return {
		type: ADD,
		payload: {
			name: name,
			description: description
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

export const detailAnime = (id) => {
	return {
		type: DETAIL,
		payload: {
			id: id
		}
	}
};

export const searchAnime = (query) => {
	return dispatch => {
		return fetch(`https://api.jikan.moe/search/anime/${query}/1`)
			.then(resp => resp.json())
			.then(json => {
				console.log(json);
				dispatch({
					type: SET_SEARCH_ANIME,
					payload: {animes: json.result}
				});
			})
	}
	
};
