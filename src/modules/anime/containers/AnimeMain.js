import React, { Component, PropTypes } from 'react';
import {
	Button,
	View,
	StyleSheet
} from 'react-native';
import { connect } from 'react-redux';

import AnimeList from '../components/AnimeList';
import { pushHistory } from "../../config/actions";

import { deleteAnime, goToAnimeDetail } from '../actions';

import TopBar from '../../shared/components/TopBar';

class AnimeMain extends Component {
	constructor(props){
		super(props);
	}
	
	componentDidMount() {
		//this.props.searchAnime()
	}

	render() {
		return (
			<View style={{flex: 1, backgroundColor: '#fafafa'}}>
				<TopBar title="Anime Backlog"/>
				<AnimeList
					animes={Object.values(this.props.animes)}
					deleteFunc={this.props.deleteAnime}
					detailFunc={this.props.goToAnimeDetail}
				/>
				<View
					style={{
						alignSelf: 'flex-end',
						position: 'absolute',
						bottom: 0,
						width: '100%'
					}}>
					<Button
						title='Anime Search'
						onPress={this.props.searchAnime}
						color='#0EC8EC'
						style={{flex: 1}}
					/>

				</View>
			</View>
		)
	}

}

const styles = StyleSheet.create({
});

const mapStateToProps = (state) => {
	return {
		animes: state.anime.animes
	}
};

const mapDispatchToProps = (dispatch) => ({
	deleteAnime: (id) => {
		dispatch(deleteAnime(id));
		//handle with saga later
	},
	goToAnimeDetail: (id) => dispatch(goToAnimeDetail(id)),
	searchAnime: () => {
		dispatch(pushHistory('/animesearch'));
	}
});


export default connect(mapStateToProps, mapDispatchToProps)(AnimeMain);
