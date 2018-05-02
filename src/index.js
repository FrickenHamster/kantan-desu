import React, { Component } from 'react';
import { View } from 'react-native';
import AnimeMain from './modules/anime/containers/AnimeMain';

export default class Main extends Component {
	render() {
		return (
			<View style={{flex: 1}}>
				<AnimeMain />
			</View>
		)
	}
}
