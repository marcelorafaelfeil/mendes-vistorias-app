import React from 'react';
import { SafeAreaView } from 'react-native';
import { Platform } from 'expo-core';
import { theme } from '../theme/mendes-light';

export class CustomSafeView extends React.PureComponent {
	render() {
		return (
			<SafeAreaView
				style={{
					flex: 1,
					paddingTop: Platform.OS === 'android' ? 20 : 0,
					backgroundColor: theme.appContent.backgroundColor
				}}
			>
				{this.props.children}
			</SafeAreaView>
		);
	}
}
