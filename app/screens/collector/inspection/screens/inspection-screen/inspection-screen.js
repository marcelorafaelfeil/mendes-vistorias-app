import React from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { Header } from '../../../includes/header/Header';

export class InspectionScreen extends React.Component {
    render() {
		return (
			<SafeAreaView>
				<Header>Inspecionar</Header>
				<Text>Olá mundo!</Text>
			</SafeAreaView>
		);
    }
}