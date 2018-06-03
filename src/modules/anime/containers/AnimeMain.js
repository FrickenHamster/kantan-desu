import React, { Component, PropTypes } from 'react';
import {
	Button,
	View,
	Text,
	StyleSheet
} from 'react-native';
import { connect } from 'react-redux';

import AnimeList from '../components/AnimeList';
import { push } from 'react-router-redux';

import { deleteAnime } from '../actions';

import TopBar from '../components/TopBar';

class AnimeMain extends Component {
	constructor(props){
		super(props);
	}

	render() {
		return (
			<View style={{flex: 1, backgroundColor: '#fafafa'}}>
				<TopBar title="Anime Backlog"/>
				<AnimeList
					animes={this.props.animes}
					deleteFunc={this.props.deleteAnime}
					detailFunc={this.props.detailAnime}
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
						color='#938ec7'
						style= {{
						flex: 1
					}}
					/>
				</View>
			</View>
		)
	}

}

const styles = StyleSheet.create({
	descrip: {
		color: '#9d8189'
	}
});

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
	},
 	detailAnime: (id) => {
		dispatch(push(`/animedetail/${id}`)); 
	}
});


export default connect(mapStateToProps, mapDispatchToProps)(AnimeMain);
