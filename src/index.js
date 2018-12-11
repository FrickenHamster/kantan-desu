import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Route, Switch, withRouter } from 'react-router-native';

import AnimeMain from './modules/anime/containers/AnimeMain';
import AnimeWatched from './modules/anime/containers/AnimeWatched';
import AnimeDetail from './modules/anime/containers/AnimeDetail';
import AnimeSearch from './modules/anime/containers/AnimeSearch';

import SideMenu from 'react-native-side-menu';
import SideMenuContent from './modules/shared/components/SideMenuContent';
import { connect } from "react-redux";
import { setShowSideMenu } from "./modules/config/actions";


class Main extends Component {
	
	constructor(props) {
		super(props)
		this.handleChange = this.handleChange.bind(this);
	}
	
	handleChange(open) {
		if (open !== this.props.showSideMenu)
			this.props.setShowSideMenu(open);
	}
	
	render() {
		return (
			<SideMenu 
				menu={<SideMenuContent/>}
				isOpen={this.props.showSideMenu}
				disableGestures={true}
				onChange={this.handleChange}
			>
				<View style={{flex: 1}}>
						<Route exact path='/' component={AnimeMain}/>
						<Route exact path='/watched' component={AnimeWatched}/>
						<Route exact path='/animedetail/:id' component={AnimeDetail}/>
						<Route exact path='/animesearch' component={AnimeSearch}/>
				</View>
			</SideMenu>
			
		)
	}
}

const mapStateToProps = (state) => {
	return {
		showSideMenu: state.config.showSideMenu,
	}
};

const mapDispatchToProps = dispatch => ({
	setShowSideMenu: (show) => {
		dispatch(setShowSideMenu(show));
	},
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
