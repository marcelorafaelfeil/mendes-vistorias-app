import React from 'react';
import { Text } from 'react-native';
import { CustomSafeView } from '../../../../../components/custom-safe-view';
import { Header } from '../../../includes/header/header';

export class RecomendationScreen extends React.Component {
	render() {
		return (
			<CustomSafeView>
				<Header>Home</Header>
				<Text>Recomendation Screen!</Text>
			</CustomSafeView>
		);
	}
}
