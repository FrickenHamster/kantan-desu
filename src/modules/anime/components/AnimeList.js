import React, { Component, PureComponent } from 'react';
import {
	FlatList,
	View,
	StyleSheet,
	Text
}  from 'react-native';
import PropTypes from 'prop-types';

class AnimeListItem extends PureComponent{
	render() {
		return (
			<View style={styles.itemContainer}>
				<Text style={styles.titleText}>{this.props.item}</Text>
				<Text style={styles.descriptionText}>{this.props.description}</Text>
			</View>
		)
	}
}

export default class AnimeList extends Component {
	
	renderItem(val) {
		return (<AnimeListItem 
			item={val.item.title}
			description={val.item.description}
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
		justifyContent: 'center'
	},
	titleText: {
		fontSize: 20
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
});

