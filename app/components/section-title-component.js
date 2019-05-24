import React from 'react';
import { Text } from 'react-native';

export class SectionTitleComponent extends React.PureComponent {
	render() {
		return (
			<Text style={{ fontFamily: 'OpenSansSemiBold', fontSize: 14, color: '#A8A8A8' }}>
				{this.props.children}
			</Text>
		);
	}
}
