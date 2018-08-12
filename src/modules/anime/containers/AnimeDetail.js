import React, { Component } from 'react';
import {
	Button,
	View,
	StyleSheet,
	Text,
	Image
} from 'react-native';

import { connect } from 'react-redux';

import TopBar from '../components/TopBar';

import Card from '../shared/components/Card';

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
			<View style={styles.descripCard}>
			<Card>
				<Text style={styles.descrip}>{this.props.anime.description}</Text>
			</Card>
			</View>
			
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
	descripCard:{
		justifyContent: 'center',
		marginLeft: 'auto',
		marginRight: 'auto'

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
