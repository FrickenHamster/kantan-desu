import React, { Component } from 'react';
import {
	Button,
	View,
	StyleSheet,
	Text,
	Image
} from 'react-native';
import { Feather } from '@expo/vector-icons';

import { connect } from 'react-redux';

import TopBar from '../components/TopBar';

import Card from '../shared/components/Card';

class AnimeSearch extends Component {
	constructor(props) {
		super(props);
	}

	render() {

		return (
			<View style={{flex: 1, backgroundColor: '#fafafa'}}>
        	<View>
				<TopBar title={this.props.anime.title} />
			</View>
			<View style={styles.pic}><Image source={require('../imgs/usapi.jpg')}/></View>
			<View style={styles.descripCard}>
			<Card>
				<Text style={styles.descrip}>{this.props.anime.description}</Text>
			</Card>
			</View>
			
			</View>)
	}
}

const styles = StyleSheet.create({
    
});

const mapStateToProps = (state, props) => {
	let stuff;
	for(let i = 0; i < state.anime.animes.length; i++){
		let curr = state.anime.animes[i];
		if(curr.id.toString() === props.match.params.id){
			stuff = curr;
			break;
		}
	}
	return {
		anime: stuff
	}
};

export default connect(mapStateToProps, null)(AnimeDetail);


 


/* const styles = StyleSheet.create({

});
 */
