import React from 'react';
import { View, ActivityIndicator } from 'react-native';

export class CustomActivityIndicatorComponent extends React.Component {
	render() {
		return (
			<View
				style={{
					flex: 1,
					justifyContent: 'center',
					alignItems: 'center'
				}}
			>
				<ActivityIndicator size='large' color='#0c9' />
			</View>
		);
	}
}
