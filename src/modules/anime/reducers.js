import { ADD, DELETE } from './constants';

const initialState = {
	animes: [
		{
			id: 0,
			title: 'Meguca',
			description: 'make keiyaku become meguca'
		},
		{
			id: 1,
			title: 'Steins;Gate',
			description: 'moe time travelers'
		},
		{
			id: 2,
			title: 'Zero no Tsukaima',
			description: 'tsundere magicians'
		},
		{
			id: 3,
			title: 'Hellsing',
			description: 'vampires fight'
		},
		{
			id: 4,
			title: 'Elfen Lied',
			description: 'gore waifus'
		},
		{
			id: 5,
			title: 'To Aru Majutsu no Index',
			description: 'generic chuunibyou masterpiece'
		},
		{
			id: 6,
			title: 'Re: Zero',
			description: 'isekai waifus'
		}
	]
};
export default (state = initialState, action) => {
	switch (action.type) {
		case ADD:
			return {
				...state,
				animes: [...state.animes, {
					id: state.animes.length, 
					title: action.payload.name, 
					description: action.payload.description}
					]
			};
		case DELETE:
			console.log('deleting ', action.payload.id);
			const newAnimeArray = state.animes.filter(item => {
				return (item.id !== action.payload.id);
			})
			return{
				...state,
				animes: newAnimeArray
			};
		default:
			return state;
	}
}
