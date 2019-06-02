import { Platform } from 'expo-core';
import React from 'react';
import {
	DatePickerIOS,
	Modal,
	Text,
	TimePickerAndroid,
	TouchableWithoutFeedback,
	View
} from 'react-native';
import { theme } from '../../../../theme/mendes-light';
import { GetData } from '../../../../utils/get-data';
import { ButtonComponent } from '../../../button-component';

export class InputTimeRange extends React.Component {
	state = {
		field: '',
		isTimeModalVisible: false,
		chosenIOSTime: new Date(),
		timeFrom: null,
		timeTo: null
	};

	constructor(props) {
		super(props);
		this.setIOSDate = this.setIOSDate.bind(this);
	}

	componentDidUpdate() {}

	async open(field) {
		var placeholder =
			field === 'from'
				? this.state.timeFrom !== null
					? this.state.timeFrom
					: new Date()
				: this.state.timeTo !== null
				? this.state.timeTo
				: new Date();
		this.setState({ field, chosenIOSTime: placeholder });

		if (Platform.OS === 'android') {
			var {action, hour, minute} = await TimePickerAndroid.open({
				mode: 'clock',
				is24Hour: true,
				hour: placeholder.getHours(),
				minute: placeholder.getMinutes()
			});

			if (action !== TimePickerAndroid.dismissedAction) {
				var time = new Date();
				time.setHours(hour);
				time.setMinutes(minute)
				this.setState({
					chosenIOSTime: time
				});
				this.chosenIOSTime();
			}
		} else if (Platform.OS === 'ios') {
			this.openTimeModal();
		}
	}

	chosenIOSTime() {
		if (this.state.field === 'from') {
			this.setState({
				timeFrom: this.state.chosenIOSTime
			});
		} else if (this.state.field === 'to') {
			this.setState({
				timeTo: this.state.chosenIOSTime
			});
		}
		this.setState({
			isTimeModalVisible: false
		});
	}

	openTimeModal() {
		this.setState({ isTimeModalVisible: true });
	}

	closeTimeModal() {
		this.setState({ isTimeModalVisible: false });
	}

	setIOSDate(newDate) {
		this.setState({ chosenIOSTime: newDate });
	}

	render() {
		return (
			<View>
				<View style={{ display: 'flex', flexDirection: 'row' }}>
					<TouchableWithoutFeedback onPress={() => this.open('from')}>
						<View style={[theme.inputGroup, theme.inputRange]}>
							<Text style={theme.inputTextRange}>
								{this.state.timeFrom !== null
									? GetData.getTime(this.state.timeFrom)
									: this.props.placeholderFrom}
							</Text>
						</View>
					</TouchableWithoutFeedback>
					<View
						style={[
							theme.inputGroupLabelTimeRange,
							theme.inputGroupLabel
						]}
					>
						<Text style={theme.inputGroupLabelText}>às</Text>
					</View>
					<TouchableWithoutFeedback onPress={() => this.open('to')}>
						<View style={[theme.inputGroup, theme.inputRange]}>
							<Text style={theme.inputTextRange}>
								{this.state.timeTo !== null
									? GetData.getTime(this.state.timeTo)
									: this.props.placeholderTo}
							</Text>
						</View>
					</TouchableWithoutFeedback>
				</View>
				{Platform.OS === 'ios' && (
					<Modal
						visible={this.state.isTimeModalVisible}
						transparent={true}
						animationType={'fade'}
					>
						<View style={theme.iosDateContentModal}>
							<View style={theme.iosDateModal}>
								<Text
									style={[
										{ textAlign: 'center' },
										theme.textSubheader
									]}
								>
									Selecione a hora
								</Text>
								<DatePickerIOS
									date={this.state.chosenIOSTime}
									onDateChange={this.setIOSDate}
									mode={'time'}
								/>
								<View
									style={{
										display: 'flex',
										flexDirection: 'row'
									}}
								>
									<View style={{ flex: 1, marginRight: 5 }}>
										<ButtonComponent
											onPress={() =>
												this.closeTimeModal()
											}
											status={'default'}
										>
											Cancelar
										</ButtonComponent>
									</View>
									<View style={{ flex: 1, marginLeft: 5 }}>
										<ButtonComponent
											onPress={() => this.chosenIOSTime()}
											primary
										>
											Confirmar
										</ButtonComponent>
									</View>
								</View>
							</View>
						</View>
					</Modal>
				)}
			</View>
		);
	}
}
