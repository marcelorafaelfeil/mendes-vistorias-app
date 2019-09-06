import { Platform } from '@unimodules/core';
import moment from 'moment';
import React from 'react';
import {
	DatePickerAndroid,
	DatePickerIOS,
	Modal,
	Text,
	TouchableWithoutFeedback,
	View,
	TimePickerAndroid
} from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import Icon from 'react-native-vector-icons/Ionicons';
import { theme } from '../../../../theme/mendes-light';
import { GetData } from '../../../../utils/get-data';
import { ButtonComponent } from '../../../button-component';

export class InputDate extends React.PureComponent {
	state = {
		value: '',
		chosenIOSDate: new Date(),
		isModalVisible: false
	};

	constructor(props) {
		super(props);
		this.setIOSDate = this.setIOSDate.bind(this);
	}

	componentWillMount() {
		var value;
		if (!!this.props.valueAsInteger || this.props.valueAsString) {
			value = new Date(
				!!this.props.valueAsInteger
					? this.props.valueAsInteger
					: this.props.valueAsString
			);
		} else if (!!this.props.valueAsDate) {
			value = this.props.valueAsDate;
		}
		this.setState({
			chosenIOSDate: !!value ? value : new Date(),
			value: !!value
				? moment(value).format(
						this.props.mode === 'datetime'
							? 'DD/MM/YYYY HH:mm'
							: 'DD/MM/YYYY'
				  )
				: ''
		});
	}

	async openCalendar() {
		if (Platform.OS === 'android') {
			const dateOptions = {
				date: new Date()
			}
			if (!!this.props.maxDate) {
				dataOptions.maxDate = this.props.maxDate;
			}
			var { action, year, month, day } = await DatePickerAndroid.open();

			if (action !== DatePickerAndroid.dismissedAction) {
				if (this.props.mode === 'datetime') {
					var {
						action,
						hour,
						minute
					} = await TimePickerAndroid.open();
				}

				if (action !== TimePickerAndroid.dismissedAction) {
					var date = new Date(
						year,
						month,
						day,
						!!hour ? hour : 0,
						!!minute ? minute : 0
					);
					this.setState({
						value: moment(date).format(
							this.props.mode === 'datetime'
								? 'DD/MM/YYYY HH:mm'
								: 'DD/MM/YYYY'
						),
						chosenIOSDate: date
					});
					if (!!this.props.onChangeCalendar) {
						this.props.onChangeCalendar(this.state.chosenIOSDate);
					}
				}
			}
		} else if (Platform.OS === 'ios') {
			this.openIOSModal();
		}
	}

	openIOSModal() {
		this.setState({
			isModalVisible: true
		});
	}

	closeModal() {
		this.setState({
			isModalVisible: false
		});
	}

	chosenIOSDate() {
		this.setState({
			value: moment(this.chosenIOSDate).format('DD/MM/YYYY')
		});
		if (!!this.props.onChangeCalendar) {
			this.props.onChangeCalendar(this.state.chosenIOSDate);
		}
		this.closeModal();
	}

	setIOSDate(newDate) {
		this.setState({ chosenIOSDate: newDate });
	}

	render() {
		return (
			<View>
				<View style={theme.inputGroup}>
					<TouchableWithoutFeedback
						onPress={() => this.openCalendar()}
					>
						<View style={[theme.inputGroupLabelIcon]}>
							<Icon
								name={
									(Platform.OS === 'ios' ? 'ios' : 'md') +
									'-calendar'
								}
								size={25}
								style={theme.inputGroupLabelText}
							/>
						</View>
					</TouchableWithoutFeedback>
					<View style={theme.inputGroupItem}>
						<TextInputMask
							type={'datetime'}
							returnKeyType={'done'}
							keyboardType={
								Platform.OS === 'ios' ? 'number-pad' : 'numeric'
							}
							options={{
								format:
									this.props.mode === 'datetime'
										? 'DD/MM/YYYY HH:mm'
										: 'DD/MM/YYYY'
							}}
							value={this.state.value}
							onChangeText={text => {
								this.setState({
									value: text
								});
								if (!!this.props.onChangeManual) {
									this.props.onChangeManual(
										GetData.stringToDate(text)
									);
								}
							}}
							style={theme.input}
							{...this.props}
						/>
					</View>
				</View>
				{Platform.OS === 'ios' && (
					<Modal
						visible={this.state.isModalVisible}
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
									Selecione a data
								</Text>
								<DatePickerIOS
									date={this.state.chosenIOSDate}
									onDateChange={this.setIOSDate}
									mode={this.props.mode}
									maximumDate={!!this.props.maxDate ? this.props.maxDate : null}
									locale={'pt-BR'}
								/>
								<View
									style={{
										display: 'flex',
										flexDirection: 'row'
									}}
								>
									<View style={{ flex: 1, marginRight: 5 }}>
										<ButtonComponent
											onPress={() => this.closeModal()}
											status={'default'}
										>
											Cancelar
										</ButtonComponent>
									</View>
									<View style={{ flex: 1, marginLeft: 5 }}>
										<ButtonComponent
											onPress={() => this.chosenIOSDate()}
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
