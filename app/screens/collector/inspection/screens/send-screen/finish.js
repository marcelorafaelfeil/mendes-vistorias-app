import React, { Component } from 'react';
import { Text, View, Alert } from 'react-native';
import { ButtonComponent } from '../../../../../components/button-component';
import { InputText } from '../../../../../components/form/inputs/text/input-text';
import { LabelComponent } from '../../../../../components/label-component';
import { Panel } from '../../../../../components/panel/panel';
import { PanelBody } from '../../../../../components/panel/panel-body';
import { PanelHeader } from '../../../../../components/panel/panel-header';
import { theme } from '../../../../../theme/mendes-light';
import { PendenciesService } from '../../../../../services/rest/pendencies-service';
import { CustomActivityIndicatorComponent } from '../../../../../components/loading/custom-activity-indicator-component';

export class Finish extends Component {
	state = {
		frustrateJustification: '',
		showJustification: false,
		loading: false
	};

	/**
	 * @description Exibe e oculta o campo de justificativa.
	 */
	toggleJustification = () => {
		const show = !this.state.showJustification;
		this.setState({ showJustification: show });
	};

	concludeInspection = () => {
		Alert.alert(
			'Confirmação',
			'Você tem certeza de que deseja concluir essa inspeção? Certifique-se de que todos os dados estão preenchidos.',
			[
				{
					text: 'Cancelar',
					style: 'cancel'
				},
				{
					text: 'Confirmar',
					onPress: () => {
						this.setState({ loading: true });
						PendenciesService.concludeInspection(
							this.props.inspection,
							this.state.frustrateJustification
						).then(data => {
							this.setState({ loading: false });
							this.props.onFrustrate(data);
						});
					}
				}
			]
		);
	};

	confirmFrustration = () => {
		if (this.state.frustrateJustification === '') {
			Alert.alert(
				'Validação',
				'É necessário informar uma justificativa.'
			);
		} else {
			this.setState({ loading: true });
			PendenciesService.frustrateInspection(
				this.props.inspection,
				this.state.frustrateJustification
			).then(data => {
				this.setState({ loading: false });
				this.props.onFrustrate(data);
			});
		}
	};

	render() {
		if (this.state.loading) {
			return <CustomActivityIndicatorComponent />;
		}
		return (
			<View>
				{!this.state.showJustification ? (
					<View>
						<Panel>
							<PanelHeader>Finalizar</PanelHeader>
							<PanelBody>
								<Text style={{ marginBottom: 15 }}>
									Use uma das opções abaixo para finalizar a
									inspeção.
								</Text>
								<View style={[theme.row, { marginBottom: 0 }]}>
									<View style={theme.column}>
										<ButtonComponent
											onPress={() =>
												this.toggleJustification()
											}
											status={'danger'}
										>
											Frustrar
										</ButtonComponent>
									</View>
									<View style={theme.column}>
										<ButtonComponent
											onPress={() => {
												this.concludeInspection();
											}}
										>
											Concluir
										</ButtonComponent>
									</View>
								</View>
							</PanelBody>
						</Panel>
					</View>
				) : (
					<View>
						<Panel>
							<PanelHeader>
								Justificativa para frustração
							</PanelHeader>
							<PanelBody>
								<Text style={{ marginBottom: 15 }}>
									É necessário informar uma justificativa para
									frustrar a inspeção.
								</Text>
								<View style={theme.row}>
									<View style={theme.column}>
										<LabelComponent>
											Justificativa
										</LabelComponent>
										<InputText
											value={
												this.state
													.frustrateJustification
											}
											autoGrow={true}
											minHeight={100}
											multiline={true}
											onChangeText={text => {
												this.setState({
													frustrateJustification: text
												});
											}}
										/>
									</View>
								</View>
								<View
									style={{
										display: 'flex',
										flexDirection: 'row'
									}}
								>
									<View style={{ flex: 1, marginRight: 5 }}>
										<ButtonComponent
											onPress={() =>
												this.toggleJustification()
											}
											status={'default'}
										>
											Cancelar
										</ButtonComponent>
									</View>
									<View style={{ flex: 1, marginLeft: 5 }}>
										<ButtonComponent
											onPress={() =>
												this.confirmFrustration()
											}
											primary
										>
											Confirmar
										</ButtonComponent>
									</View>
								</View>
							</PanelBody>
						</Panel>
					</View>
				)}
			</View>
		);
	}
}
