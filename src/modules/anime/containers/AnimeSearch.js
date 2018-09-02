import React, { Component } from 'react';
import {
	Button,
	View,
	StyleSheet,
	Text,
	Image,
	FlatList,
	ScrollView,
	TextInput,
	TouchableHighlight
} from 'react-native';
import { connect } from 'react-redux';

import Feather from 'react-native-vector-icons/dist/Feather';
import moment from 'moment';

import FormTextInput from '../components/FormTextInput';
import TopBar from '../../shared/components/TopBar';

import Card from '../../shared/components/Card';

import { addAnime, goToAnimeDetail, searchAnime } from '../actions';


class AnimeSearch extends Component {
	constructor(props) {
		super(props);

		this.state = {
			title: ''
		};

		this.handleChangeText = this.handleChangeText.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this._search = this._search.bind(this);
		this._addToBacklog = this._addToBacklog.bind(this);
		this.renderItem = this.renderItem.bind(this);
	}

	componentDidMount() {
		this._search();
	}

	handleChangeText(name, value) {
		this.setState({title: value});
	}

	handleSubmit() {
		console.log('submitting');
	}

	_search() {
		this.props.searchApi(this.state.title);
	}

	_addToBacklog(theChosenOne) {
		this.props.addAnime(theChosenOne);
	}

	renderItem({item}) {
		return <Result
			anime={item} img={item.img} name={item.title} id={item.id}
			selected={this.props.backlog[item.id]}
			click={this._addToBacklog}
			detailAnime={this.props.detailAnime}
		/>
	}

	keyExtractor(item) {
		return item.id;
	};

	render() {
		return (
			<View style={{flex: 1, backgroundColor: '#fafafa'}}>
				<TopBar title="Anime Search" allowBack/>
				<View style={styles.formContainer}>
					<Card style={styles.customSearch}>
						<View style={styles.searchCont}>
							<FormTextInput
								name={'title'}
								value={this.state.title}
								onChangeText={this.handleChangeText}
								style={styles.formInput}
								placeholder='Title'
								maxLength={100}
							/>
							<Feather name="search" size={20} style={styles.searchIcon} onPress={this._search}/>
						</View>
					</Card>
				</View>
				<View style={styles.results}>
					<FlatList
						data={this.props.animeList}
						extraData={this.props.backlog}
						renderItem={this.renderItem}
						keyExtractor={this.keyExtractor}
					/>
				</View>
			</View>

		)
	}
}

const Result = ({id, click, anime, name, img, selected, detailAnime}) => {
	return (
		<View style={{width: '100%', padding: 5}}>
			<TouchableHighlight onPress={() => click(anime)} onLongPress={() => detailAnime(id)}>
				<Card style={[styles.resultCard, (selected) ? styles.theChosenOnes : null]}>
					<View style={styles.resCont}>
						<View style={styles.pic}><Image source={{uri: img}} style={{height: 60, width: 60}}/></View>
						<View>
							<Text numberOfLines={2} style={{flex: 1, paddingLeft: 5}}>
								{name}
							</Text>
							<Text>{moment(anime.startDate).format('YYYY')}</Text>
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
		animeList: state.anime.searchAnimeList,
		backlog: state.anime.animes
	}
};

const mapDispatchToProps = (dispatch) => ({
	searchApi: (title) => dispatch(searchAnime(title)),
	addAnime: (anime) => dispatch(addAnime(anime)),
	detailAnime: (id) => dispatch(goToAnimeDetail(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AnimeSearch);
