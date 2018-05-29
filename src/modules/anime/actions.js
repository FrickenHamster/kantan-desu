import { ADD, DELETE, DETAIL } from './constants';

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
