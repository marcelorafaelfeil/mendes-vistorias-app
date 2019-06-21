import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { theme } from '../../theme/mendes-light';
import PanelHeader from './panel-header';

export class Panel extends Component {
	render() {
		return (
			<View style={[theme.panelContent, {marginBottom: 15}]}>
				{this.props.children}
			</View>
		)
	}
}
