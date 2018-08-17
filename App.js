import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';

import createStore from './src/createStore';
import Main from './src';
import history from "./config/history";
import { ConnectedRouter, push } from 'react-router-redux'
import { BackButton } from 'react-router-native';
import { PersistGate } from 'redux-persist/integration/react'

const store = createStore();

export default class App extends React.Component {
	render() {
		return (
			<Provider
				store={store.store}
			>
				<PersistGate persistor={store.persistor}>
					<ConnectedRouter history={history}>
						<BackButton>
							<View style={{flex: 1}}>
								<Main/>
							</View>
						</BackButton>
					</ConnectedRouter>
				</PersistGate>
			</Provider>
		);
	}
}

const styles = StyleSheet.create({
	container: {},
});
