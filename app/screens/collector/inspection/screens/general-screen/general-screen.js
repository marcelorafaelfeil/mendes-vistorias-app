import '@firebase/firestore';
import React from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ContainerComponent } from '../../../../../components/container-component';
import { CustomSafeView } from '../../../../../components/custom-safe-view';
import { CustomActivityIndicatorComponent } from '../../../../../components/loading/custom-activity-indicator-component';
import { PendenciesService } from '../../../../../services/rest/pendencies-service';
import { RisksService } from '../../../../../services/rest/risks-service';
import { Header } from '../../../includes/header/header';
import { GeneralFormComponent } from './components/general-form-component';
import { GeneralDataService } from './services/general-data-service';
import { FormUtils } from './services/form-utils';

export class GeneralScreen extends React.Component {
	state = {
		inspection: this.props.navigation.getParam('inspection'),
		data: {},
		loaded: false
	};

	intervalOfSync;

	constructor(props) {
		super(props);
		this.saveData = this.saveData.bind(this);
	}

	async componentWillMount() {
		// var data = await GeneralDataService.getData(this.state.inspection);
		const formBuilder = await PendenciesService.getFormByInspection(this.state.inspection);
		const formValues = await PendenciesService.getFormValuesByInspection(this.state.inspection);
		const form = GeneralDataService.mergeDataFormAndValues(formBuilder, formValues);
		console.log(form);
		// Verifica se há um formulário já salvo
		PendenciesService.createForm(this.state.inspection, formBuilder);

		this.setState({
			loaded: true,
			// data,
			formBuilder
		});
	}

	_bindData = response => {
		const data = response.data;
		const form = this.state.form;
		/* form.forEach((f, index) => {
			data.forEach(d => {
				if (f.id === d.field.id) {
					form[index][key] = d[key];
				}
			});
		})
		console.log('form: ', form); */
	}

	saveData(form) {
		//this.state.data[name] = value;
		this.setState(
			state => ({ form }),
			() => {
				if (!!this.intervalOfSync) {
					clearTimeout(this.intervalOfSync);
				}
				this.intervalOfSync = setTimeout(() => GeneralDataService.syncWithSystem(form, this.state.inspection).then(this._bindData), 3000);
			}
		);
	}

	render() {
		if (!this.state.loaded) {
			return <CustomActivityIndicatorComponent />;
		} else {
			return (
				<CustomSafeView>
					<KeyboardAvoidingView
						style={{
							flex: 1,
							flexDirection: 'column',
							justifyContent: 'center'
						}}
						behavior="padding"
						enabled
					>
						<ScrollView>
							<ContainerComponent>
								<Header>Geral</Header>
								<GeneralFormComponent
									optionsRisks={this.state.optionsRisks}
									data={this.state.data}
									formBuilder={this.state.formBuilder}
									onChange={this.saveData}
								/>
							</ContainerComponent>
						</ScrollView>
					</KeyboardAvoidingView>
				</CustomSafeView>
			);
		}
	}
}
