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

class AnimeDetail extends Component {
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
			<Text style={styles.descrip}>{this.props.anime.description}</Text>
			</View>)
	}
}

const styles = StyleSheet.create({
	descrip: {
		color: '#2e2e2e',
		paddingLeft: 10,
		paddingRight: 10,
		fontSize: 20
	},
	pic: {
		maxHeight: 700, 
		maxWidth: 500,
		margin: 'auto',
		alignItems: 'center',
		justifyContent: 'center',
		paddingBottom: 20,
		marginTop: 20
	}
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
