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
		return fetch(`https://kitsu.io/api/edge/anime?filter[text]=${query}`)
			.then(resp => resp.json())
			.then(json => {

				const data = json.data.map(item => 
					
					({
					title: item.attributes.titles.en_jp,
					description: item.attributes.synopsis,
					img: item.attributes.posterImage.tiny
				}))
				dispatch({
					type: SET_SEARCH_ANIME,
					payload: {animes: data}
				});
			})
	}
	
};
