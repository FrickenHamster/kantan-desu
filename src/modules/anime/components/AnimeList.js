import React, { Component } from 'react';
import {
	FlatList,
	View,
	StyleSheet,
	Text
}  from 'react-native';
import PropTypes from 'prop-types';

export default class AnimeList extends Component {
	
	
	render() {
		return (
			<View>
				<FlatList 
					data={this.props.animes}
					renderItem={({item}) => (<Text key={item}> {item} </Text>)}
				/>
			</View>
		)
	}
	
}
	

