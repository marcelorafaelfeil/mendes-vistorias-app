import React from 'react';
import { View, Text, Linking } from 'react-native';
import { PanelComponent } from '../../../../../components/panel-component';
import { SectionTitleComponent } from '../../../../../components/section-title-component';
import { LabelComponent } from '../../../../../components/label-component';
import { ButtonComponent } from '../../../../../components/button-component';
import { RowComponent } from '../../../../../components/row-component';
import { BindVariable } from '../../../../../utils/bind-variable';

export class Address extends React.Component {
	wazeUrl = 'https://waze.com/ul?q={address}';
	address = '';

	componentDidMount() {
		const data = this.props.data;
		if (!!data.street) {
			this.address = data.street + ' ' + data.number;
			this.address += ', ' + data.neighborhood;
			if (!!data.city) {
				this.address += ', ' + data.city.name;
				if (!!data.city.state) {
					this.address += ' - ' + data.city.state.uf;
				}
			}
		}
	}

	openMap() {
		const url = BindVariable.bind(this.wazeUrl, { address: this.address });
		Linking.canOpenURL(url).then((supported) => {
			if (supported) {
				Linking.openURL(url).catch(err => {
					console.error('An error occurred', err);
					alert('Não foi possível abrir esse endereço no waze.');
				});
			} else {
				alert('Não foi possível abrir o endereço no waze. Verifique se o aplicativo está instalado.');
			}
		}).catch(err => alert('Não foi possível abrir esse aplicativo.'));
	}

	render() {
		const { data } = this.props;

		return (
			<View style={{ marginBottom: 10 }}>
				<SectionTitleComponent>Endereço</SectionTitleComponent>
				<PanelComponent>
					<RowComponent>
						<LabelComponent>Rua</LabelComponent>
						<Text>
							{data.street}, n{data.number}
						</Text>
					</RowComponent>
					{!!data.complement && (
						<RowComponent>
							<LabelComponent>Rua</LabelComponent>
							<Text>{data.complement}</Text>
						</RowComponent>
					)}
					<RowComponent>
						<LabelComponent>Bairro</LabelComponent>
						<Text>{data.neighborhood}</Text>
					</RowComponent>
					<RowComponent>
						<LabelComponent>Cidade</LabelComponent>
						<Text>
							{data.city.name} - {data.city.state.uf}
						</Text>
					</RowComponent>
					<RowComponent>
						<LabelComponent>CEP</LabelComponent>
						<Text>{data.postalCode}</Text>
					</RowComponent>
				</PanelComponent>
				<View
					style={{
						flexDirection: 'row-reverse',
						alignItems: 'flex-end',
						marginTop: 5
					}}
				>
					<View
						style={{ flexBasis: '50%', margin: 5, marginReft: 0 }}
					>
						<ButtonComponent onPress={() => this.openMap()}>
							Abrir no Waze
						</ButtonComponent>
					</View>
				</View>
			</View>
		);
	}
}
