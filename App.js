import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';


import createStore from './src/createStore';
import Main from './src';

const store = createStore();

export default class App extends React.Component {
	render() {
		return (
			<Provider
				store={store}
			>
				<View>
					<Main/>
					<Text>poop /n sdfsd dsfasdf</Text>
				</View>
			</Provider>
		);
	}
}

const styles = StyleSheet.create({
	container: {
	},
});
