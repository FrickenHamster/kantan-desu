import React, { Component } from 'react';
import { View, Text } from 'react-native';
import AnimeMain from './modules/anime/containers/AnimeMain';

console.log(AnimeMain);
export default class Main extends Component {
	render() {
		return (
			<View>
				<AnimeMain />
				<Text>
					sdfesd
				</Text>
			</View>
		)
	}
}
