import React from 'react';
import { Platform } from 'expo-core';
import {
	View,
	Text,
	StyleSheet,
	DatePickerIOS,
	TimePickerAndroid
} from 'react-native';
import ThemeContext from '../../../../core/theme-context';

export class InputTimeRange extends React.PureComponent {
	static theme = ThemeContext;

	componentDidUpdate() {
		console.log('context: ', this.context.teste);
	}

	open() {
		TimePickerAndroid.open({
			mode: 'clock'
		});
	}
	render() {
		console.log('value: ', this.context.teste);
		return (
			<ThemeContext.Consumer>
				{({teste}) => (
					
					<Text>{teste}</Text>
				)}
			</ThemeContext.Consumer>
		);
	}
}

const styles = StyleSheet.create({
	inputText: {

	}
});