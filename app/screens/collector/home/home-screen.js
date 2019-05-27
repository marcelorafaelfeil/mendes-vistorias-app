import React from 'react';
import { Text } from 'react-native';
import { CustomSafeView } from '../../../components/custom-safe-view';
import { Header } from '../includes/header/header';

export class HomeScreen extends React.Component {
	static navigationOptions = {
		header: null
	};

	render() {
		return (
			<CustomSafeView>
				<Header>TESTEEE</Header>
				<Text>Home Screen</Text>
			</CustomSafeView>
		);
	}
}
