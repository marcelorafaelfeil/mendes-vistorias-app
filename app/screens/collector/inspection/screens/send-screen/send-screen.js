import React, { Component } from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ContainerComponent } from '../../../../../components/container-component';
import { CustomSafeView } from '../../../../../components/custom-safe-view';
import { Header } from '../../../includes/header/header';
import { Synchronize } from './synchronize';
import { Finish } from './finish';

export default class SendScreen extends Component {
	render() {
		return (
			<CustomSafeView>
				<ScrollView>
					<ContainerComponent>
						<Header>Enviar</Header>
						<Synchronize />
						<Finish />
					</ContainerComponent>
				</ScrollView>
			</CustomSafeView>
		);
	}
}
