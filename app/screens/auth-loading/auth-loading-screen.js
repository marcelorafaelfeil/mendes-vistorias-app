import React, { Component } from 'react';
import { Text, View, ActivityIndicator, StatusBar } from 'react-native';
import { Config } from '../../core/config';
import { Auth } from '../../services/auth/auth-service';
import navigationService from '../../services/navigation-service';

export default class AuthLoadingScreen extends Component {
	static navigationOptions = {
		header: null,
		gesturesEnabled: false
	};
	
	constructor(props) {
		super(props);
		this._bootstrapAsync();
	}

	_bootstrapAsync = async () => {
		const userToken = await Auth.getToken();
		navigationService.resetTo(userToken ? Config.INITIAL_AUTHENTICATED_SCREEN : Config.LOGIN_SCREEN);
	};

	render() {
		return (
			<View>
				<ActivityIndicator />
				<StatusBar barStyle="default" />
			</View>
		);
	}
}
