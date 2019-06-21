import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { CustomSafeView } from '../../components/custom-safe-view';
import { ScrollView } from 'react-native-gesture-handler';
import { Header } from '../collector/includes/header/header';
import { NotificationService } from '../../services/notification-service';
import { ButtonComponent } from '../../components/button-component';
import Icon from 'react-native-vector-icons/Ionicons';
import { ContainerComponent } from '../../components/container-component';
import { Platform } from '@unimodules/core';
import { LocationService } from '../../services/location-service';

export class WelcomeScreen extends Component {
	static navigationOptions = {
		header: null
	};

	async componentWillMount() {
		const statusNotification = await NotificationService.askPermission();
		const statusLocation = await LocationService.askPermission();
		if (statusNotification === 'granted') {
			NotificationService.saveNotificationToken();
		}
		// this.getLocationPermission();
	}

	getLocationPermission = async () => {
		const statusLocation = await LocationService.askPermission();
		if (statusLocation !== 'granted') {
			this.getLocationPermission();
		}
		return;
	}

	render() {
		return (
			<CustomSafeView>
				<ScrollView>
					<ContainerComponent>
						<Header> Bem vindo! </Header>
						<View style={{display: 'flex', marginTop: 20, justifyContent: 'center', alignItems: 'center'}}>
							<Text style={styles.text}>
								Seja bem vindo ao aplicativo de coletor da
								Mendes Vistorias.
							</Text>
							<Icon name={(Platform.IOS === 'ios' ? 'ios' : 'md') + '-checkmark'} size={80} style={styles.icon}></Icon>
							<Text style={styles.text}>
								Com o aplicativo, você poderá realizar as
								vistorias com mais agilidade, facilidade e em
								qualquer lugar.
							</Text>
							<Text style={styles.text}>
								Para aproveitar o máximo do aplicativo,
								recomendamos que ative as notificações e a
								localização, pois o aplicativo faz uso dessas
								funcionalidades para poder lhe proporcionar uma
								melhor experiência.
							</Text>
						</View>
						<View style={{marginTop: 20}}>
							<ButtonComponent onPress={() => this.props.navigation.navigate('Dashboard')} primary>Prosseguir</ButtonComponent>
						</View>
					</ContainerComponent>
				</ScrollView>
			</CustomSafeView>
		);
	}
}

const styles = StyleSheet.create({
	text: {
		textAlign: 'center',
		marginBottom: 20,
	},
	icon: {
		color: '#0afc73'
	}
});