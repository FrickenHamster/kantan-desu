import React, { Component } from 'react';
import { 
	FlatList, 
	Image,
	StyleSheet,
	Text,
	TouchableOpacity, 
	View 
} from "react-native";

import { deleteAnime, goToAnimeDetail, setAnimeFlow } from "../actions";
import { connect } from "react-redux";
import RNBottomActionSheet from "react-native-bottom-action-sheet";

import TopBar from '../../shared/components/TopBar';
import Card from '../../shared/components/Card';
import { BACKLOG, DELETE_STANDBY } from "../constants";

const WatchedItem = ({anime, onPress}) => {
	return (
		<Card>
			<TouchableOpacity
				onPress={() => {
					onPress(anime);
				}}
			>
				<View style={styles.itemContainer}>
					<View style={styles.pic}>
						<Image source={{uri: anime.img}}
							   style={{height: 60, width: 60, justifyContent: 'center'}}/>
					</View>
					<Text numberOfLines={2}
						  style={[styles.itemTitle, anime.title.length > 18 && styles.itemTitleLong]}>
						{anime.title}
					</Text>
				</View>
			</TouchableOpacity>
		</Card>
	)
};


class AnimeWatched extends Component {
	
	constructor(props) {
		super(props);
		this.renderItem = this.renderItem.bind(this);
		this.handleItemPress = this.handleItemPress.bind(this);
	}
	
	handleItemPress(anime) {
		let SheetView = RNBottomActionSheet.SheetView; 
		SheetView.Show({
			title: `${anime.title}:`,
			items: [
				{title: "Details", value: 'detail',},
				{title: "Rewatch", value: 'backlog',},
				{title: "Delete", value: 'delete',},
				{title: "Nevermind", value: 'cancel',},
			],
			theme: "light",
			selection: 3,
			onSelection: (index, value) => {
				switch (value) {
					case 'detail':
						this.props.goToAnimeDetail(anime.id);
						break;
					case 'backlog':
						this.props.setAnimeFlow(anime.id, BACKLOG);
						break;
					case 'delete':
						this.props.setAnimeFlow(anime.id, DELETE_STANDBY);
						break;
				}
			}
		});
	}
	
	keyExtractor(item) {
		return `item${item}`;
	}
	
	renderItem({item}) {
		const anime = this.props.animes[item];
		
		return <WatchedItem
			anime={anime}
			onPress={this.handleItemPress}
		/>;
	}
	
	render() {
		return (
			<View style={{flex: 1, backgroundColor: '#fafafa'}}>
				<TopBar 
					title="Watched Animes"
					allowBack
				/>
				<View style={{flex: 1, marginBottom: 32}}>
					<FlatList
						data={this.props.watchedList}
						keyExtractor={this.keyExtractor}
						renderItem={this.renderItem}
					/>
				</View>
			</View>)
	}
}

const styles = StyleSheet.create({
	itemContainer: {
		alignItems: 'center',
		height: 60,
		width: '100%',
		paddingHorizontal: 12,
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	itemTitle: {
		flex: 1,
		fontSize: 26,
		paddingLeft: 8
	},
	itemTitleLong: {
		fontSize: 18
	},
	titleText: {
		fontSize: 16
	},
	textContainer: {
		justifyContent: 'flex-start'
	},
	buttonContainer:{
		justifyContent: 'flex-end'
	},
	descriptionText: {
		fontSize: 12
	},
	separator: {
		flex: 1,
		height: 5,
		marginHorizontal: 8
	},
});


const mapStateToProps = (state) => {
	return {
		animes: state.anime.animes,
		watchedList: state.anime.watchedList,
	}
};

const mapDispatchToProps = (dispatch) => ({
	deleteAnime: id => dispatch(deleteAnime(id)),
	goToAnimeDetail: (id) => dispatch(goToAnimeDetail(id)),
	setAnimeFlow: (id, flow) => dispatch(setAnimeFlow(id, flow)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AnimeWatched);
