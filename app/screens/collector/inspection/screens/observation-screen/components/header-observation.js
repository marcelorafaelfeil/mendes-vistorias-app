import React, { Component } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { theme } from '../../../../../../theme/mendes-light';
import { Platform } from 'expo-core';

export default class HeaderObservation extends Component {
	render() {
		return (
			<View style={style.headerContent}>
				<View style={style.contentProfile}>
					{!!this.props.picture ? (
						<Image
							style={style.profilePicture}
							source={{ uri: this.props.picture }}
						/>
					) : (
							<View style={style.contentIcon}>
								<Icon name={(Platform.OS === 'ios' ? 'ios' : 'md') + '-person'} size={32} style={style.icon}></Icon>
							</View>
						)}
				</View>
				<View style={style.contentInfo}>
					<Text style={style.name}>
						{this.props.title}
					</Text>
					<Text style={style.subHeader}>
						{this.props.subHeader}
					</Text>
				</View>
			</View>
		)
	}
}

const PICTURE_SIZE = 45;
const style = StyleSheet.create({
	headerContent: {
		flex: 1,
		flexDirection: 'row',
		borderBottomWidth: 1,
		padding: 10,
		borderBottomColor: theme.appContent.backgroundColor,
		backgroundColor: theme.panel.backgroundColor,
		borderTopWidth: 2,
		borderTopColor: theme.primaryColor.color
	},
	contentProfile: {

	},
	contentIcon: {
		width: PICTURE_SIZE,
		height: PICTURE_SIZE,
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: 1,
		borderColor: '#CCCCCC',
		borderRadius: PICTURE_SIZE/2
	},
	icon: {
		color: '#CCCCCC'
	},
	contentInfo: {
		paddingLeft: 15,
		justifyContent: 'center'
	},
	name: {
		color: theme.primaryColor.color
	},
	subHeader: {
		color: theme.textSubheader.color,
		fontSize: 12
	},
	profilePicture: {
		width: PICTURE_SIZE,
		height: PICTURE_SIZE,
		borderRadius: PICTURE_SIZE / 2
	}
});