import React from 'react';
import { TouchableHighlight, Text } from 'react-native';
import PropTypes from 'prop-types';

export class ButtonComponent extends React.Component {

	static propTypes = {
		status: PropTypes.oneOf(['success', 'danger', 'warning', 'info', 'default'])
	}

	backgroundColor(props) {
		if (!!props.primary) {
			return 'rgb(12, 254, 204)';
		} else if (!!props.status) {
			if (props.status === 'danger') {
				
			} else if (props.status === 'info') {
				return '#2699FB';
			} else if (props.status === 'default') {
				return '#C6DED9';
			}
		} else {
			return '#2699FB';
		}
	}

	render() {
		return (
			<TouchableHighlight
				style={{
					borderRadius: 5,
					backgroundColor: this.backgroundColor(this.props),
					paddingTop: 13,
					paddingBottom: 13,
					paddingLeft: 13,
					paddingRight: 13,
				}}
				{...this.props}
			>
				<Text
					style={{
						fontFamily: 'Roboto',
						fontSize: 12,
						textTransform: 'uppercase',
						color: '#FFF',
						textAlign: 'center'
					}}
				>
					{this.props.children}
				</Text>
			</TouchableHighlight>
		);
	}
}