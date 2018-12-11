import React, { Component } from 'react';
import {
	Button,
	View,
	StyleSheet,
	Text,
	TouchableHighlight
} from 'react-native';
import { connect } from 'react-redux';

import AnimeList from '../components/AnimeList';
import { pushHistory } from "../../config/actions";
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';

import { deleteAnime, goToAnimeDetail, setAnimeFlow, sortAnime } from '../actions';

import TopBar from '../../shared/components/TopBar';
import { ALPHABETICAL, RATING, RELEASE_DATE, WATCHED } from "../constants";

import RNBottomActionSheet from 'react-native-bottom-action-sheet';

class AnimeMain extends Component {
	constructor(props){
		super(props);
		this.handleSortButton = this.handleSortButton.bind(this);
		this.handleWatchButton = this.handleWatchButton.bind(this);
	}
	
	handleSortButton() {
		let SheetView = RNBottomActionSheet.SheetView;
		SheetView.Show({
			title: "Sort By",
			items: [
				{ title: "Alphabetical", value: ALPHABETICAL,  },
				{ title: "Release Date", value: RELEASE_DATE, },
				{ title: "Rating", value: RATING, },
				{ title: "Nevermind", value: 'cancel', },
			],
			theme: "light",
			selection: 3,
			onSelection: (index, value) => {
				if (value === 'cancel')
					return;
				this.props.sortAnime(value);
			}
		});
	}
	
	handleWatchButton() {
		this.props.goToWatchedAnime();
	}

	render() {
		const animeList = this.props.listOrder.map(item => this.props.animes[item]);
		return (
			<View style={{flex: 1, backgroundColor: '#fafafa'}}>
				<TopBar title="Anime Backlog"
						right={
							<View style={{flexDirection: 'row'}}>
								<TouchableHighlight>
									<FontAwesome
										name="sort-amount-desc" color="#fffafa" size={32}
										onPress={this.handleSortButton}
									/>
								</TouchableHighlight>
							</View>}
						menu
				/>
				<View style={{flex: 1, marginBottom: 32}}>
					<AnimeList
						animes={animeList}
						deleteFunc={this.props.deleteAnime}
						detailFunc={this.props.goToAnimeDetail}
					/>
				</View>
				<View
					style={{
						alignSelf: 'flex-end',
						bottom: 0,
						position: 'absolute',
						height: 32,
						width: '100%',
					}}>
				</View>
			</View>
		)
	}

}

const styles = StyleSheet.create({
});

const mapStateToProps = (state) => {
	return {
		animes: state.anime.animes,
		listOrder: state.anime.listOrder,
		watchedList: state.anime.watchedList,
	}
};

const mapDispatchToProps = (dispatch) => ({
	deleteAnime: (id) => {
		dispatch(setAnimeFlow(id, WATCHED));
		//handle with saga later
	},
	goToAnimeDetail: (id) => dispatch(goToAnimeDetail(id)),
	goToWatchedAnime: () => {
		dispatch(pushHistory('/watched'));
	},
	sortAnime: sortBy => dispatch(sortAnime(sortBy)),
});


export default connect(mapStateToProps, mapDispatchToProps)(AnimeMain);
