import React from 'react';
import { Font } from 'expo';
import { View, Text, StyleSheet } from 'react-native';
import { Loading } from '../../components/loading/Loading';

export class ListItem extends React.Component {

	state = {
		loaded: false
	};

	componentWillMount() {
		this._loadFontAsync();
	}

	_loadFontAsync = async () => {
		await Font.loadAsync({
			Roboto: require('../../../assets/fonts/Roboto-Regular.ttf')
		});

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
	}

	render() {
		if (!this.state.loaded) {
			return (<Loading></Loading>);
		}
		return (
			<View style={styles.item}>
				<View style={styles.nameAndAddress}>
					<Text numberOfLines={1}>{this.props.label}</Text>
					<Text numberOfLines={1} style={styles.description}>{this.props.description}</Text>
				</View>
				<View style={styles.timeToExpire}>
					<Text style={[styles.textCenter, styles.strong, this._numberColor()]}>{this.props.time}</Text>
					<Text style={[styles.textCenter, styles.description]}>{this.props.unit}</Text>
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
	description: {
		color: '#CCCCCC'
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