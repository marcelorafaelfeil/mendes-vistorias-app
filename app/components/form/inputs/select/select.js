import { Platform } from '@unimodules/core';
import React from 'react';
import { Text, TouchableHighlight, View, Modal, Picker } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { theme } from '../../../../theme/mendes-light';
import { ButtonComponent } from '../../../button-component';

export class Select extends React.Component {
	state = {
		isModalVisible: false,
		value: null,
		originalValue: null
	};

	componentWillMount() {
		const options = !!this.props.options ? this.props.options : null;
		if (!!options && !this.state.value) {
			this.setState({
				value: options[0]
			});
		}
		if (
			this.props.value !== undefined &&
			this.props.value !== null &&
			!!options
		) {
			const value = options.find(o => o.value === this.props.value);
			this.setState({ originalValue: value, value: value });
		}
	}

	openSelectOptions() {
		this.setState({
			isModalVisible: true
		});
	}

	selectOption() {
		if (!!this.props.onSelect) {
			this.props.onSelect(this.state.value.value);
		}
		this.setState({
			isModalVisible: false,
			originalValue: this.state.value
		});
	}

	closeModal() {
		this.setState({
			value: this.state.originalValue,
			isModalVisible: false
		});
	}

	renderPicker(options) {
		if (!!this.props.placeholder) {
			options.unshift({
				label: this.props.placeholder,
				value: null
			});
		}
		return (
			<Picker
				style={Platform.OS === 'android' ? theme.pickerAndroid : null}
				selectedValue={
					!!this.state.value ? this.state.value.value : null
				}
				onValueChange={(itemValue, itemIndex) => {
					this.setState(
						{
							value: options[itemIndex]
						},
						() => {
							if (Platform.OS === 'android') {
								this.selectOption();
							}
						}
					);
				}}
			>
				{options.map((o, index) => (
					<Picker.Item key={index} label={o.label} value={o.value} />
				))}
			</Picker>
		);
	}

	render() {
		const options = !!this.props.options ? this.props.options : [];
		return (
			<View>
				{Platform.OS === 'ios' ? (
					<View>
						<TouchableHighlight
							onPress={() => this.openSelectOptions()}
						>
							<View style={[theme.input, theme.select]}>
								<Text
									style={theme.primaryColor}
									numberOfLines={1}
								>
									{!!this.state.originalValue
										? this.state.originalValue.label
										: this.props.placeholder}
								</Text>
								<Icon
									name={
										Platform.OS === 'ios'
											? 'ios-arrow-down'
											: 'md-arrow-dropdown'
									}
									size={25}
									style={theme.selectIcon}
								/>
							</View>
						</TouchableHighlight>
						<Modal
							visible={this.state.isModalVisible}
							transparent={true}
							animationType={'fade'}
						>
							<View style={theme.contentModal}>
								<View style={theme.bodyModal}>
									<Text
										style={[
											{
												textAlign: 'center'
											},
											theme.textSubheader
										]}
									>
										{!!this.props.modalTitle
											? this.props.modalTitle
											: 'Selecione a opção desejada'}
									</Text>
									{this.renderPicker(options)}
									<View
										style={{
											display: 'flex',
											flexDirection: 'row'
										}}
									>
										<View
											style={{ flex: 1, marginRight: 5 }}
										>
											<ButtonComponent
												status={'default'}
												onPress={() =>
													this.closeModal()
												}
											>
												Cancelar
											</ButtonComponent>
										</View>
										<View
											style={{ flex: 1, marginLeft: 5 }}
										>
											<ButtonComponent
												primary
												onPress={() =>
													this.selectOption()
												}
											>
												Confirmar
											</ButtonComponent>
										</View>
									</View>
								</View>
							</View>
						</Modal>
					</View>
				) : (
					<View style={theme.pickerAndroidContainer}>
						{this.renderPicker(options)}
					</View>
				)}
			</View>
		);
	}
}
