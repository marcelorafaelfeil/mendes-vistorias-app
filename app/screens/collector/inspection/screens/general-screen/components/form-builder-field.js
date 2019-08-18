import React from 'react';
import { Text, View } from 'react-native';
import { InputText } from '../../../../../../components/form/inputs/text/input-text';
import { Select } from '../../../../../../components/form/inputs/select/select';
import { InputTimeRange } from '../../../../../../components/form/inputs/time/input-time-range';
import { InputDate } from '../../../../../../components/form/inputs/date/input-date';
import { theme } from '../../../../../../theme/mendes-light';

export class FormBuilderField extends React.Component {

	rangeValue = {
		from: null,
		to: null
	}
	state = {
		value: ''
	}

	textField(attrs) {
		return (<InputText
			value={this.props.value}
			onChangeText={(value) => { this.props.onChange(attrs, value) }}
		/>);
	}

	largeTextField(attrs) {
		return (<InputText
			value={this.props.value}
			onChangeText={(value) => { this.props.onChange(attrs, value) }}
			multiline={true}
			autoGrow={true}
		/>);
	}

	numericField(attrs) {
		return (<InputText
			keyboardType={'decimal-pad'}
			onChangeText={(value) => {this.setState({ value }); this.props.onChange(attrs, value) }}
			value={this.state.value}
			mask={'numeric'}
			align={'center'}
		/>);
	}

	moneyField(attrs) {
		return (<View style={theme.inputGroup}>
			<View style={[theme.inputGroupLabel]}>
				<Text
					style={[
						theme.inputGroupLabelText,
						{ fontSize: 20, fontWeight: 'bold' }
					]}
				>
					R$
				</Text>
			</View>
			<View style={theme.inputGroupItem}>
				<InputText
					align={'center'}
					keyboardType={'numeric'}
					mask={'currency'}
					caretHidden={true}
					value={this.state.value}
					onChangeText={(value) => { this.setState({ value }); this.props.onChange(attrs, value) }}
				/>
			</View>
		</View>);
	}

	metricField(attrs) {
		return (
			<InputText
				align={'center'}
				keyboardType={'numeric'}
				mask={'metric'}
				value={this.state.value}
				onChangeText={(value) => { this.setState({ value }); this.props.onChange(attrs, value) }}
			/>);
	}

	emailField(attrs) {
		return (<InputText
			onChangeText={(value) => { this.props.onChange(attrs, value) }}
			keyboardType={'email-address'}
			autoCompleteType={'email'}
			autoCapitalize={'none'}
			value={this.props.value}
		/>);
	}

	urlField(attrs) {
		return (<InputText
			onChangeText={(value) => { this.props.onChange(attrs, value) }}
			keyboardType={'url'}
			autoCapitalize={'none'}
			textContentType={'URL'}
			keyboardApparence={'dark'}
			value={this.props.value}
		/>);
	}

	listField(attrs) {
		const options = [];
		if (!!attrs.options) {
			for (var i = 0; i < attrs.options.length; i++) {
				options.push({
					label: attrs.options[i].value,
					value: attrs.options[i].id,
				})
			}
		}
		return (<Select
			options={options}
			value={this.props.value}
			onSelect={(value) => { this.props.onChange(attrs, value) }}
		/>);
	}

	timeRangeField(attrs) {
		return (<InputTimeRange
			onChangeFrom={(value) => { this.rangeValue.from = value; this.props.onChange(attrs, this.rangeValue) }}
			onChangeTo={(value) => { this.rangeValue.to = value; this.props.onChange(attrs, this.rangeValue) }}
			valueFrom={this.rangeValue.from}
			valueTo={this.rangeValue.to}
		/>);
	}

	dateField(attrs) {
		return (<InputDate
			keyboardType={'numeric'}
			valueAsInteger={this.props.value}
			onChangeCalendar={(value) => { this.props.onChange(attrs, value) }}
			onChangeManual={(value) => { this.props.onChange(attrs, value) }}
		/>);
	}
	
	dateTimeField(attrs) {
		return (<InputDate
			keyboardType={'numeric'}
			mode={'datetime'}
			valueAsInteger={this.props.value}
			onChangeCalendar={(value) => { this.props.onChange(attrs, value) }}
			onChangeManual={(value) => { this.props.onChange(attrs, value) }}
		/>);
	}

	yesNoField(attrs) {
		const options = [{
			label: 'Sim',
			value: 'Y'
		}, {
			label: 'Não',
			value: 'N'
		}];
		return (<Select
			options={options}
			value={this.props.value}
			onSelect={(value) => { this.props.onChange(attrs, value) }}
		/>);
	}

	renderField(attrs) {
		var fieldComponent;

		switch (attrs.type) {
			case 'TEXT':
				fieldComponent = this.textField(attrs);
				break;
			case 'LARGE_TEXT':
				fieldComponent = this.largeTextField(attrs);
				break;
			case 'NUMBER':
				fieldComponent = this.numericField(attrs);
				break;
			case 'MONEY':
				fieldComponent = this.moneyField(attrs);
				break;
			case 'METRIC':
				fieldComponent = this.metricField(attrs);
				break;
			case 'EMAIL':
				fieldComponent = this.emailField(attrs);
				break;
			case 'URL':
				fieldComponent = this.urlField(attrs);
				break;
			case 'DATE':
				fieldComponent = this.dateField(attrs);
				break;
			case 'DATE_TIME':
				fieldComponent = this.dateTimeField(attrs);
				break;
			case 'DATE_RANGE':
				fieldComponent = this.textField(attrs);
				break;
			case 'TIME':
				fieldComponent = this.textField(attrs);
				break;
			case 'TIME_RANGE':
				fieldComponent = this.timeRangeField(attrs);
				break;
			case 'LIST':
				fieldComponent = this.listField(attrs);
				break;
			case 'CHECKBOX':
				fieldComponent = this.textField(attrs);
				break;
			case 'RADIO_BOX':
				fieldComponent = this.textField(attrs);
				break;
			case 'YES_NO':
				fieldComponent = this.yesNoField(attrs);
				break;
			default:
				fieldComponent = this.textField(attrs);
		}
		return fieldComponent;
	}

	render() {
		return (this.renderField(this.props));
	}
}