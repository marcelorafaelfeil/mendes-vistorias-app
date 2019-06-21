import { ImagePicker } from 'expo';
import { Platform } from '@unimodules/core';
import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { theme } from '../../../../../../theme/mendes-light';

export class InspectionPhotoPlaceholderComponent extends Component {
	render() {
		return (
			<View style={styles.content}>
				<TouchableOpacity style={{width: '100%'}} onPress={() => this.openCamera()}>
					<View style={[styles.button, { marginBottom: 15 }]}>
						<View>
							<Icon
								name={
									(Platform.OS === 'ios' ? 'ios' : 'md') +
									'-camera'
								}
								size={100}
								style={styles.icon}
							/>
						</View>
						<View>
							<Text>Tirar fotos</Text>
						</View>
					</View>
				</TouchableOpacity>
				<TouchableOpacity style={{width: '100%'}} onPress={() => this.openGallery()}>
					<View style={[styles.button, { marginTop: 15 }]}>
						<View>
							<Icon
								name={
									(Platform.OS === 'ios' ? 'ios' : 'md') +
									'-image'
								}
								size={100}
								style={styles.icon}
							/>
						</View>
						<View>
							<Text>Adicionar fotos da galeria</Text>
						</View>
					</View>
				</TouchableOpacity>
			</View>
		);
	}

	openGallery = async () => {
		const result = await ImagePicker.launchImageLibraryAsync({
			exif: true
		});

		this.props.onFinish(result);
	}

	openCamera = async () => {
		const result = await ImagePicker.launchCameraAsync({
			exif: true
		});
		this.props.onFinish(result);
	}
}

const styles = StyleSheet.create({
	content: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingLeft: 30,
		paddingRight: 30
	},
	button: {
		width: '100%',
		borderWidth: 5,
		borderColor: theme.primaryColor.color,
		borderStyle: 'dashed',
		padding: 15,
		alignItems: 'center',
		borderRadius: 10
	},
	icon: {
		color: theme.primaryColor.color
	}
});
