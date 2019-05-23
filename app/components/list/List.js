import React from 'react';
import { View, StyleSheet } from 'react-native';

export class List extends React.Component {
	render() {
		return (
			<View style={styles.content}>
				{this.props.children}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	content: {
		backgroundColor: '#FFF'
	}
})