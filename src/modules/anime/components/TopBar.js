import React, { Component } from 'react';
import {
	Button,
	View,
	StyleSheet,
	Text,
	Image
} from 'react-native';
import PropTypes from 'prop-types';

import { Feather } from '@expo/vector-icons';

export default class TopBar extends Component {
	constructor(props) {
		super(props);

		this.handleClick = this.handleClick.bind(this);
	}

	static contextTypes = {
		router: PropTypes.object, // replace with PropTypes.object if you use them
	}

	handleClick(){
		this.context.router.history.goBack();
	}


	render() {

		return (
        	<View>
				<Text style={styles.title}>{this.props.title}</Text>
				<View><Feather name="chevron-left" color="#c5c2e1" size={32} onPress={this.handleClick}/></View>
			</View>
        )
	}
}

const styles = StyleSheet.create({
	title: {
		fontSize: 24,
		textAlign: 'center',
		backgroundColor: '#7c73e6',
		color: '#c4c1e0',
		position: 'absolute',
		top: 0,
		alignSelf: 'stretch',
		right: 0,
		left: 0
	}
});