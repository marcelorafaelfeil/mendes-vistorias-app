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
import PhotosService from '../inspection-screen/services/photos-service';
import { Schedule } from './schedule/schedule';
import { SchedulePanel } from './schedule/schedule-panel';

export class HomeScreen extends React.Component {
	state = {
		loaded: false,
		inspection: this.props.navigation.getParam('inspection'),
		pendency: {}
	};

	async componentDidMount() {
		await this.getPendency();

		this.setState({
			loaded: true
		});
	}

	async getPendency() {
		const inspection = this.props.navigation.getParam('inspection');
		return PendenciesService.getPendency(inspection).then(response => {
			this.setState({
				pendency: response
			});
			// Grava o template de fotos, em memória
			if (
				!!response.insurerProduct &&
				!!response.insurerProduct.product &&
				!!response.insurerProduct.product.photosTemplate
			) {
				const photosTemplate =
					response.insurerProduct.product.photosTemplate;
				PhotosService.savePhotosTemplate(photosTemplate, inspection);
			}
		});
	}

	onSchedule = async data => {
		this.setState({ loaded: false });
		await this.getPendency();
		this.setState({
			loaded: true
		});
	};

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
								{!!pendency &&
									!!pendency.schedules &&
									pendency.schedules.length > 0 && (
										<SchedulePanel
											schedule={pendency.schedules[0]}
										></SchedulePanel>
									)}
								{pendency.client && (
									<Client data={pendency.client} />
								)}
								{pendency.client && pendency.client.address && (
									<Address data={pendency.client.address} />
								)}
								{!!pendency &&
									!!pendency.schedules &&
									pendency.schedules.length === 0 && (
										<Schedule
											onSchedule={this.onSchedule}
											inspection={this.state.inspection}
										></Schedule>
									)}
							</View>
						)}
					</ContainerComponent>
				</ScrollView>
			</CustomSafeView>
		);
	}
}
