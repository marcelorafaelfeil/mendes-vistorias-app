import React from 'react';
import { View } from 'react-native';

export class PanelComponent extends React.PureComponent {
	render() {
		return(
			<View style={{
				padding: 10,
				marginTop: 5,
				backgroundColor: '#FFFFFF',
			}}>
				{this.props.children}
			</View>
		);
	}
}