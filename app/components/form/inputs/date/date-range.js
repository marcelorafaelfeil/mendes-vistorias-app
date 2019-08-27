import { Platform } from '@unimodules/core';
import moment from 'moment';
import React from 'react';
import { DatePickerAndroid, DatePickerIOS, Modal, Text, TimePickerAndroid, TouchableWithoutFeedback, View } from 'react-native';
import { theme } from '../../../../theme/mendes-light';
import { GetData } from '../../../../utils/get-data';
import { ButtonComponent } from '../../../button-component';

export class DateRange extends React.Component {

	state = {
		field: '',
		isTimeModalVisible: false,
		chosenDate: new Date(),
		dateFrom: null,
		dateTo: null,
		dateFromValue: '',
		dateToValue: ''
	};

	constructor(props) {
		super(props);
		this.setDate = this.setDate.bind(this);
	}

	componentWillMount() {
		this.setState({
			dateFrom: !!this.props.valueFrom ? GetData.numberInHoursToDate(this.props.valueFrom) : null,
			dateTo: !!this.props.valueTo ? GetData.numberInHoursToDate(this.props.valueTo) : null
		});
	}

	async open(field) {
		var placeholder =
			field === 'from'
				? this.state.dateFrom !== null
					? this.state.dateFrom
					: new Date()
				: this.state.dateTo !== null
					? this.state.dateTo
					: new Date();
		this.setState({ field, chosenDate: placeholder });

		if (Platform.OS === 'android') {
			const dateOptions = {
				date: new Date()
			};
			if (!!this.state.dateTo) {
				dateOptions.maxDate = this.state.dateTo;
			}
			if (!!this.state.dateFrom) {
				dateOptions.minDate = this.state.dateFrom;
			}
			var { action, year, month, day } = await DatePickerAndroid.open(dateOptions);

			if (action !== DatePickerAndroid.dismissedAction) {
				if (this.props.mode === 'datetime') {
					var { action, hour, minute } = await TimePickerAndroid.open({
						mode: 'clock',
						is24Hour: true,
						hour: placeholder.getHours(),
						minute: placeholder.getMinutes()
					});
				}

				if (action !== TimePickerAndroid.dismissedAction) {
					var date = new Date(year, month, day, !!hour ? hour : 0, !!minute ? minute : 0);
					this.setState({
						chosenDate: date
					});
					this.chosenDate();
					this.setState({
						value: moment(date).format(this.props.mode === 'datetime' ? 'DD/MM/YYYY HH:mm' : 'DD/MM/YYYY'),
						chosenIOSDate: date
					});
					if (!!this.props.onChangeCalendar) {
						this.props.onChangeCalendar(this.state.chosenIOSDate);
					}
				}
			}
		} else if (Platform.OS === 'ios') {
			this.openTimeModal();
		}
	}

	chosenDate() {
		if (this.state.field === 'from') {
			this.setState({
				dateFrom: this.state.chosenDate,
				dateFromValue: moment(this.state.chosenDate).format(this.props.mode === 'datetime' ? 'DD/MM/YYYY HH:mm' : 'DD/MM/YYYY'),
			});
			if (!!this.props.onChangeFrom) {
				this.props.onChangeFrom(this.state.chosenDate);
			}
		} else if (this.state.field === 'to') {
			this.setState({
				dateTo: this.state.chosenDate,
				dateToValue: moment(this.state.chosenDate).format(this.props.mode === 'datetime' ? 'DD/MM/YYYY HH:mm' : 'DD/MM/YYYY'),
			});
			if (!!this.props.onChangeTo) {
				this.props.onChangeTo(this.state.chosenDate);
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
		this.setState({ chosenDate: newDate });
	}

	render() {
		return (
			<View>
				<View style={theme.inputGroup}>
					<TouchableWithoutFeedback onPress={() => this.open('from')}>
						<View style={[theme.inputGroupItem, theme.inputRange]}>
							<Text style={theme.inputTextRange}>
								{this.state.dateFrom !== null
									? this.state.dateFromValue
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
						<Text style={theme.inputGroupLabelText}>até</Text>
					</View>
					<TouchableWithoutFeedback onPress={() => this.open('to')}>
						<View style={[theme.inputGroupItem, theme.inputRange]}>
							<Text style={theme.inputTextRange}>
								{this.state.dateTo !== null
									? this.state.dateToValue
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
						<View style={theme.contentModal}>
							<View style={theme.bodyModal}>
								<Text
									style={[
										{ textAlign: 'center' },
										theme.textSubheader
									]}
								>
									Selecione a hora
								</Text>
								<DatePickerIOS
									date={this.state.chosenDate}
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
											onPress={() => this.chosenDate()}
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