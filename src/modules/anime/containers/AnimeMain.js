import React, { Component, PropTypes } from 'react';
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

import { deleteAnime, goToAnimeDetail, sortAnime } from '../actions';

import TopBar from '../../shared/components/TopBar';
import { ALPHABETICAL, RATING, RELEASE_DATE } from "../constants";

import RNBottomActionSheet from 'react-native-bottom-action-sheet';

class AnimeMain extends Component {
	constructor(props){
		super(props);
		this.handleSortButton = this.handleSortButton.bind(this);
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
			dividerItem: (<Text>poop</Text>),
			onSelection: (index, value) => {
				if (value === 'cancel')
					return;
				this.props.sortAnime(value);
			}
		});
	}

	render() {
		const animeList = this.props.listOrder.map(item => this.props.animes[item]);
		return (
			<View style={{flex: 1, backgroundColor: '#fafafa'}}>
				<TopBar title="Anime Backlog"
						right={
							<TouchableHighlight>
								<FontAwesome 
									name="sort-amount-desc" color="#fffafa" size={32} 
									onPress={this.handleSortButton}
								/>
							</TouchableHighlight>}
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
		animes: state.anime.animes,
		listOrder: state.anime.listOrder,
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
	},
	sortAnime: sortBy => dispatch(sortAnime(sortBy)),
});


export default connect(mapStateToProps, mapDispatchToProps)(AnimeMain);
