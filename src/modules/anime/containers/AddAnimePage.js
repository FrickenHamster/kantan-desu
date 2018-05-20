import React, { Component } from 'react';
import {
	Button,
	View,
	StyleSheet,
	Text,
} from 'react-native';
import { connect } from 'react-redux';
import { push } from 'react-router-redux'

import FormTextInput from '../components/FormTextInput';

import { addAnime } from '../actions';

class AddAnimePage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			title: '',
			description: ''
		};

		this.handleChangeText = this.handleChangeText.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChangeText(name, value) {
		this.setState({[name]: value});
	}

	handleSubmit() {
		if (this.state.title.length === 0)
			return;
		this.props.addAnime(this.state.title, this.state.description);
	}

	render() {
		return (
			<View style={{flex: 1}}>
				<View style={styles.formContainer}>
					<Text style={styles.title}>Add Animu To Backlog</Text>
					<FormTextInput
						name={'title'}
						value={this.state.title}
						onChangeText={this.handleChangeText}
						style={styles.formInput}
						placeholder='Title'
						maxLength={20}
					/>
					<FormTextInput
						name={'description'}
						value={this.state.description}
						onChangeText={this.handleChangeText}
						style={[styles.formInput, {height: 120}]}
						placeholder='Description'
						multiline={true}
					/>

				</View>
				<View
					style={styles.buttonContainer}
				>
					<Button
						title={'Add Anime'}
						onPress={this.handleSubmit}
						style={{flex: 1}}
					/>
				</View>
			</View>)
	}
}

const mapDispatchToProps = (dispatch) => ({
	addAnime: (name, description) => {
		dispatch(addAnime(name, description));
		//handle with saga later
		dispatch(push('/'))
	}
});

export default connect(null, mapDispatchToProps)(AddAnimePage);


const styles = StyleSheet.create({
	title: {
		fontSize: 24,
		textAlign: 'center',
		marginTop: 12,
		marginBottom: 20
	},
	formContainer: {
		padding: 10,
	},
	formInput: {
		fontSize: 18,
		marginBottom: 8
	},
	buttonContainer: {
		alignSelf: 'flex-end',
		position: 'absolute',
		bottom: 0,
		width: '100%'
	}
});

