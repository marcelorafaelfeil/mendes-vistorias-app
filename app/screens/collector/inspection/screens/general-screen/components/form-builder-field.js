import React from 'react';
import { Text } from 'react-native';
import { InputText } from '../../../../../../components/form/inputs/text/input-text';
import { Select } from '../../../../../../components/form/inputs/select/select';

export class FormBuilderField extends React.Component {

	textField(attrs) {
		return (<InputText
			value={this.props.value}
		/>);
	}

	largeTextField(attrs) {
		return (<InputText
			value={this.props.value}
		/>);
	}

	numericField(attrs) {
		return (<InputText
			keyboardType="decimal-pad"
			value={this.props.value.toString()}
			mask="numeric"
			align="center"
		/>);
	}

	moneyField(attrs) {
		return (<InputText
			keyboardType="decimal-pad"
			value={this.props.value.toString()}
			mask="currency"
			align="center"
			caretHidden={true}
		/>);
	}

	emailField(attrs) {
		return (<InputText
			keyboardType="email"
			value={this.props.value.toString()}
		/>);
	}

	urlField(attrs) {
		return (<InputText
			keyboardType="url"
			value={this.props.value.toString()}
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
		console.log('options: ', options);
		return (<Select
			options={options}
			value={this.props.value}
		/>);
	}

	timeRangeField(attrs) {
		return (<InputTimeRange
			valueFrom={this.props.value.expedientFrom}
			valueTo={this.props.value.expedientTo}
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
			case 'EMAIL':
				fieldComponent = this.emailField(attrs);
				break;
			case 'URL':
				fieldComponent = this.textField(attrs);
				break;
			case 'DATE':
				fieldComponent = this.textField(attrs);
				break;
			case 'DATETIME':
				fieldComponent = this.textField(attrs);
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
				fieldComponent = this.textField(attrs);
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