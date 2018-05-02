import { ADD } from './constants';

export const addAnime = (name, description) => {
	return {
		type: ADD,
		payload: {
			name: name,
			description: description
		}
	}
};

