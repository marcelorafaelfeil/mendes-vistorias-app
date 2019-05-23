import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { Text, View } from 'react-native';

export class CircleIcon extends React.Component {
	render() {
		const { title, focused, name, size } = this.props;
		return (
			<View
				style={{
					width: 56,
					height: 56,
					margin: 5,
					marginTop: -8,
					backgroundColor: focused ? '#049778' : '#07E5B7',
					borderRadius: '100%',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<Icon name={name} size={size} color='#FFFFFF' style={{marginTop: -5}} />
				<Text numberOfLines={1} style={{ fontSize: 10, color: '#FFFFFF', marginTop: -5 }}>
					{title}
				</Text>
			</View>
		);
	}
}