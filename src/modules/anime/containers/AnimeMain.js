import React, { Component, PropTypes } from 'react';
import {
	Button,
	View,
	Text,
	TextInput
} from 'react-native';
import { connect } from 'react-redux';

import AnimeList from '../components/AnimeList';
import { addAnime } from '../actions';

class AnimeMain extends Component {

	constructor(props) {
		super(props);
		this.addAnimeHandler = this.addAnimeHandler.bind(this);
		this.state = {
			inputAnime: ''
		};
		this.handleChange = this.handleChange.bind(this);
	}
	
	handleChange(text, name) {
		this.setState({[name]: text});
	}

	addAnimeHandler() {
		if (this.state.inputAnime.length === 0)
			return;
		this.props.addAnime(this.state.inputAnime);
	}

	render() {
		return (
			<View style={{flex: 1}}>
				<Text style={{textAlign: 'center', fontSize: 20}}>Anime Backlog</Text>
				<TextInput
					value={this.state.inputAnime}
					onChangeText={text => {
						this.handleChange(text, 'inputAnime');
					}}
				/>
				<AnimeList
					animes={this.props.animes}
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
						onPress={this.addAnimeHandler}
						style= {{
						flex: 1
					}}

					/>
				</View>
			</View>
		)
	}

}

const mapStateToProps = (state) => {
	return {
		animes: state.anime.animes
	}
};


const mapDispatchToProps = (dispatch) => ({
	addAnime: (name) => {
		dispatch(addAnime(name))
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(AnimeMain);
