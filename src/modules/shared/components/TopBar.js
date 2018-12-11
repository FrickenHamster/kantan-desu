import React, { Component } from 'react';
import {
	View,
	StyleSheet,
	Text,
	TouchableHighlight
} from 'react-native';
import PropTypes from 'prop-types';

import Feather from 'react-native-vector-icons/dist/Feather';

import { popHistory, setShowSideMenu } from "../../config/actions";
import { connect } from "react-redux";

class TopBar extends Component {
	constructor(props) {
		super(props);

		this.handleBack = this.handleBack.bind(this);
		this.handleMenu = this.handleMenu.bind(this);
	}

	static contextTypes = {
		router: PropTypes.object, // replace with PropTypes.object if you use them
	};

	handleBack(){
		this.props.goBack();
	}
	
	handleMenu() {
		this.props.setShowSideMenu(!this.props.showSideMenu);
	}

	render() {
		
		const leftIcons = [];
		if (this.props.menu) {
			leftIcons.push(<TouchableHighlight key='menu'>
				<Feather name="menu" color="#fffafa" size={32} onPress={this.handleMenu}/>
			</TouchableHighlight>);
		}
		if (this.props.back) {
			leftIcons.push(<TouchableHighlight key='back'>
				<Feather name="chevron-left" color="#fffafa" size={32} onPress={this.handleBack}/>
			</TouchableHighlight>)
		}
		const leftWidth = leftIcons.length * 40;

		return (
			<View style={styles.container}>
				
				<View style={[{width: leftWidth}]}>
					{leftIcons}
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
	},
});


const mapDispatchToProps = dispatch => ({
	goBack: () => dispatch(popHistory()),
	setShowSideMenu: (show) => {
		dispatch(setShowSideMenu(show));
	},
});

export default connect(state => ({showSideMenu: state.config.showSideMenu}) , mapDispatchToProps)(TopBar);

