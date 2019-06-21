import { Platform } from '@unimodules/core';
import React from 'react';
import { Modal, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Auth } from '../../../../services/auth/auth-service';

export class Settings extends React.Component {
	
	state = {
		modalVisible: false
	};

	openSettings() {
		this.setState({
			modalVisible: true
		});
	}

	closeSettings() {
		this.setState({
			modalVisible: false
		});
	}

	logout() {
		this.setState({ modalVisible: false });
		Auth.logout();
	}

	render() {
		return (
			<View>
				<TouchableOpacity onPress={() => this.openSettings()}>
					<Icon
						name={
							(Platform.OS === 'ios' ? 'ios' : 'md') + '-settings'
						}
						size={26}
						color={'#0CFECC'}
					/>
				</TouchableOpacity>
				<Modal
					animationType="slide"
					transparent={false}
					visible={this.state.modalVisible}
					onRequestClose={() => {
						Alert.alert('Modal has been closed.');
					}}
				>
					<View style={{ marginTop: 22 }}>
						<View>
							<View
								style={[
									styles.contentHeader,
									{
										paddingBottom: !!this.props
											.noPaddingBottom
											? 0
											: 10
									}
								]}
							>
								<View
									style={[
										styles.closeButton,
										styles.iconSettings
									]}
								>
									<TouchableOpacity
										onPress={() => this.closeSettings()}
									>
										<Icon
											name={
												(Platform.OS === 'ios'
													? 'ios'
													: 'md') + '-arrow-back'
											}
											size={26}
											color={'#0CFECC'}
										/>
									</TouchableOpacity>
								</View>
								<Text style={styles.textHeader}>
									Configurações
								</Text>
							</View>
							<View>
								<TouchableHighlight
									onPress={() => this.logout()}
								>
									<View style={styles.itemList}>
										<Text style={{ fontSize: 14 }}>
											Sair
										</Text>
									</View>
								</TouchableHighlight>
							</View>
						</View>
					</View>
				</Modal>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	contentHeader: {
		paddingTop: 10,
		display: 'flex',
		flexDirection: 'row'
	},
	textHeader: {
		flex: 1,
		fontFamily: 'Roboto',
		fontSize: 16,
		fontWeight: 'bold',
		textTransform: 'uppercase',
		textAlign: 'center',
		color: '#0CFECC'
	},
	closeButton: {
		marginLeft: 10
	},
	itemList: {
		padding: 15,
		borderBottomWidth: 1,
		borderBottomColor: '#EEEEEE'
	}
});
