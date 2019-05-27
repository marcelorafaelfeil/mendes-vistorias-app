import React from 'react';
import { Text } from 'react-native';
import { Header } from '../../../includes/header/header';

export class RisksScreen extends React.Component {
	render() {
		return (
			<CustomSafeView>
				<Header>Home</Header>
				<Text>Risks Screen!</Text>
			</CustomSafeView>
		);
	}
}
