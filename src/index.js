import React, { Component } from 'react';
import { View } from 'react-native';
import { NativeRouter, Route } from 'react-router-native';


import AnimeMain from './modules/anime/containers/AnimeMain';



export default class Main extends Component {
	render() {
		return (
			<View style={{flex: 1}}>
				<NativeRouter >
					<Route exact path='/' component={AnimeMain}/>
				</NativeRouter>
			</View>
		)
	}
}
