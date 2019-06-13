import React from 'react';
import { SafeAreaView } from 'react-native';
import { Platform } from 'expo-core';

export class CustomSafeView extends React.PureComponent {
	render() {
		return (
			<SafeAreaView
				style={{
					paddingTop: Platform.OS === 'android' ? 20 : 0,
					backgroundColor: '#f6f6f6'
				}}
			>
				{this.props.children}
			</SafeAreaView>
		);
	}
}
