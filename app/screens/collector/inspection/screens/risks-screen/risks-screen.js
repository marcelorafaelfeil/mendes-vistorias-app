import React from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { Header } from '../../../includes/header/header';

export class RisksScreen extends React.Component {
	render() {
		return (
			<SafeAreaView>
				<Header>Home</Header>
				<Text>Risks Screen!</Text>
			</SafeAreaView>
		);
	}
}
