import React, { Component } from 'react';
import { KeyboardAvoidingView, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ContainerComponent } from '../../../../../components/container-component';
import { CustomSafeView } from '../../../../../components/custom-safe-view';
import { CustomActivityIndicatorComponent } from '../../../../../components/loading/custom-activity-indicator-component';
import { ObservationRestService } from '../../../../../services/rest/observation-rest-service';
import { theme } from '../../../../../theme/mendes-light';
import { Header } from '../../../includes/header/header';
import { ObservationService } from './services/observation-service';
import AddObservation from './components/add-observation';
import ListObservations from './components/list-observations';

export default class ObservationScreen extends Component {
	state = {
		scrollView: null,
		inspection: this.props.navigation.getParam('inspection'),
		listOfObservations: [],
		loaded: false,
		observation: ''
	}

	async componentWillMount() {
		const listOfObservations = await ObservationRestService.getObservation(this.state.inspection);
		const observation = await ObservationService.getInStorage(this.state.inspection);
		this.setState({
			listOfObservations,
			observation,
			loaded: true
		});
	}

	saveObservation(text) {
		ObservationService.saveInStorage(this.state.inspection, text);
	}

	render() {
		if (!this.state.loaded) {
			return (<CustomActivityIndicatorComponent />)
		}
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
					<ScrollView ref={ref => (this.scrollView = ref)}>
						<ContainerComponent>
							<Header>Observações</Header>
							<ListObservations data={this.state.listOfObservations} />
							<View style={theme.separator} />
							<AddObservation value={this.state.observation} onFieldFocus={() => this.scrollView.scrollToEnd()} onChangeObservation={(text) => this.saveObservation(text) } />
						</ContainerComponent>
					</ScrollView>
				</KeyboardAvoidingView>
			</CustomSafeView>
		);
	}
}
