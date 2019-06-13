import React from 'react';
import { Text, View } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import { InputDate } from '../../../../../../components/form/inputs/date/input-date';
import { InputText } from '../../../../../../components/form/inputs/text/input-text';
import { InputTimeRange } from '../../../../../../components/form/inputs/time/input-time-range';
import { LabelComponent } from '../../../../../../components/label-component';
import { theme } from '../../../../../../theme/mendes-light';
import { GetData } from '../../../../../../utils/get-data';
import { Select } from '../../../../../../components/form/inputs/select/select';

export class GeneralFormComponent extends React.PureComponent {
	state = {
		constructionAmount: 0
	};

	componentWillMount() {
		const data = this.props.data;

		this.setState({
			expedientFrom: !!data.expedient_from
				? GetData.numberInHoursToDate(data.expedient_from)
				: '',
			expedientTo: !!data.expedient_to
				? GetData.numberInHoursToDate(data.expedient_to)
				: '',
			employeesQuantity: !!data.employees_quantity
				? data.employees_quantity.toString()
				: '0',
			buildDate: !!data.build_date ? new Date(data.build_date) : null
		});
	}

	render() {
		const data = this.props.data;
		const options = [{label: '01A002 - Academia de ginastica/dança/lutas/escola de natação ou esportes', value: 1}, {label: '425216 - Açougue/Peixaria', value: 2}, {label: '002253 - Açucar, usina sem produção de álcool', value: 3}, {label: '004066 - Adubos - Depósito', value: 4}, {label: '004065 - Adubos - Lojas', value: 5}, {label: '006018 - Ag. bancárias/lojas ou coop. de crédito/casa de câmbio', value: 6}];
		return (
			<View>
				<Select placeholder={'Selecione uma rubrica'} options={options} />
				<View style={theme.row}>
					<View style={theme.column}>
						<LabelComponent>Expediente</LabelComponent>
						<InputTimeRange
							valueFrom={this.state.expedientFrom}
							valueTo={this.state.expedientTo}
							onChangeFrom={text => {
								this.setState({ expedientFrom: text });
								this.props.onChange(
									GetData.hoursInNumber(text),
									'expedient_from'
								);
							}}
							onChangeTo={text => {
								this.setState({ expedientTo: text });
								this.props.onChange(
									GetData.hoursInNumber(text),
									'expedient_to'
								);
							}}
						/>
					</View>
				</View>
				<View style={theme.row}>
					<View style={theme.column}>
						<LabelComponent>Nº de Funcionários</LabelComponent>
						<InputText
							keyboardType="decimal-pad"
							value={this.state.employeesQuantity}
							onChangeText={text => {
								this.setState({ employeesQuantity: text });
								this.props.onChange(
									parseInt(text),
									'employees_quantity'
								);
							}}
						/>
					</View>
					<View style={theme.column}>
						<LabelComponent>Área Terreno (m²)</LabelComponent>
						<InputText
							keyboardType="decimal-pad"
							value={this.state.groundSize}
							onChangeText={text => {
								this.setState({ groundSize: text });
								this.props.onChange(
									parseInt(text),
									'ground_size'
								);
							}}
						/>
					</View>
					<View style={theme.column}>
						<LabelComponent>Área Construída (m²)</LabelComponent>
						<InputText
							keyboardType="decimal-pad"
							value={this.state.builtArea}
							onChangeText={text => {
								this.setState({ builtArea: text });
								this.props.onChange(
									parseInt(text),
									'built_area'
								);
							}}
						/>
					</View>
				</View>
				<View style={theme.row}>
					<View style={theme.column6}>
						<LabelComponent>No Local Desde</LabelComponent>
						<InputDate
							valueAsDate={this.state.buildDate}
							onChange={date => {
								this.setState({ buildDate: date });
								this.props.onChange(
									date.getTime(),
									'build_date'
								);
							}}
						/>
					</View>
					<View style={theme.column}>
						<LabelComponent>Idade Construção (Anos)</LabelComponent>
						<InputText
							keyboardType="decimal-pad"
							value={this.state.builtArea}
							onChangeText={text => {
								this.setState({ builtArea: text });
								this.props.onChange(
									parseInt(text),
									'build_age'
								);
							}}
						/>
					</View>
				</View>
				<View style={theme.row}>
					<View style={theme.column}>
						<LabelComponent>Nº de Pavimentos</LabelComponent>
						<InputText keyboardType="decimal-pad" />
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
								<TextInputMask
									type={'money'}
									value={''}
									options={{
										unit: ''
									}}
									value={this.state.constructionAmount}
									onChangeText={text => {
										this.setState({
											constructionAmount: text
										});
									}}
									style={theme.input}
								/>
							</View>
						</View>
					</View>
				</View>
				<View style={theme.row}>
					<View style={theme.column}>
						<LabelComponent>Condição</LabelComponent>
						<InputText />
					</View>
				</View>
				<View style={theme.row}>
					<View style={theme.column}>
						<LabelComponent>
							Nome de quem acompanhou a IR
						</LabelComponent>
						<InputText />
					</View>
				</View>
				<View style={theme.row}>
					<View style={theme.column}>
						<LabelComponent>Função / Cargo</LabelComponent>
						<InputText />
					</View>
				</View>
				<View style={theme.row}>
					<View style={theme.column}>
						<LabelComponent>Telefone</LabelComponent>
						<InputText keyboardType={'phone-pad'} />
					</View>
					<View style={theme.column}>
						<LabelComponent>Celular</LabelComponent>
						<InputText keyboardType={'phone-pad'} />
					</View>
				</View>
			</View>
		);
	}
}
