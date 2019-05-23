import React from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { Header } from '../../../includes/header/Header';

export class RecomendationScreen extends React.Component {
	render() {
		return (
			<SafeAreaView>
				<Header>Home</Header>
				<Text>Recomendation Screen!</Text>
			</SafeAreaView>
		);
	}
}
