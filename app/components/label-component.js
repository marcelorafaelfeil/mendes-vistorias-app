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
					fontFamily: 'Roboto',
					fontSize: 9,
					textTransform: 'uppercase',
					color: '#CCC',
					paddingBottom: 2
				}}
				numberOfLines={1}
			>
				{this.props.children.toUpperCase()}
			</Text>
		);
	}
}