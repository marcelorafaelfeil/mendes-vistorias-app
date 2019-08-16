import '@firebase/firestore';
import React from 'react';
import { AsyncStorage, KeyboardAvoidingView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ContainerComponent } from '../../../../../components/container-component';
import { CustomSafeView } from '../../../../../components/custom-safe-view';
import { CustomActivityIndicatorComponent } from '../../../../../components/loading/custom-activity-indicator-component';
import { RisksService } from '../../../../../services/rest/risks-service';
import { Header } from '../../../includes/header/header';
import { GeneralFormComponent } from './components/general-form-component';
import { GeneralDataService } from './services/general-data-service';
import { PendenciesService } from '../../../../../services/rest/pendencies-service';

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
		var data = await GeneralDataService.getData(this.state.inspection);
		const formBuilder = await PendenciesService.getFormByInspection(this.state.inspection)

		const optionsRisks = await RisksService.getRisks().then(data => {
			return data;
		});
		this.setState({
			optionsRisks,
			loaded: true,
			data,
			formBuilder
		});
	}

	saveData(value, name) {
		this.state.data[name] = value;
		this.setState(
			state => ({
				data: {
					...state.data,
					[name]: value
				}
			}),
			() => {
				if (!!this.intervalOfSync) {
					clearTimeout(this.intervalOfSync);
				}
				this.intervalOfSync = setTimeout(() => GeneralDataService.syncWithSystem(this.state.data, this.state.inspection), 3000);
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
