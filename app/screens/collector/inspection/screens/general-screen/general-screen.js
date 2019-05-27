import React from 'react';
import { Text } from 'react-native';
import { CustomSafeView } from '../../../../../components/custom-safe-view';
import { Header } from '../../../includes/header/header';
import { GeneralFormComponent } from './components/general-form-component';
import { ContainerComponent } from '../../../../../components/container-component';

export class GeneralScreen extends React.Component {
	render() {
		return (
			<CustomSafeView>
				<ContainerComponent>
					<Header>Geral</Header>
					<GeneralFormComponent />
				</ContainerComponent>
			</CustomSafeView>
		);
	}
}
