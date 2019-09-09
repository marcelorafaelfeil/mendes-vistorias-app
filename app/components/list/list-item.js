import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Loading } from '../loading/loading';
import Icon from 'react-native-vector-icons/Ionicons';
import { Platform } from '@unimodules/core';

export class ListItem extends React.Component {
	state = {
		loaded: false
	};

	async componentWillMount() {
		this.setState({
			loaded: true
		});
	}

	_numberColor = () => {
		return this.props.status === 'danger'
			? styles.dangerText
			: this.props.status === 'warning'
			? styles.warningText
			: styles.successText;
	};

	render() {
		if (!this.state.loaded) {
			return <Loading></Loading>;
		}
		return (
			<View style={styles.item}>
				<View style={styles.nameAndAddress}>
					<View>
						<Text numberOfLines={1} style={styles.label}>
							{this.props.label}
						</Text>
					</View>
					<Text numberOfLines={1} style={styles.description}>
						{this.props.description}
					</Text>
				</View>
				<View style={styles.timeToExpire}>
					<Text
						style={[
							styles.textCenter,
							styles.strong,
							this._numberColor()
						]}
					>
						{this.props.time}
					</Text>
					<Text style={[styles.textCenter, styles.description]}>
						{this.props.unit}
					</Text>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	item: {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
		padding: 10,
		borderBottomWidth: 1,
		borderBottomColor: '#F6F6F6',
		justifyContent: 'space-between',
		backgroundColor: '#FFFFFF'
	},
	label: {
		fontFamily: 'Roboto'
	},
	description: {
		color: '#CCCCCC',
		fontFamily: 'Roboto'
	},
	nameAndAddress: {
		maxWidth: 225
	},
	timeToExpire: {
		textAlign: 'center'
	},
	textCenter: {
		textAlign: 'center'
	},
	strong: {
		fontWeight: 'bold'
	},
	dangerText: {
		color: '#F84949'
	},
	warningText: {
		color: '#EFDA1B'
	},
	successText: {
		color: '#18EE58'
	}
});
