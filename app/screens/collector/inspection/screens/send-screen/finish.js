import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Panel } from '../../../../../components/panel/panel';
import { PanelHeader } from '../../../../../components/panel/panel-header';
import { PanelBody } from '../../../../../components/panel/panel-body';
import { ButtonComponent } from '../../../../../components/button-component';
import { theme } from '../../../../../theme/mendes-light';

export class Finish extends Component {
	render() {
		return (
			<View>
				<Panel>
					<PanelHeader>Finalizar</PanelHeader>
					<PanelBody>
						<Text style={{ marginBottom: 15 }}>
							Use uma das opções abaixo para finalizar a inspeção.
						</Text>
						<View style={[theme.row, {marginBottom: 0}]}>
							<View style={theme.column}>
								<ButtonComponent status={'danger'}>Frustrar</ButtonComponent>
							</View>
							<View style={theme.column}>
								<ButtonComponent>Concluir</ButtonComponent>
							</View>
						</View>
					</PanelBody>
				</Panel>
			</View>
		);
	}
}
