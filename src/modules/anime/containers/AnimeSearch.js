import React, { Component } from 'react';
import {
	Button,
	View,
	StyleSheet,
	Text,
	Image,
	FlatList,
	ScrollView,
	TextInput
} from 'react-native';
import { Feather } from '@expo/vector-icons';

import { connect } from 'react-redux';

import TopBar from '../components/TopBar';

import Card from '../shared/components/Card';

import { searchAnime } from '../actions';

class AnimeSearch extends Component {
	constructor(props) {
		super(props);

		this.state = {
			title: ''
		}

		this.handleChangeText = this.handleChangeText.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this._search = this._search.bind(this);
	}

	handleChangeText(name, value) {
		this.setState({ title: value });
	}

	handleSubmit() {
		console.log('submitting');
	}

	_search(){
		this.props.searchApi(this.state.title);
	}

	render() {

		return (
			<View style={{ flex: 1, backgroundColor: '#fafafa' }}>
				<TopBar title="Anime Search" />
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
							<Feather name="search" size={20} style={styles.searchIcon} onPress={this._search} />
						</View>
					</Card>
				</View>
				<View style={styles.buttonContainer}>
					<Button
						title={'Add Anime'}
						onPress={this.handleSubmit}
						style={{ flex: 1 }}
						color='#0EC8EC'
					/>
				</View>
				<View style={styles.results}>
					<FlatList
						data = {this.props.animeList}
						renderItem ={({item}) => { 
						return <Result img={item.img} name={item.title} description={item.description}/>}}
					/>
				</View>
			</View>

		)
	}
}

const Result = (props) => {
	return (
		<View style={{ width: '100%', padding: 5 }}>
			<Card style={styles.resultCard}>
				<View style={styles.resCont}>
					<View style={styles.pic}><Image source={{uri: props.img}} style={{ height: 60, width: 60 }} /></View>
					<Text style={{flex:1, paddingLeft: 5}}>
						Name: {props.name} {"\n"}
						Description: {props.description}
					</Text>
				</View>
			</Card>
		</View>
	)
}

const styles = StyleSheet.create({
	customSearch: {
		height: 40,
		padding: 0,

	},
	searchCont: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	resCont: {
		flexDirection: 'row',
		//justifyContent: 'center',
		//alignItems: 'center',
		padding: 5
	},
	searchIcon: {
		//alignSelf: "flex-end",
		color: "#C1C0BC"
	},
	formContainer: {
		fontSize: 18,
		marginBottom: 8,
		color: '#2e2e2e',
		marginLeft: 'auto',
		marginRight: 'auto',
		marginTop: 20
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
		//paddingLeft: 5
		// paddingBottom: 20,
		// marginTop: 20
	}
});

const mapStateToProps = (state, props) => {
	return {
		animeList: state.anime.searchAnimeList 
	}
};

const mapDispatchToProps = (dispatch) => ({
	searchApi: (title) => dispatch(searchAnime(title))
});

export default connect(mapStateToProps, mapDispatchToProps)(AnimeSearch);





/* const styles = StyleSheet.create({

});
 */
