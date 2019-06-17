import React from 'react';
import { Text, View } from 'react-native';
import { InputDate } from '../../../../../../components/form/inputs/date/input-date';
import { Select } from '../../../../../../components/form/inputs/select/select';
import { InputText } from '../../../../../../components/form/inputs/text/input-text';
import { InputTimeRange } from '../../../../../../components/form/inputs/time/input-time-range';
import { Time } from '../../../../../../components/form/inputs/time/time';
import { LabelComponent } from '../../../../../../components/label-component';
import { CustomActivityIndicatorComponent } from '../../../../../../components/loading/custom-activity-indicator-component';
import { theme } from '../../../../../../theme/mendes-light';
import { NoteRisksService } from './note-risks.service';

export class GeneralFormComponent extends React.PureComponent {
	state = {
		constructionAmount: 0,
		loaded: false,
		form: {}
	};

	async componentWillMount() {
		const data = this.props.data;

		this.setState({
			form: data,
			loaded: true
		});
	}

	handleFormChange = (value, name) => {
		var formattedValue = value;
		if (value instanceof Time) {
			formattedValue = value.getHoursInNumber();
		} else if (value instanceof Date) {
			formattedValue = value.getTime();
		} else if (/^\d+$/.test(value) && (name !== 'phone' && name !== 'cellPhone' && name !== 'inspectorCPF')) {
			formattedValue = parseInt(value);
		}
		this.setState(state => ({
			form: {
				...state.form,
				[name]: value
			}
		}));
		this.props.onChange(formattedValue, name);
	};

	render() {
		const optionsRisks = this.props.optionsRisks;
		if (!this.state.loaded) {
			return <CustomActivityIndicatorComponent />;
		}
		return (
			<View>
				<View style={theme.row}>
					<View style={theme.column}>
						<LabelComponent>Expediente</LabelComponent>
						<InputTimeRange
							valueFrom={this.state.form.expedientFrom}
							valueTo={this.state.form.expedientTo}
							onChangeFrom={t =>
								this.handleFormChange(t, 'expedientFrom')
							}
							onChangeTo={t =>
								this.handleFormChange(t, 'expedientTo')
							}
						/>
					</View>
				</View>
				<View style={theme.row}>
					<View style={theme.column}>
						<LabelComponent>Nº de Funcionários</LabelComponent>
						<InputText
							keyboardType="decimal-pad"
							value={this.state.form.employeesQuantity.toString()}
							align="center"
							onChangeText={t =>
								this.handleFormChange(t, 'employeesQuantity')
							}
						/>
					</View>
					<View style={theme.column}>
						<LabelComponent>Área Terreno (m²)</LabelComponent>
						<InputText
							keyboardType="decimal-pad"
							value={this.state.form.groundSize.toString()}
							align="center"
							onChangeText={t =>
								this.handleFormChange(t, 'groundSize')
							}
						/>
					</View>
					<View style={theme.column}>
						<LabelComponent>Área Construída (m²)</LabelComponent>
						<InputText
							keyboardType="decimal-pad"
							value={this.state.form.builtArea.toString()}
							align="center"
							onChangeText={t =>
								this.handleFormChange(t, 'builtArea')
							}
						/>
					</View>
				</View>
				<View style={theme.row}>
					<View style={theme.column6}>
						<LabelComponent>No Local Desde</LabelComponent>
						<InputDate
							valueAsInteger={this.state.form.builtDate}
							onChangeCalendar={t =>
								this.handleFormChange(t, 'builtDate')
							}
							onChangeManual={t =>
								this.handleFormChange(t, 'builtDate')
							}
						/>
					</View>
					<View style={theme.column}>
						<LabelComponent>Idade Construção (Anos)</LabelComponent>
						<InputText
							keyboardType="decimal-pad"
							value={this.state.form.builtAge.toString()}
							align="center"
							onChangeText={t =>
								this.handleFormChange(t, 'builtAge')
							}
						/>
					</View>
				</View>
				<View style={theme.row}>
					<View style={theme.column}>
						<LabelComponent>Nº de Pavimentos</LabelComponent>
						<InputText
							value={this.state.form.quantityOfPaviments.toString()}
							onChangeText={t =>
								this.handleFormChange(t, 'quantityOfPaviments')
							}
							align="center"
							keyboardType="decimal-pad"
						/>
					</View>
					<View style={theme.column6}>
						<LabelComponent>Valor da Construção</LabelComponent>
						<View style={theme.inputGroup}>
							<View style={[theme.inputGroupLabel]}>
								<Text
									style={[
										theme.inputGroupLabelText,
										{ fontSize: 20, fontWeight: 'bold' }
									]}
								>
									R$
								</Text>
							</View>
							<View style={theme.inputGroupItem}>
								<InputText
									align="center"
									keyboardType="numeric"
									caretHidden={true}
									value={this.state.form.builtAmount}
									onChangeText={t =>
										this.handleFormChange(t, 'builtAmount')
									}
								/>
							</View>
						</View>
					</View>
				</View>
				<View style={theme.row}>
					<View style={theme.column}>
						<LabelComponent>
							Atividade Comercial no Local
						</LabelComponent>
						<Select
							placeholder={'Selecione'}
							options={[
								{ label: 'Não', value: 0 },
								{ label: 'Sim', value: 1 }
							]}
							value={this.state.form.comercialLocalActivity}
							onSelect={t =>
								this.handleFormChange(
									t,
									'comercialLocalActivity'
								)
							}
						/>
					</View>
					<View style={theme.column}>
						<LabelComponent>Condição</LabelComponent>
						<Select
							placeholder={'Selecione'}
							options={[
								{ label: 'Proprietário', value: 0 },
								{ label: 'Locatário', value: 1 }
							]}
							value={this.state.form.condition}
							onSelect={t =>
								this.handleFormChange(t, 'condition')
							}
						/>
					</View>
				</View>
				<View style={theme.row}>
					<View style={theme.column}>
						<LabelComponent>
							Nome de quem acompanhou a IR
						</LabelComponent>
						<InputText
							value={this.state.form.nameIRFollower}
							onChangeText={t =>
								this.handleFormChange(t, 'nameIRFollower')
							}
						/>
					</View>
				</View>
				<View style={theme.row}>
					<View style={theme.column}>
						<LabelComponent>Função / Cargo</LabelComponent>
						<InputText
							value={this.state.form.function}
							onChangeText={t =>
								this.handleFormChange(t, 'function')
							}
						/>
					</View>
				</View>
				<View style={theme.row}>
					<View style={theme.column}>
						<LabelComponent>Telefone</LabelComponent>
						<InputText
							value={this.state.form.phone}
							keyboardType="phone-pad"
							onChangeText={t =>
								this.handleFormChange(t, 'phone')
							}
						/>
					</View>
					<View style={theme.column}>
						<LabelComponent>Celular</LabelComponent>
						<InputText
							value={this.state.form.cellPhone}
							keyboardType="phone-pad"
							onChangeText={t =>
								this.handleFormChange(t, 'cellPhone')
							}
						/>
					</View>
				</View>
				<View style={theme.row}>
					<View style={theme.column}>
						<LabelComponent>CPF Vistoriador</LabelComponent>
						<InputText
							value={this.state.form.inspectorCPF}
							keyboardType="numeric"
							onChangeText={t =>
								this.handleFormChange(t, 'inspectorCPF')
							}
						/>
					</View>
				</View>
				<View style={theme.row}>
					<View style={theme.column}>
						<LabelComponent>Nome do Vistoriador</LabelComponent>
						<InputText
							value={this.state.form.inspectorName}
							onChangeText={t =>
								this.handleFormChange(t, 'inspectorName')
							}
						/>
					</View>
				</View>
				<View style={theme.row}>
					<View style={theme.column}>
						<LabelComponent>
							Data de Realização da IR
						</LabelComponent>
						<InputDate
							valueAsInteger={this.state.form.irDate}
							onChangeCalendar={t =>
								this.handleFormChange(t, 'irDate')
							}
							onChangeManual={t =>
								this.handleFormChange(t, 'irDate')
							}
						/>
					</View>
				</View>
				<View style={theme.row}>
					<View style={theme.column}>
						<LabelComponent>Rubrica do Risco</LabelComponent>
						<Select
							options={optionsRisks}
							onSelect={t => this.handleFormChange(t, 'riskItem')}
							value={this.state.form.riskItem}
							placeholder="Selecione uma rubrica"
						/>
					</View>
				</View>
				<View style={theme.row}>
					<View style={theme.column}>
						<LabelComponent>Atividade do Local</LabelComponent>
						<InputText
							value={this.state.form.localActivity}
							onChangeText={t =>
								this.handleFormChange(t, 'localActivity')
							}
						/>
					</View>
				</View>
				<View style={theme.row}>
					<View style={theme.column}>
						<LabelComponent>
							Conceito / Nota do Risco
						</LabelComponent>
						<Select
							options={NoteRisksService.RISKS_OPTIONS}
							onSelect={t => this.handleFormChange(t, 'riskNote')}
							value={this.state.form.riskNote}
							placeholder="Selecione uma nota de risco"
						/>
					</View>
				</View>
				<View style={theme.row}>
					<View style={theme.column}>
						<LabelComponent>
							Justificativa Técnica do Parecer
						</LabelComponent>
						<InputText
							value={this.state.form.technicalJustification}
							onChangeText={t =>
								this.handleFormChange(
									t,
									'technicalJustification'
								)
							}
						/>
					</View>
				</View>
			</View>
		);
	}
}
