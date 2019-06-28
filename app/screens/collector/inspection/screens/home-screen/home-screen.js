import React from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ContainerComponent } from '../../../../../components/container-component';
import { CustomSafeView } from '../../../../../components/custom-safe-view';
import { CustomActivityIndicatorComponent } from '../../../../../components/loading/custom-activity-indicator-component';
import { PendenciesService } from '../../../../../services/rest/pendencies-service';
import { Header } from '../../../includes/header/header';
import { Address } from './address';
import { Client } from './client';

export class HomeScreen extends React.Component {
	state = {
		loaded: false,
		pendency: {}
	};

	async componentDidMount() {
		await PendenciesService.getPendency(
			this.props.navigation.getParam('inspection')
		).then(response => {
			console.log('response: ', response);
			this.setState({
				pendency: response
			});
		});

		this.setState({
			loaded: true
		});
	}

	render() {
		const { pendency } = this.state;

		if (!this.state.loaded) {
			return <CustomActivityIndicatorComponent />;
		}

		return (
			<CustomSafeView>
				<ScrollView>
					<ContainerComponent>
						{!!pendency && (
							<View>
								<Header>Início</Header>
								{pendency.client && (
									<Client data={pendency.client} />
								)}
								{pendency.client && pendency.client.address && (
									<Address data={pendency.client.address} />
								)}
							</View>
						)}
					</ContainerComponent>
				</ScrollView>
			</CustomSafeView>
		);
	}
}
