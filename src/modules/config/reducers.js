import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { SAVE_HISTORY, SHOW_SIDE_MENU } from "./constants";

const initialState = {
	history: {
		entries: [],
		index: 0,
		showSideMenu: false,
	}
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case SAVE_HISTORY:
			return {
				...state,
				history: {
					entries: action.payload.entries,
					index: action.payload.index,
				}
			};
			
		case SHOW_SIDE_MENU:
			return {
				...state,
				showSideMenu: action.payload.show
			};

		default:
			return state;
	}
};

export default persistReducer({
		key: 'config',
		storage: storage,
		blacklist: ['showSideMenu']
	},
	reducer);
