
const migrations = {
	0: state => {
		return {
			...state,
			listOrder: Object.keys(state.animes)
		}
	}
};

export default migrations;
