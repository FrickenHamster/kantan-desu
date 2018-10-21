import React, { Component } from 'react';
import { View } from 'react-native';
import { Route, Switch } from 'react-router-native';

import AnimeMain from './modules/anime/containers/AnimeMain';
import AnimeWatched from './modules/anime/containers/AnimeWatched';
import AnimeDetail from './modules/anime/containers/AnimeDetail';
import AnimeSearch from './modules/anime/containers/AnimeSearch';

export default class Main extends Component {
	render() {
		return (
			<View style={{flex: 1}}>
					<Route exact path='/' component={AnimeMain}/>
					<Route exact path='/watched' component={AnimeWatched}/>
					<Route exact path='/animedetail/:id' component={AnimeDetail}/>
					<Route exact path='/animesearch' component={AnimeSearch}/>
			</View>
		)
	}
}
