import React from 'react';
import { View, Text } from 'react-native';
import { Header } from '../includes/header/Header';

export class HomeScreen extends React.Component {
	static navigationOptions = {
		header: null
	};

	render() {
		return (
			<View>
				<Header>TESTEEE</Header>
				<Text>Home Screen</Text>
			</View>
		);
	}
}
