import React from 'react';
import { View } from 'react-native';
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

	bindValue(data, value) {
		const formBuilder = this.state.formBuilder;
		formBuilder[data.index].value = value;
		console.log(formBuilder[data.index]);
		this.setState({ formBuilder });
	}

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
								index={index}
								name={f.name}
								variable={f.systemVariable}
								size={f.appSize}
								required={f.isRequired}
								type={f.type}
								options={!!f.options ? f.options : []}
								onChange={(data, value) => this.bindValue(data, value)}
							></FormBuilderField>
						</View>
					))}
				</View>
			</View>
		);
	}
}
