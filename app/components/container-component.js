import React from 'react';
import { View } from 'react-native';

export class ContainerComponent extends React.PureComponent {
	render() {
		return (
			<View style={{ paddingLeft: 15, paddingRight: 15 }}>
				{this.props.children}
			</View>
		);
	}
}
