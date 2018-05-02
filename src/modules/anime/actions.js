import { ADD } from './constants';

export const addAnime = (name) => {
	return {
		type: ADD,
		payload: {
			name: name
		}
	}
};

