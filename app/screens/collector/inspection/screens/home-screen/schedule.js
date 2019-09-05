import React from 'react';
import { Text, View } from 'react-native';
import { ButtonComponent } from '../../../../../components/button-component';
import { theme } from '../../../../../theme/mendes-light';

export class Schedule extends React.Component {
	render() {
		return (
			<View style={theme.row}>
				<View style={theme.column}>
					<ButtonComponent>Agendar Horário</ButtonComponent>
				</View>
			</View>
		);
	}
}
