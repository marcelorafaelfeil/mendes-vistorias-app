import React from 'react';
import { Text, View } from 'react-native';
import { ButtonComponent } from '../../../../../components/button-component';
import { LabelComponent } from '../../../../../components/label-component';
import { PanelComponent } from '../../../../../components/panel-component';
import { RowComponent } from '../../../../../components/row-component';
import { SectionTitleComponent } from '../../../../../components/section-title-component';
import { OpenLinksUtils } from '../../../../../utils/open-links';

export class Address extends React.Component {
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
		OpenLinksUtils.openWazeByAddress(this.address);
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
