import React from 'react';
import { View } from 'react-native';
import { InputTimeRange } from '../../../../../../components/form/inputs/time/input-time-range';
import { Time } from '../../../../../../components/form/inputs/time/time';
import { LabelComponent } from '../../../../../../components/label-component';
import { CustomActivityIndicatorComponent } from '../../../../../../components/loading/custom-activity-indicator-component';
import { theme } from '../../../../../../theme/mendes-light';
import { FormBuilderField } from './form-builder-field';

export class GeneralFormComponent extends React.PureComponent {
	state = {
		constructionAmount: 0,
		loaded: false,
		form: {},
		formBuilder: []
	};

	async componentWillMount() {
		const data = this.props.data;
		const formBuilder = this.props.formBuilder;

		console.log('formBuilder: ', formBuilder);
		this.setState({
			form: data,
			loaded: true,
			formBuilder
		});
	}

	handleFormChange = (value, name) => {
		var formattedValue = value;
		if (value instanceof Time) {
			formattedValue = value.getHoursInNumber();
		} else if (value instanceof Date) {
			formattedValue = value.getTime();
		} else if (/^\d+$/.test(value) && (name !== 'phone' && name !== 'cellPhone' && name !== 'inspectorCPF')) {
			formattedValue = parseInt(value);
		}
		this.setState(state => ({
			form: {
				...state.form,
				[name]: value
			}
		}));

		this.props.onChange(formattedValue, name);
	};

	render() {
		const optionsRisks = this.props.optionsRisks;
		if (!this.state.loaded) {
			return <CustomActivityIndicatorComponent />;
		}
		return (
			<View>
				<View style={theme.row}>
					{this.state.formBuilder.map((f, index) => (
						<View style={[theme.columnBase, theme[`column-${f.appSize}`]]} key={index}>
							<LabelComponent>{f.name}</LabelComponent>
							<FormBuilderField
								size={f.appSize}
								required={f.isRequired}
								type={f.type}
								options={!!f.options ? f.options : []}
							></FormBuilderField>
						</View>
					))}
				</View>
			</View>
		);
	}
}
