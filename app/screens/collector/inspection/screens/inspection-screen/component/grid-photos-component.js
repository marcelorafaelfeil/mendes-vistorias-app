import { connectActionSheet } from '@expo/react-native-action-sheet';
import * as ImagePicker from 'expo-image-picker';
import { Platform } from '@unimodules/core';
import React, { Component } from 'react';
import {
	Dimensions,
	Image,
	StyleSheet,
	TouchableOpacity,
	View,
	ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { theme } from '../../../../../../theme/mendes-light';
import styled from 'styled-components';

const IMAGE_WIDTH = Dimensions.get('window').width / 2 - 10;
const IMAGE_HEIGHT = Dimensions.get('window').width / 2 - 10;

const LoadingStyled = styled(ActivityIndicator)`
	position: absolute;
	z-index: 10;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	border-radius: 10;
`;

@connectActionSheet
export default class GridPhotosComponent extends Component {
	render() {
		return (
			<View style={styles.contentGrid}>
				{this.props.photos.map((photo, index) => (
					<TouchableOpacity
						onPress={() => this.openImageOptions(index)}
						key={index}
					>
						<View style={styles.grid}>
							<Image
								source={{ uri: photo.uri }}
								style={{
									width: IMAGE_WIDTH,
									height: IMAGE_HEIGHT,
									borderRadius: 10
								}}
							/>
							{!!photo.loading && (
								<LoadingStyled size="large" color="#0c9" />
							)}
						</View>
					</TouchableOpacity>
				))}
				<TouchableOpacity onPress={() => this.openList()}>
					<View style={[styles.placeholder, styles.grid]}>
						<Icon
							name={
								(Platform.OS === 'ios' ? 'ios' : 'md') + '-add'
							}
							size={70}
							style={styles.icon}
						/>
					</View>
				</TouchableOpacity>
			</View>
		);
	}

	openList() {
		this.props.showActionSheetWithOptions(
			{
				options: ['Cancelar', 'Tirar foto', 'Escolher da biblioteca'],
				cancelButtonIndex: 0
			},
			buttonIndex => {
				if (buttonIndex === 1) {
					this.openCamera();
				} else if (buttonIndex) {
					this.openGallery();
				}
			}
		);
	}

	openImageOptions(index) {
		this.props.showActionSheetWithOptions(
			{
				options: ['Cancelar', 'Apagar'],
				cancelButtonIndex: 0,
				destructiveButtonIndex: 1
			},
			buttonIndex => {
				if (buttonIndex === 1) {
					this.removePhoto(index);
				}
			}
		);
	}

	removePhoto(index) {
		if (!!this.props.photos[index]) {
			this.props.onRemove(index);
		}
	}

	openGallery = async () => {
		const result = await ImagePicker.launchImageLibraryAsync({
			exif: true
		});

		this.props.onFinish(result);
	};

	openCamera = async () => {
		const result = await ImagePicker.launchCameraAsync({
			exif: true
		});
		this.props.onFinish(result);
	};
}

const styles = StyleSheet.create({
	contentGrid: {
		display: 'flex',
		flexDirection: 'row',
		marginBottom: 10,
		flexWrap: 'wrap'
	},
	grid: {
		width: IMAGE_WIDTH,
		height: IMAGE_HEIGHT,
		margin: 5,
		position: 'relative'
	},
	placeholder: {
		borderWidth: 5,
		borderColor: theme.primaryColor.color,
		borderStyle: 'dashed',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 10
	},
	icon: {
		color: theme.primaryColor.color,
		marginTop: 5,
		padding: 0
	}
});
