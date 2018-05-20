import React, { Component, PropTypes } from 'react';
import {
	Button,
	View,
	Text
} from 'react-native';
import { connect } from 'react-redux';

import AnimeList from '../components/AnimeList';
import { push } from 'react-router-redux';

import { deleteAnime } from '../actions';

class AnimeMain extends Component {
	constructor(props){
		super(props);
	}

	render() {
		console.log(this.props.animes);
		return (
			<View style={{flex: 1}}>
				<Text style={{textAlign: 'center', fontSize: 20}}>Anime Backlog</Text>
				<AnimeList
					animes={this.props.animes}
					deleteFunc={this.props.deleteAnime}
				/>
				<View
					style={{
						alignSelf: 'flex-end',
						position: 'absolute',
						bottom: 0,
						width: '100%'
					}}>
					<Button
						title='Add Anime'
						onPress={this.props.gotoAddAnime}
						style= {{
						flex: 1
					}}
					/>
				</View>
			</View>
		)
	}

}

const mapStateToProps = (state) => {
	return {
		animes: state.anime.animes
	}
};

const mapDispatchToProps = (dispatch) => ({
	gotoAddAnime: () => {
		dispatch(push('/addanime'));
	},
	deleteAnime: (id) => {
		dispatch(deleteAnime(id));
		//handle with saga later
		dispatch(push('/'));
	}
});


export default connect(mapStateToProps, mapDispatchToProps)(AnimeMain);
