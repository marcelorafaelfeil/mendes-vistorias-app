import { Platform } from 'expo-core';
import React from 'react';
import {
	DatePickerAndroid,
	DatePickerIOS,
	Modal,
	Text,
	TouchableWithoutFeedback,
	View
} from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import Icon from 'react-native-vector-icons/Ionicons';
import { theme } from '../../../../theme/mendes-light';
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
		this.setState({
			chosenIOSDate: !!this.props.valueAsDate ? this.props.valueAsDate : new Date(),
			value: !!this.props.valueAsDate ? this.props.valueAsDate.toLocaleDateString() : ''
		});
	}

	async openCalendar() {
		if (Platform.OS === 'android') {
			var { action, year, month, day } = await DatePickerAndroid.open({
				maxDate: new Date(),
				date: new Date()
			});

			if (action !== DatePickerAndroid.dismissedAction) {
				var date = new Date(year, month, day);
				this.setState({
					value: date.toLocaleDateString(),
					chosenIOSDate: date
				});
				if (!!this.props.onChange) {
					this.props.onChange(this.state.chosenIOSDate);
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
			value: this.state.chosenIOSDate.toLocaleDateString()
		});
		if (!!this.props.onChange) {
			this.props.onChange(this.state.chosenIOSDate);
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
							options={{
								format: 'DD/MM/YYYY'
							}}
							value={this.state.value}
							onChangeText={text => {
								this.setState({
									value: text
								});
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
						<View style={theme.selectContentModal}>
							<View style={theme.selectModal}>
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
									mode={'date'}
									maximumDate={new Date()}
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
