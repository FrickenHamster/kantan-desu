import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Provider } from 'react-redux';

import createStore from './src/createStore';
import Main from './src';
import history, { createNew } from "./config/history";
import { ConnectedRouter } from 'connected-react-router'
import { BackButton } from 'react-router-native';
import { PersistGate } from 'redux-persist/integration/react'


const store = createStore();

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.history = history;
		this.state = {
			history: null
		}
		this.beforeLift = this.beforeLift.bind(this);
	}
	
	beforeLift() {
		const hh = store.store.getState().config.history;
		if (hh.entries.length > 0) {
			this.history = createNew({
				initialEntries: store.store.getState().config.history.entries,
				initialIndex: store.store.getState().config.history.index,
			});
			this.setState({history: this.history})
		} else {
			this.setState({history: this.history})
		}
	}

	render() {
		if (!this.state.history) {
			return (
				<Provider
					store={store.store}
				>
					<PersistGate persistor={store.persistor}
								 onBeforeLift={this.beforeLift}
					>
						{
							(<View style={{flex: 1, alignItems: 'center'}}>
								<Text>LOADING</Text>
							</View>)
						}
					</PersistGate>
				</Provider>)
		}

		return (
			<Provider
				store={store.store}
			>
				<PersistGate persistor={store.persistor}
							 onBeforeLift={this.beforeLift}
				>
					{

						(<ConnectedRouter history={this.state.history}>
							<BackButton>
								<View style={{flex: 1}}>
									<Main/>
								</View>
							</BackButton>
						</ConnectedRouter>)
					}
				</PersistGate>
			</Provider>
		);
	}
}

const styles = StyleSheet.create({
	container: {},
});
