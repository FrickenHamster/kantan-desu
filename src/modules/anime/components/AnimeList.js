import React, { Component, PureComponent } from 'react';
import Feather from 'react-native-vector-icons/dist/Feather';
import {
	FlatList,
	View,
	StyleSheet,
	Text,
	TouchableOpacity,
	Image
}  from 'react-native';

import Card from '../../shared/components/Card';


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
			<Card>
				<TouchableOpacity onLongPress={this.detailClick}>
					<View style={styles.itemContainer}>
						<View style={styles.pic}>
							<Image source={{uri: this.props.img}}
								   style={{height: 60, width: 60, justifyContent: 'center'}}/>
						</View>
						<Text numberOfLines={2}
							  style={[styles.itemTitle, this.props.title.length > 18 && styles.itemTitleLong]}>
							{this.props.title}
						</Text>
						<View style={styles.deleteButton}>
							<TouchableOpacity onPress={this.handleClick} style={styles.buttonContainer}><Feather
								name="delete" color="#524c84" backgroundColor="#D7776B" size={16}/></TouchableOpacity>
						</View>
					</View>
				</TouchableOpacity>
			</Card>
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
			title={val.item.title}
			id={val.item.id}
			img={val.item.img}
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
			<View style={{flex:1}}>
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
		alignItems: 'center',
		height: 60,
		width: '100%',
		paddingHorizontal: 12,
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	itemTitle: {
		flex: 1,
		fontSize: 30,
		paddingLeft: 8
	},
	itemTitleLong: {
		fontSize: 18
	},
	titleText: {
		fontSize: 16
	},
	textContainer: {
		justifyContent: 'flex-start'
	},
	buttonContainer:{
		justifyContent: 'flex-end'
	},
	descriptionText: {
		fontSize: 12
	},
	separator: {
		flex: 1,
		height: 5,
		marginHorizontal: 8
	},
	deleteButton:{
		alignSelf: 'center',
		justifyContent: 'flex-end'
	}
});
