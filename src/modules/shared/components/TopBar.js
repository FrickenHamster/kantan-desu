import React, { Component } from 'react';
import {
	View,
	StyleSheet,
	Text,
	TouchableHighlight
} from 'react-native';
import PropTypes from 'prop-types';

import Feather from 'react-native-vector-icons/dist/Feather';

import { popHistory } from "../../config/actions";
import { connect } from "react-redux";

class TopBar extends Component {
	constructor(props) {
		super(props);

		this.handleBack = this.handleBack.bind(this);
	}

	static contextTypes = {
		router: PropTypes.object, // replace with PropTypes.object if you use them
	};

	handleBack(){
		this.props.goBack();
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={{alignSelf: 'flex-start', justifyContent: 'center', alignItems: 'center', height: '100%', width: 40}}>
					{
						this.props.allowBack &&
						<TouchableHighlight>
							<Feather name="chevron-left" color="#fffafa" size={32} onPress={this.handleBack}/>
						</TouchableHighlight>
					}
				</View>
				<View style={{flex: 1, marginLeft: 10, justifyContent: 'center'}}>
					<Text style={[styles.title, this.props.title.length > 18 ? styles.longTitle : null]} numberOfLines={1}>
						{this.props.title}
					</Text>
				</View>
				<View style={{alignSelf: 'flex-end', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
					{
						this.props.right
					}
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		alignSelf: 'stretch',
		alignItems: 'center',
		backgroundColor: '#60DCE8',
		justifyContent: 'center',
		flexDirection: 'row',
		top: 0,
		right: 0,
		left: 0,
		padding: 2,
		height: 40,
		zIndex: 9,
	},
	title: {
		color: '#fffafa',
		fontSize: 24,
	},
	longTitle: {
		fontSize: 16,
	}
});

const mapDispatchToProps = (dispatch) => ({
	goBack: () => dispatch(popHistory())
});

export default connect(null, mapDispatchToProps)(TopBar);

