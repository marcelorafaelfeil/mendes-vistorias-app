import React, { Component } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { View, Text, Alert } from 'react-native';
import { ContainerComponent } from '../../../../../components/container-component';
import { CustomSafeView } from '../../../../../components/custom-safe-view';
import { Header } from '../../../includes/header/header';
import { Finish } from './finish';
import { PendenciesService } from '../../../../../services/rest/pendencies-service';
import { ErrorsPanel } from './errors-panel';

export default class SendScreen extends Component {
	state = {
		inspection: this.props.navigation.getParam('inspection'),
		formData: [],
		isValid: true
	};

	componentWillMount = async () => {
		const formData = await PendenciesService.getFormData(this.state.inspection);
		this.setState({ formData });
	}

	handleInvalidData = validation => {
		this.setState({ formData: validation.data, isValid: validation.isValid });
	}

	handleConclude = data => {
		this.props.navigation.navigate('Dashboard', {
			refresh: true
		});
	};

	handleFrustration = data => {
		this.props.navigation.navigate('Dashboard', {
			refresh: true
		});
	};

	_renderErrorComponent() {
		if (!this.state.isValid) {
			if (!!this.state.formData) {
				return <ErrorsPanel fields={this.state.formData} />;
			} else {
				Alert.alert('Formulário', 'Não foi encontrado nenhum formulário. Acesse a tela "Geral" e preencha o formulário.');
			}
		}
	}

	render() {
		return (
			<CustomSafeView>
				<ScrollView>
					<ContainerComponent>
						<Header>Enviar</Header>
						{/* <Synchronize /> */}
						<Finish
							inspection={this.state.inspection}
							onConclude={this.handleConclude}
							onFrustrate={this.handleFrustration}
							onInvalid={this.handleInvalidData}
						/>
						{this._renderErrorComponent()}
					</ContainerComponent>
				</ScrollView>
			</CustomSafeView>
		);
	}
}
