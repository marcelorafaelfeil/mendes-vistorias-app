import React from 'react';
import { TouchableHighlight, Text } from 'react-native';
export class ButtonComponent extends React.PureComponent {
	render() {
		return (
			<TouchableHighlight
				style={{
					borderRadius: 5,
					backgroundColor: '#2699FB',
					paddingTop: 13,
					paddingBottom: 13,
					paddingLeft: 13,
					paddingRight: 13,
					alignItems: 'center',
					flex: 1
				}}
				{...this.props}
			>
				<Text
					style={{
						fontFamily: 'Roboto',
						fontSize: 12,
						textTransform: 'uppercase',
						color: '#FFF'
					}}
				>
					{this.props.children}
				</Text>
			</TouchableHighlight>
		);
	}
}
