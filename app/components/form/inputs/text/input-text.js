import React from 'react';
import { TextInput } from 'react-native';
import { theme } from '../../../../theme/mendes-light';

export class InputText extends React.PureComponent {
	render() {
		return <TextInput {...this.props} placeholderTextColor={theme.input.color} style={theme.input} />;
	}
}
