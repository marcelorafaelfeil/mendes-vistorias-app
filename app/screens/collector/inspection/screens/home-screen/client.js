import React from 'react';
import { connectActionSheet } from '@expo/react-native-action-sheet';
import { Linking, Text, View } from 'react-native';
import { ButtonComponent } from '../../../../../components/button-component';
import { LabelComponent } from '../../../../../components/label-component';
import { PanelComponent } from '../../../../../components/panel-component';
import { RowComponent } from '../../../../../components/row-component';
import { SectionTitleComponent } from '../../../../../components/section-title-component';
import { OpenLinksUtils } from '../../../../../utils/open-links';

@connectActionSheet
export class Client extends React.Component {
	openPhoneList() {
		const phones = [];
		this.props.data.phones.forEach(p => {
			phones.push(`(${p.ddd}) ${p.phone}`);
		});

		this.props.showActionSheetWithOptions(
			{
				options: ['Cancelar', ...phones],
				cancelButtonIndex: 0
			},
			buttonIndex => {
				if (buttonIndex >= 1) {
					OpenLinksUtils.openCallPhone(phones[buttonIndex - 1]);
				}
			}
		);
	}

	render() {
		const { data } = this.props;
		return (
			<View style={{ marginBottom: 10 }}>
				<SectionTitleComponent>Cliente</SectionTitleComponent>
				<PanelComponent>
					<RowComponent>
						<LabelComponent>Nome</LabelComponent>
						<Text>{data.name}</Text>
					</RowComponent>
					<RowComponent>
						<LabelComponent>CPF</LabelComponent>
						<Text>{data.cpf}</Text>
					</RowComponent>
					<RowComponent>
						<LabelComponent>Email</LabelComponent>
						<Text>{data.email}</Text>
					</RowComponent>
					<RowComponent>
						<LabelComponent>Telefones</LabelComponent>
						{data.phones.map(p => (
							<Text key={p.id}>
								({p.ddd}) {p.phone}
							</Text>
						))}
					</RowComponent>
				</PanelComponent>
				<View
					style={{
						flexDirection: 'row',
						alignItems: 'flex-end',
						marginTop: 5
					}}
				>
					<View style={{ flex: 1, margin: 5, marginLeft: 0 }}>
						<ButtonComponent
							status={'info'}
							onPress={() => this.openPhoneList()}
						>
							Ligar
						</ButtonComponent>
					</View>
					<View style={{ flex: 1, margin: 5, marginRight: 0 }}>
						<ButtonComponent
							status={'info'}
							onPress={() =>
								OpenLinksUtils.openSendMail(data.email)
							}
						>
							Enviar E-mail
						</ButtonComponent>
					</View>
				</View>
			</View>
		);
	}
}
