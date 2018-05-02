import React, { Component } from 'react';
import { View } from 'react-native';
import { Route, Switch } from 'react-router-native';

import AnimeMain from './modules/anime/containers/AnimeMain';
import AddAnimePage from './modules/anime/containers/AddAnimePage';

export default class Main extends Component {
	render() {
		return (
			<View style={{flex: 1}}>
					<Route exact path='/' component={AnimeMain}/>
					<Route exact path='/addanime' component={AddAnimePage}/>
			</View>
		)
	}
}
