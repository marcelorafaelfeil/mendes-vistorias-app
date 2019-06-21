import { Platform } from '@unimodules/core';
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
import { Time } from './time';

export class InputTimeRange extends React.Component {
	state = {
		field: '',
		isTimeModalVisible: false,
		chosenTime: new Date(),
		timeFrom: null,
		timeTo: null
	};

	constructor(props) {
		super(props);
		this.setDate = this.setDate.bind(this);
	}

	componentWillMount() {
		this.setState({
			timeFrom: !!this.props.valueFrom ? GetData.numberInHoursToDate(this.props.valueFrom) : null,
			timeTo: !!this.props.valueTo ? GetData.numberInHoursToDate(this.props.valueTo) : null
		});
	}

	async open(field) {
		var placeholder =
			field === 'from'
				? this.state.timeFrom !== null
					? this.state.timeFrom
					: new Date()
				: this.state.timeTo !== null
				? this.state.timeTo
				: new Date();
		this.setState({ field, chosenTime: placeholder });

		if (Platform.OS === 'android') {
			var { action, hour, minute } = await TimePickerAndroid.open({
				mode: 'clock',
				is24Hour: true,
				hour: placeholder.getHours(),
				minute: placeholder.getMinutes()
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
		if (this.state.field === 'from') {
			this.setState({
				timeFrom: this.state.chosenTime
			});
			if (!!this.props.onChangeFrom) {
				this.props.onChangeFrom(new Time(this.state.chosenTime));
			}
		} else if (this.state.field === 'to') {
			this.setState({
				timeTo: this.state.chosenTime
			});
			if (!!this.props.onChangeTo) {
				this.props.onChangeTo(new Time(this.state.chosenTime));
			}
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
 
	setDate(newDate) {
		this.setState({ chosenTime: newDate });
	}

	render() { 
		return (
			<View>
				<View style={theme.inputGroup}>
					<TouchableWithoutFeedback onPress={() => this.open('from')}>
						<View style={[theme.inputGroupItem, theme.inputRange]}>
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
						<View style={[theme.inputGroupItem, theme.inputRange]}>
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
						<View style={theme.selectContentModal}>
							<View style={theme.selectModal}>
								<Text
									style={[
										{ textAlign: 'center' },
										theme.textSubheader
									]}
								>
									Selecione a hora
								</Text>
								<DatePickerIOS
									date={this.state.chosenTime}
									onDateChange={this.setDate}
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
											onPress={() => this.chosenTime()}
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
