import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Panel } from '../../../../../components/panel/panel';
import { PanelBody } from '../../../../../components/panel/panel-body';
import { PanelHeader } from '../../../../../components/panel/panel-header';
import { ButtonComponent } from '../../../../../components/button-component';

export class Synchronize extends Component {
	render() {
		return (
			<View>
				<Panel>
					<PanelHeader>Sincronizar</PanelHeader>
					<PanelBody>
						<Text style={{marginBottom: 15}}>
							Sincronizar irá fazer com que todas as informações dessa inspeção, sejam enviadas para a plataforma online. Essa opção possibilita que você
							visualize e edite os dados a partir da plataforma online.
						</Text>
						<ButtonComponent>Sincronizar</ButtonComponent>
					</PanelBody>
				</Panel>
			</View>
		);
	}
}
