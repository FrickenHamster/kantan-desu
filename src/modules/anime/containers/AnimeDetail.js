import React, { Component } from 'react';
import {
	Button,
	Image,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from 'react-native';

import { connect } from 'react-redux';
import moment from 'moment';

import TopBar from '../../shared/components/TopBar';

import Card from '../../shared/components/Card';
import { Divider80 } from '../../shared/components/Dividers';
import { addAnime, deleteAnime, setAnimeFlow } from "../actions";
import { BACKLOG, DELETE_STANDBY, SEARCH, WATCHED } from "../constants";

class AnimeDetail extends Component {
	constructor(props) {
		super(props);

		this.renderButtons = this.renderButtons.bind(this);
		this.handleAdd = this.handleAdd.bind(this);
		this.handleRemove = this.handleRemove.bind(this);
		this.handleWatch = this.handleWatch.bind(this);
		this.handleBacklog = this.handleBacklog.bind(this);
	}

	handleAdd() {
		this.props.setAnimeFlow(this.props.anime.id, BACKLOG);
	}

	handleRemove() {
		if (this.props.searchList.includes(this.props.anime.id))
			this.props.setAnimeFlow(this.props.anime.id, SEARCH);
		else
			this.props.setAnimeFlow(this.props.anime.id, DELETE_STANDBY);
	}

	handleWatch() {
		this.props.setAnimeFlow(this.props.anime.id, WATCHED);
	}

	handleBacklog() {
		this.props.setAnimeFlow(this.props.anime.id, BACKLOG);
	}

	renderButtons() {
		const buttons = [];
		switch (this.props.anime.flowState) {
			case BACKLOG:
				buttons.push(
					<View style={styles.buttonContainer} key={'watch'}>
						<Button
							title={'Mark As Watched'}
							onPress={this.handleWatch}
							color='#0EC8EC'
							containerViewStyle={{flex: 1}}
							style={styles.button}
						/>
					</View>);
				buttons.push(
					<View style={styles.buttonContainer} key={'remove'}>
						<Button
							title={'Remove'}
							onPress={this.handleRemove}
							color='#0EC8EC'
							containerViewStyle={{flex: 1}}
							style={styles.button}
						/>
					</View>);
				break;
			case WATCHED:
				buttons.push(
					<View style={styles.buttonContainer} key={'rewatch'}>
						<Button
							title={'Rewatch'}
							onPress={this.handleBacklog}
							color='#0EC8EC'
							containerViewStyle={{flex: 1}}
							style={styles.button}
						/>
					</View>);
				buttons.push(
					<View style={styles.buttonContainer} key={'remove'}>
						<Button
							title={'Remove'}
							onPress={this.handleRemove}
							color='#0EC8EC'
							containerViewStyle={{flex: 1}}
							style={styles.button}
						/>
					</View>);
				break;
			case SEARCH:
				buttons.push(
					<View style={styles.buttonContainer} key={'add'}>
						<Button
							title={'Add'}
							onPress={this.handleAdd}
							color='#0EC8EC'
							containerViewStyle={{flex: 1}}
							style={styles.button}
						/>
					</View>);
				break;
			default:
				buttons.push(
					<View style={styles.buttonContainer} key={'add'}>
						<Button
							title={'Add'}
							onPress={this.handleAdd}
							color='#0EC8EC'
							containerViewStyle={{flex: 1}}
							style={styles.button}
						/>
					</View>);
				break;
		}

		return (<View style={{width: '80%', marginTop: 8}}>
			{buttons}
		</View>);
	}

	render() {
		if (!this.props.anime) {
			return (<View style={{flex: 1, backgroundColor: '#fafafa'}}>
					<View>
						<TopBar title='Loading' back/>
					</View>
				</View>
			)
		}

		const anime = this.props.anime;

		const img = this.props.anime.largeImg ? this.props.anime.largeImg : this.props.anime.img;
		let date = '';
		if (anime.startDate) {
			if (anime.endDate) {
				date = `${anime.startDate} - ${anime.endDate}`;
			} else
				date = moment(anime.startDate).format('');
		}

		return (
			<View style={styles.container}>
				<View>
					<TopBar title={this.props.anime.title} back/>
				</View>
				<ScrollView>
					<View style={{alignItems: 'center', marginBottom: 200}}>
						<View style={styles.pic}>
							<Image
								source={{uri: img}}
								style={{flex: 1}}
								fadeDuration={0}
							/>
						</View>
						<Text style={styles.titleText}>{this.props.anime.title}</Text>
						<Text style={styles.dateText}>{date}</Text>
						<Divider80/>
						<View style={{alignItems: 'center',}}>
							<Text style={{
								fontSize: 20
							}}>{this.props.anime.medium} | {this.props.anime.episodeCount} episodes</Text>
						</View>
						<View style={styles.descripCard}>
							<Card style={{width: '100%'}}>
								<Text style={styles.descrip}>{this.props.anime.description}</Text>
							</Card>
						</View>
						{anime.averageRating && <StatText label='Rating' value={anime.averageRating}/>}
						{anime.ageRating && <StatText label='Age Rating' value={anime.ageRating}/>}
						{this.renderButtons()}
					</View>
				</ScrollView>
			</View>)
	}
}

const StatText = ({label, value}) => {
	return (
		<Card style={styles.statContainer}>
			<Text style={styles.statLabelText}>{label}</Text>
			<Text style={styles.statValueText}>{value}</Text>
		</Card>

	)
};
const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fafafa',
		flex: 1,
	},
	titleText: {
		fontSize: 26,
		marginBottom: 4,
		textAlign: 'center'
	},
	dateText: {
		fontSize: 16,
		textAlign: 'center',
		marginBottom: 16
	},
	descrip: {
		color: '#2e2e2e',
		paddingLeft: 10,
		paddingRight: 10,
		fontSize: 16,
	},
	descripCard: {
		marginTop: 10,
		justifyContent: 'center',
		marginLeft: 'auto',
		marginRight: 'auto',
		width: '100%',
		marginBottom: 16,
	},
	pic: {
		marginBottom: 25,
		width: '100%',
		height: 300
	},
	additionalStatsText: {
		fontSize: 20,
		marginBottom: 12,
		textAlign: 'center',
	},
	statContainer: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		marginBottom: 5
	},
	statLabelText: {
		flex: 1,
		fontSize: 18
	},
	statValueText: {
		color: '#000',
		flex: 1,
		fontSize: 22,
		textAlign: 'right'
	},
	buttonContainer: {
		paddingVertical: 5,
	}
});

const mapStateToProps = (state, props) => {
	return {
		anime: state.anime.animes[props.match.params.id],
		searchList: state.anime.searchAnimeList,
	};
};

const mapDispatchToProps = (dispatch) => ({
	addAnime: anime => dispatch(addAnime(anime)),
	deleteAnime: id => dispatch(deleteAnime(id)),
	setAnimeFlow: (id, flow) => dispatch(setAnimeFlow(id, flow)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AnimeDetail);
