import React, { Component } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { ContainerComponent } from '../../../../../components/container-component';
import { CustomSafeView } from '../../../../../components/custom-safe-view';
import { Header } from '../../../includes/header/header';
import { Finish } from './finish';

export default class SendScreen extends Component {
	state = {
		inspection: this.props.navigation.getParam('inspection')
	};

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
						/>
					</ContainerComponent>
				</ScrollView>
			</CustomSafeView>
		);
	}
}
