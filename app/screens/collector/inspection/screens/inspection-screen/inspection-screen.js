import React from 'react';
import { Text } from 'react-native';
import { CustomSafeView } from '../../../../../components/custom-safe-view';
import { Header } from '../../../includes/header/header';

export class InspectionScreen extends React.Component {
	render() {
		return (
			<CustomSafeView>
				<Header>Inspecionar</Header>
				<Text>Olá mundo!</Text>
			</CustomSafeView>
		);
	}
}
