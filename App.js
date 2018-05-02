import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
import Expo from 'expo';

import createStore from './src/createStore';
import Main from './src';

const store = createStore();

export default class App extends React.Component {
	render() {
		return (
			<Provider
				store={store}
			>
				<View style={{flex:1, marginTop: Expo.Constants.statusBarHeight}}>
					<Main/>
					
				</View>
			</Provider>
		);
	}
}

const styles = StyleSheet.create({
	container: {
	},
});
