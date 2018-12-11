import createHistory from 'history/createMemoryHistory';



let history = createHistory();
history.ii = Math.random();

export function createNew(props) {
	history = createHistory(props);
	history.ii = Math.random();
	return history;
}

export function getHistory() {
	return history;
}

export default history;

