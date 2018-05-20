import { ADD, DELETE } from './constants';

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
