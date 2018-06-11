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
			<View style={styles.container}>
                {this.props.children}
			</View>)
	}
}



const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		alignSelf: 'baseline',
		minWidth: 300,
		padding: 10,
		borderColor: '#2e2e2e',
		borderRadius: 5,
		borderWidth: 0.5
	},
});

