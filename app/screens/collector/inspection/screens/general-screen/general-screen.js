import React from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { Header } from '../../../includes/header/Header';

export class GeneralScreen extends React.Component {
    render() {
		return (
			<SafeAreaView>
				<Header>Home</Header>
				<Text>General Screen!</Text>
			</SafeAreaView>
		);
    }
}