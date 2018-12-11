import React, { Component } from 'react';
import {
	ActivityIndicator,
	FlatList,
	Image,
	StyleSheet,
	Text,
	TouchableHighlight,
	View,
} from 'react-native';
import { connect } from 'react-redux';

import Feather from 'react-native-vector-icons/dist/Feather';
import moment from 'moment';

import FormTextInput from '../components/FormTextInput';
import TopBar from '../../shared/components/TopBar';

import Card from '../../shared/components/Card';

import { addAnime, goToAnimeDetail, searchAnime } from '../actions';
import { SEARCH } from "../constants";


class AnimeSearch extends Component {
	constructor(props) {
		super(props);

		this.state = {
			title: ''
		};

		this.handleChangeText = this.handleChangeText.bind(this);
		this._search = this._search.bind(this);
		this._addToBacklog = this._addToBacklog.bind(this);
		this.renderItem = this.renderItem.bind(this);
	}

	componentDidMount() {
	}

	handleChangeText(name, value) {
		this.setState({title: value});
	}

	_search() {
		this.props.searchApi(this.state.title);
	}

	_addToBacklog(theChosenOne) {
		this.props.addAnime(theChosenOne);
	}

	renderItem({item}) {
		return <Result
			anime={this.props.animes[item]}
			selected={this.props.animes[item].flowState !== SEARCH}
			click={this._addToBacklog}
			detailAnime={this.props.detailAnime}
		/>
	}

	keyExtractor(item) {
		return 'search' + item;
	};

	render() {
		return (
			<View style={{flex: 1, backgroundColor: '#fafafa'}}>
				<TopBar title="Anime Search"
					menu
				/>
				<View style={styles.formContainer}>
					<Card style={styles.customSearch}>
						<View style={styles.searchCont}>
							<FormTextInput
								name={'title'}
								value={this.state.title}
								onChangeText={this.handleChangeText}
								onSubmitEditing={this._search}
								style={styles.formInput}
								placeholder='Title'
								maxLength={100}
							/>
							<Feather name="search" size={20} style={styles.searchIcon} onPress={this._search}/>
						</View>
					</Card>
				</View>
				<View>
					{
						this.props.busy ? 
							<ActivityIndicator
								size="large"
							/>
							:
							<FlatList
								data={this.props.searchList}
								extraData={this.props.animes}
								renderItem={this.renderItem}
								keyExtractor={this.keyExtractor}
							/>
						
					}
				</View>
			</View>

		)
	}
}

const Result = ({click, anime, selected, detailAnime}) => {
	return (
		<View style={{width: '100%', padding: 5}}>
			<TouchableHighlight onPress={() => click(anime)} onLongPress={() => detailAnime(anime.id)}>
				<Card style={[styles.resultCard, (selected) ? styles.theChosenOnes : null]}>
					<View style={styles.resCont}>
						<View style={styles.pic}><Image source={{uri: anime.img}} style={{height: 60, width: 60}}/></View>
						<View style={{flex: 1}}>
							<Text numberOfLines={2} style={{textAlign: 'center'}}>
								{anime.title}
							</Text>
							<Text style={{ textAlign: 'center' }}>{moment(anime.startDate).format('YYYY')}</Text>
						</View>
					</View>
				</Card>
			</TouchableHighlight>
		</View>
	)
};

const styles = StyleSheet.create({
	customSearch: {
		height: 40,
		padding: 0,
	},
	theChosenOnes: {
		backgroundColor: '#f0ffff'
	},
	searchCont: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	resCont: {
		flexDirection: 'row',
		padding: 5
	},
	searchIcon: {
		//alignSelf: "flex-end",
		color: "#C1C0BC"
	},
	formContainer: {
		marginBottom: 8,
		marginLeft: 'auto',
		marginRight: 'auto',
		marginTop: 30,
		width: '80%',
	},
	buttonContainer: {
		alignSelf: 'flex-end',
		position: 'absolute',
		bottom: 0,
		width: '100%'
	},
	formInput: {
		flex: 1
	},
	resultCard: {
		width: '100%',
		padding: 5
	},
	pic: {
		height: 60,
		width: 60,
		alignItems: 'center',
		justifyContent: 'center',
	}
});

const mapStateToProps = (state, props) => {
	return {
		animes: state.anime.animes,
		searchList: state.anime.searchAnimeList,
		busy: state.anime.searchBusy,
	}
};

const mapDispatchToProps = (dispatch) => ({
	searchApi: (title) => dispatch(searchAnime(title)),
	addAnime: (anime) => dispatch(addAnime(anime)),
	detailAnime: (id) => dispatch(goToAnimeDetail(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AnimeSearch);
