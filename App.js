import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
import Expo from 'expo';

import createStore from './src/createStore';
import Main from './src';
import history from "./config/history";
import { ConnectedRouter, push } from 'react-router-redux'


const store = createStore();

export default class App extends React.Component {
	render() {
		return (
			<Provider
				store={store}
			>
				<ConnectedRouter history={history}>
					<View style={{flex: 1, marginTop: Expo.Constants.statusBarHeight}}>
						<Main/>

					</View>
				</ConnectedRouter>
			</Provider>
		);
	}
}

const styles = StyleSheet.create({
	container: {},
});
