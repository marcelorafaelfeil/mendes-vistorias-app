import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { View, Text, StyleSheet } from 'react-native'
import { Platform } from '@unimodules/core';

export class Empty extends React.Component {
	render() {
		return(
			<View style={styles.content}>
				<Icon style={styles.icon} name={(Platform.OS === 'ios' ? 'ios' : 'md') + '-filing'} size={100}></Icon>
				<Text style={styles.title}>Caixa de pendências vazia</Text>
				<Text style={styles.description}>
					Ainda não existe solicitações de inspeções para você.
				</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	content: {
		marginTop: 50,
		justifyContent: 'center',
		alignItems: 'center'
	},
	icon: {
		color: '#DDD'
	},
	title: {
		fontWeight: 'bold',
		textAlign: 'center'
	},
	description: {
		marginTop: 15,
		textAlign: 'center',
		color: '#AAA'
	}
})