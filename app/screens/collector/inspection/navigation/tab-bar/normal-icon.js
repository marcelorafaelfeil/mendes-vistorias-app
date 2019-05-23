import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { Text, View } from 'react-native';

export class NormalIcon extends React.Component {
	render() {
		const { title, name, color, size } = this.props;
		return (
			<View
				style={{
					margin: 5,
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<Icon name={name} size={size} color={color} />
				<Text numberOfLines={1} style={{ fontSize: 10 }}>
					{title}
				</Text>
			</View>
		);
	}
}