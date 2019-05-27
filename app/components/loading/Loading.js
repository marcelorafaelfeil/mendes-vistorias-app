import React from 'react';
import { View, Text } from 'react-native';

export class Loading extends React.Component {
	render() {
		return (
			<View
				style={{
					flex: 1,
					justifyContent: 'center',
					alignItems: 'center'
				}}
			>
				<Text>Carregando...</Text>
			</View>
		);
	}
}
