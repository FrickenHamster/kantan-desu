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

class AnimeSearch extends Component {
	constructor(props) {
		super(props);

		this.state = {
			title: ''
		}

		this.handleChangeText = this.handleChangeText.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChangeText(name, value) {
		console.log(value);
		this.setState({ title: value });
	}

	handleSubmit() {
		console.log('submitting');
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
							<Feather name="search" size={20} style={styles.searchIcon} />
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
					<ScrollView>
						<Result img={require('../imgs/pancake.jpg')} name='Toradora' description='Guy gets blackmailed into making breakfast for loli then obtains tsundere waifu' />
						<Result img={require('../imgs/pancake.jpg')} name='Shirokuma Cafe' description='Slice of Life bear anime' />
						<Result img={require('../imgs/pancake.jpg')} name='Fate Stay: Pick ur Waifu' description='EX-Harem protagonist gets 3 routes: EKUSUKARIBAAAA, ojou-sama, kouhai' />	
						<Result img={require('../imgs/pancake.jpg')} name='Shouta and Onee-san' description='shouta goes on adventure with his onee-san' />
					</ScrollView>
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
					<View style={styles.pic}><Image source={props.img} style={{ height: 60, width: 60 }} /></View>
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
	let stuff;
	for (let i = 0; i < state.anime.animes.length; i++) {
		let curr = state.anime.animes[i];
		if (curr.id.toString() === props.match.params.id) {
			stuff = curr;
			break;
		}
	}
	return {
		anime: stuff
	}
};

export default connect(mapStateToProps, null)(AnimeSearch);





/* const styles = StyleSheet.create({

});
 */
