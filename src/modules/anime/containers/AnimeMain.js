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
import ActionSheet from 'react-native-actionsheet';

import { deleteAnime, goToAnimeDetail, sortAnime } from '../actions';

import TopBar from '../../shared/components/TopBar';
import { ALPHABETICAL, RELEASE_DATE } from "../constants";

const sortOptions = [
	{key: RELEASE_DATE, name: 'Release Date'},
	{key: ALPHABETICAL, name: 'Alphabetical'},
];

class AnimeMain extends Component {
	constructor(props){
		super(props);
		this.handleSortButton = this.handleSortButton.bind(this);
	}
	
	handleSortButton(index) {
		if (index < sortOptions.length)
			this.props.sortAnime(sortOptions[index].key)
	}

	render() {
		const animeList = this.props.listOrder.map(item => this.props.animes[item]);
		const options = sortOptions.map(item => item.name);
		options.push('Nevermind');
		return (
			<View style={{flex: 1, backgroundColor: '#fafafa'}}>
				<TopBar title="Anime Backlog"
						right={
							<TouchableHighlight>
								<FontAwesome 
									name="sort-amount-desc" color="#fffafa" size={32} 
									onPress={() => this.ActionSheet.show()}
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
				<ActionSheet
					ref={o => this.ActionSheet = o}
					title={<Text style={{color: '#000', fontSize: 18}}>Sort by</Text>}
					options={options}
					cancelButtonIndex={sortOptions.length}
					onPress={this.handleSortButton}
				/>
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
