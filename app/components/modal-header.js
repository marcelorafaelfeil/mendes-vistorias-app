import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { theme } from '../theme/mendes-light';

const Header = styled(View)`
	display: flex;
	align-content: stretch;
	flex-wrap: wrap;
	flex-direction: row;
	margin-bottom: 10;
	margin-left: -5;
	margin-right: -5;
	height: 46;
	border-bottom-width: 1px;
	border-bottom-color: #F1F1F1;
`;
const ActionColumn = styled(TouchableOpacity)`
	flex-grow: 1;
	justify-content: center;
	align-items: center;
	height: 46;
`;
const TitleColumn = styled(TouchableOpacity)`
	flex-grow: 2;
	align-items: center;
	justify-content: center;
	height: 46;
	font-weight: bold;
`

export class ModalHeader extends React.Component {
	onRequestClose = () => {
		this.props.onRequestClose();
	};

	onRequestConfirm = () => {
		if (!!this.props.onRequestConfirm) {
			this.props.onRequestConfirm();
		}
	}

	render() {
		return ( 
			<Header>
				<ActionColumn onPress={() => this.onRequestClose()}>
					<Text>Fechar</Text>
				</ActionColumn>
				<TitleColumn>
					<Text style={{fontWeight: 'bold'}}>{this.props.children}</Text>
				</TitleColumn>
				<ActionColumn onPress={() => this.onRequestConfirm()}>
					<Text style={{color: theme.primaryColor.color, fontWeight: 'bold', fontSize: 16}}>Salvar</Text>
				</ActionColumn>
			</Header>
		);
	}
}
