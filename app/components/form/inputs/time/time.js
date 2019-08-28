import { Platform } from '@unimodules/core';
import React from 'react';
import { Text, TimePickerAndroid, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { theme } from '../../../../theme/mendes-light';
import { GetData } from '../../../../utils/get-data';

export class Time extends React.Component {
	date = null;
	state = {
		time: null,
		chosenTime: new Date()
	}

	componentWillMount = function() {
		if (!!this.props.value) {
			const value = GetData.numberInHoursToDate(this.props.value);
			this.setState({time: value});
		}
	}

	async open() {
		var placeholder = this.state.time !== null ? this.state.time : new Date();

		this.setState({ chosenTime: placeholder });

		if (Platform.OS === 'android') {
			var { action, hour, minute } = await TimePickerAndroid.open({
				mode: 'clock',
				is24Hour: true,
				hour: !!this.state.time ? this.state.time.getHours() : placeholder.getHours(),
				minute: !!this.state.time ? this.state.time.getMinutes() : placeholder.getMinutes()
			});

			if (action !== TimePickerAndroid.dismissedAction) {
				var time = new Date();
				time.setHours(hour);
				time.setMinutes(minute);
				this.setState({
					chosenTime: time
				});
				this.chosenTime();
			}
		} else if (Platform.OS === 'ios') {
			this.openTimeModal();
		}
	}

	chosenTime() {
		this.setState({
			time: this.state.chosenTime
		});
		if (!!this.props.onChange) {
			this.props.onChange(this.state.chosenTime);
		}
		this.setState({
			isTimeModalVisible: false
		});
	}

	render() {
		return (
			<TouchableWithoutFeedback onPress={() => this.open()}>
				<View style={[theme.inputGroupItem, theme.inputRange]}>
					<Text style={theme.inputTextRange}>
						{this.state.time !== null
							? GetData.getTime(this.state.time)
							: this.props.placeholder}
					</Text>
				</View>
			</TouchableWithoutFeedback>
		);
	}
}