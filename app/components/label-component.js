import React from 'react';
import { Text } from 'react-native';

export class LabelComponent extends React.PureComponent {
	state = {
		loaded: false
	};

	async componentWillMount() {
		this.setState({
			lodade: true
		});
	}

	render() {
		return (
			<Text
				style={{
					fontFamily: 'OpenSansSemiBold',
					textTransform: 'uppercase',
					fontSize: 10,
					color: '#CCC'
				}}
			>
				{this.props.children}
			</Text>
		);
	}
}