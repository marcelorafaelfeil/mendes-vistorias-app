import React from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { Header } from '../../../includes/header/Header';

export class HomeScreen extends React.Component {
	render() {
		return (
			<SafeAreaView>
				<Header>Home</Header>
				<Text>Olá mundo!</Text>
			</SafeAreaView>
		);
	}
}
