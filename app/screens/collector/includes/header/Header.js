import React from 'react';
import { Text, View, StyleSheet, SafeAreaView } from 'react-native';

export class Header extends React.Component {
	render() {
		return(
			<SafeAreaView>
				<View style={styles.contentHeader}>
					<Text style={styles.textHeader}>{this.props.children}</Text>
				</View>
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	contentHeader: {
		paddingTop: 10,
		paddingBottom: 10
	},
	textHeader: {
		fontFamily: 'Arial',
		fontSize: 16,
		fontWeight: 'bold',
		textTransform: 'uppercase',
		textAlign: 'center',
		color: '#0CFECC'
	}
});