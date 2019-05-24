import React from 'react';
import { SafeAreaView } from 'react-native';
import { Platform } from 'expo-core';

export class CustomSafeView extends React.PureComponent {
	render() {
		return (
			<SafeAreaView
				style={{
					flex: 1,
					paddingTop: Platform.OS === 'android' ? 10 : 0,
					backgroundColor: '#f6f6f6'
				}}
			>
				{this.props.children}
			</SafeAreaView>
		);
	}
}
