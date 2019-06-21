import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { theme } from '../../theme/mendes-light';

export class PanelBody extends Component {
	render() {
		return (
			<View style={theme.panel}>
				{this.props.children}
			</View>
		)
	}
}
