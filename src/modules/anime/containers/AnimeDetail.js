import React, { Component } from 'react';
import {
	Button,
	View,
	StyleSheet,
	Text,
	Image
} from 'react-native';

import { connect } from 'react-redux';

class AnimeDetail extends Component {
	constructor(props) {
		super(props);
	}


	render() {
		return (
			<View style={{flex: 1, backgroundColor: '#ffe5d9'}}>
        	<Text style={styles.title}>{this.props.anime.title}</Text>
			<Text>{"\n \n"}</Text>
			<View style={styles.pic}><Image source={require('../imgs/usapi.jpg')}/></View>
			<Text style={styles.descrip}>{this.props.anime.description}</Text>
			</View>)
	}
}

const styles = StyleSheet.create({
	title: {
		fontSize: 24,
		textAlign: 'center',
		backgroundColor: '#9d8189',
		color: '#d8e2df',
		position: 'absolute',
		top: 0,
		alignSelf: 'stretch',
		right: 0,
		left: 0
	},
	descrip: {
		color: '#9d8189',
		paddingLeft: 10,
		paddingRight: 10
	},
	pic: {
		maxHeight: 700, 
		maxWidth: 500,
		margin: 'auto',
		alignItems: 'center',
		justifyContent: 'center',
		paddingBottom: 20
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
