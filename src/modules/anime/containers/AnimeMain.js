import React, { Component, PropTypes } from 'react';
import {
	View
} from 'react-native';
import { connect } from 'react-redux';

import AnimeList from '../components/AnimeList';

class AnimeMain extends Component {

	render() {
		return (
			<View>
				<AnimeList
					animes={this.props.animes}
				/>
			</View>
		)
	}

}

const mapStateToProps = (state) => {
	console.log(state);
	return {
		animes: state.anime.animes.slice(0)//Object.keys(state.animes).map((key, index) => state.animes[key])
	}
};


const mapDispatchToProps = (dispatch, ownProps) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(AnimeMain);
