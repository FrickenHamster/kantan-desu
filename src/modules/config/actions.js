import { getHistory } from '../../../config/history';
import { SAVE_HISTORY } from "./constants";

export const pushHistory = (path) => {
	return dispatch => {
		const history = getHistory();
		history.push(path);
		dispatch({
			type: SAVE_HISTORY,
			payload: {
				entries: history.entries,
				index: history.index
			}
		})
	}
};

export const popHistory = () => {
	return dispatch => {
		const history = getHistory();
		history.goBack();
		dispatch({
			type: SAVE_HISTORY,
			payload: {
				entries: history.entries,
				index: history.index
			}
		})
	}
}
;

