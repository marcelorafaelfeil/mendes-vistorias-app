import React from 'react';
import { TextInput } from 'react-native';
import { theme } from '../../../../theme/mendes-light';

export class InputText extends React.PureComponent {
	render() {
		return (<TextInput {...this.props} placeholderTextColor={theme.inputPlaceholder.color} style={[theme.input, { textAlign: (!!this.props.align) ? this.props.align : 'left', height: (!!this.props.autoGrow) ? theme.minHeight : 'auto' }]} />);
	}
}
