import React from 'react';
import { Text, View, StyleSheet, SafeAreaView } from 'react-native';

export class Header extends React.Component {
	render() {
		return(
			<View style={[styles.contentHeader, {paddingBottom: (!!this.props.noPaddingBottom) ? 0 : 10}]}>
				<Text style={styles.textHeader}>{this.props.children}</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	contentHeader: {
		paddingTop: 10,
	},
	textHeader: {
		fontFamily: 'Roboto',
		fontSize: 16,
		fontWeight: 'bold',
		textTransform: 'uppercase',
		textAlign: 'center',
		color: '#0CFECC'
	}
});