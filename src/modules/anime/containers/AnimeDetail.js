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

class AnimeDetail extends Component {
	constructor(props) {
		super(props);

		this.handleClick = this.handleClick.bind(this);
	}

	static contextTypes = {
		router: () => true, // replace with PropTypes.object if you use them
	}

	handleClick(){
		this.context.router.history.goBack();
	}


	render() {

		return (
			<View style={{flex: 1, backgroundColor: '#ffe5d9'}}>
        	<View>
				<Text style={styles.title}>{this.props.anime.title}</Text>
				<View><Feather name="chevron-left" color="purple" size={32} onPress={this.handleClick}/></View>
			</View>
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
