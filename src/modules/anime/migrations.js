
const migrations = {
	0: state => {
		return {
			...state,
			listOrder: Object.keys(state.animes)
		}
	},
	1: state => {
		return {
			...state,
			watchedList: [],
		}
	}
};

export default migrations;
