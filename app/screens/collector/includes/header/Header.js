import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Settings } from './settings';

export class Header extends React.Component {
	componentWillMount() {
		
	}

	render() {
		return (
			<View
				style={[
					styles.contentHeader,
					{ paddingBottom: !!this.props.noPaddingBottom ? 0 : 10 }
				]}
			>
				<Text style={styles.textHeader}>{this.props.children}</Text>
				{!!this.props.showSettings && (
					<View style={styles.iconSettings}>
						<Settings />
					</View>
				)}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	contentHeader: {
		paddingTop: 10,
		display: 'flex',
		flexDirection: 'row'
	},
	textHeader: {
		flex: 1,
		fontFamily: 'Roboto',
		fontSize: 16,
		fontWeight: 'bold',
		textTransform: 'uppercase',
		textAlign: 'center',
		color: '#0CFECC'
	},
	iconSettings: {
		marginTop: -5
	},
	closeButton: {
		marginLeft: 10
	}
});
