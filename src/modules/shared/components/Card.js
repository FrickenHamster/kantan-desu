import React, { Component } from 'react';
import {
	Button,
	View,
	StyleSheet,
	Text,
} from 'react-native';

export default class Card extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View style={[styles.container, this.props.style]}>
                {this.props.children}
			</View>)
	}
}



const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		alignSelf: 'baseline',
		padding: 10,
		borderColor: '#C1C0BC',
		borderRadius: 5,
		borderWidth: 0.5,
		width: '100%'
	},
});

