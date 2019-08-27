import React from 'react';
import { View } from 'react-native';
import { LabelComponent } from '../../../../../../components/label-component';
import { CustomActivityIndicatorComponent } from '../../../../../../components/loading/custom-activity-indicator-component';
import { theme } from '../../../../../../theme/mendes-light';
import { FormUtils } from '../services/form-utils';
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

	handleFormChange = (form) => {
		this.props.onChange(form);
	};

	bindValue(data, value) {
		const formBuilder = this.state.formBuilder;
		const valueAs = FormUtils.getValueAs(data.type, value);
		Object.assign(formBuilder[data.index], valueAs);
		this.setState({ formBuilder });
		this.handleFormChange(formBuilder);
	} 

	render() {
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
								value={f[FormUtils.getValueAsType(f.type)]}
								onChange={(data, value) => this.bindValue(data, value)}
							></FormBuilderField>
						</View>
					))}
				</View>
			</View>
		);
	}
}
