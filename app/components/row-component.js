import React from 'react';
import { View } from 'react-native';

export class RowComponent extends React.PureComponent {
	render() {
		return(<View style={{marginBottom: 15}}>{this.props.children}</View>);
	}
}