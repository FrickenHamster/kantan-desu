import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { SAVE_HISTORY } from "./constants";

const initialState = {
	history: {
		entries: [],
		index: 0,
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

		default:
			return state;
	}
};

export default persistReducer({
		key: 'config',
		storage: storage,
	},
	reducer);
