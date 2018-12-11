import React, { Component } from 'react';
import {
	Button,
	View,
	StyleSheet,
	Text,
	TouchableHighlight
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import { pushHistory, setShowSideMenu } from "../../config/actions";

const NavigateButton = ({label, icon, onPress, setShowSideMenu}) => {
	return (
		<TouchableHighlight
			style={styles.navigateButtonContainer}
			onPress={() => {
				onPress();
				setShowSideMenu(false);
			}}
		>
			<View style={styles.navigateButton}>
				<View
					style={styles.navigateIcon}
				>
				<Icon
					size={20}
					name={icon}
					color={'white'}
				/>
				</View>
				<Text
					style={styles.navigateLabel}>
					{label}
				</Text>
			</View>
		</TouchableHighlight>
	)
};

class SideMenuContent extends Component {
	
	render() {
		return (<View style={styles.container}>
			<NavigateButton
				label='Backlog'
				icon='list'
				onPress={this.props.goToBacklog}
				setShowSideMenu={this.props.setShowSideMenu}
			/>
			<NavigateButton
				label='Search'
				icon='search'
				onPress={this.props.goToSearchAnime}
				setShowSideMenu={this.props.setShowSideMenu}
			/>
			<NavigateButton
				label='Watched Anime'
				icon='eye-off'
				onPress={this.props.goToWatchedAnime}
				setShowSideMenu={this.props.setShowSideMenu}
			/>
			</View>)
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor:'#3576ff',
		flex: 1,
		paddingTop: 80,
		width: window.width,
	},
	navigateButtonContainer: {
		alignItems: 'center',
		borderBottomColor: '#64345f',
		borderBottomWidth: 1,
		height: 50,
		width: '100%',
		justifyContent: 'center',
	},
	navigateButton: {
		alignItems: 'center',
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-start',
	},
	navigateIcon: {
		alignItems: 'center',
		alignSelf: 'flex-start',
		height: '100%',
		justifyContent: 'center',
		width: 24},
	navigateLabel: {
		color: 'white',
		flex: 1,
		fontSize: 20
	}
});

const mapDispatchToProps = dispatch => ({
	goToBacklog: () => dispatch(pushHistory('/')),
	goToWatchedAnime: () => dispatch(pushHistory('/watched')),
	goToSearchAnime: () => dispatch(pushHistory('/animesearch')),
	setShowSideMenu: (show) => dispatch(setShowSideMenu(show)),
});

export default connect(null, mapDispatchToProps)(SideMenuContent);
