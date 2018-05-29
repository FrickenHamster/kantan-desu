import React, { Component, PureComponent } from 'react';
import { Feather } from '@expo/vector-icons'
import {
	FlatList,
	View,
	StyleSheet,
	Text,
	TouchableOpacity
}  from 'react-native';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { push } from 'react-router-redux';


class AnimeListItem extends PureComponent{
	constructor(props){
		super(props);

		this.handleClick = this.handleClick.bind(this);
		this.detailClick = this.detailClick.bind(this);
	}

	handleClick(){
		this.props.deleteFunc(this.props.id);
	}

	detailClick(){
		this.props.detailFunc(this.props.id);
	}

	render() {
		return (
			<View style={styles.itemContainer}>
				<View>
				<Text style={[styles.titleText, styles.textContainer]} onPress={this.detailClick}>{this.props.item}</Text>
				<Text style={styles.descriptionText}>{this.props.description}</Text>
				</View>
				<View style={styles.deleteButton}><TouchableOpacity onPress={this.handleClick} style={styles.buttonContainer}><Feather name="delete" color="purple" size={32}/></TouchableOpacity></View>
			</View>
		)
	}
}

export default class AnimeList extends Component {
	constructor(props){
		super(props);

		this.renderItem = this.renderItem.bind(this);
	}
	renderItem(val) {
		return (<AnimeListItem
			deleteFunc={this.props.deleteFunc} 
			item={val.item.title}
			id={val.item.id}
			description={val.item.description}
			detailFunc={this.props.detailFunc}
		/>);
	}
	
	renderSeperator(item) {
		return (<View key={`sep${item.leadingItem.id}`} style={styles.separator} />)
	}
	
	keyExtractor(item) {
		return `item${item.id}`;
	}
	
	render() {
		return (
			<View>
				<FlatList 
					data={this.props.animes}
					renderItem={this.renderItem}
					keyExtractor={this.keyExtractor}
					ItemSeparatorComponent={this.renderSeperator}
					extraData={this.state}
				/>
			</View>
		)
	}
	
}

const styles = StyleSheet.create({
	itemContainer: {
		height: 80,
		paddingHorizontal: 12,
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	titleText: {
		fontSize: 20
	},
	textContainer: {
		justifyContent: 'flex-start'
	},
	buttonContainer:{
		justifyContent: 'flex-end'
	},
	descriptionText: {
		fontSize: 14
	},
	separator: {
		flex: 1,
		height: 1,
		backgroundColor: '#8E8E8E',
		marginHorizontal: 8
	},
	deleteButton:{
		alignSelf: 'center',
		justifyContent: 'flex-end'
	}
});