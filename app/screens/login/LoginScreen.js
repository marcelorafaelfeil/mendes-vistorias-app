import React from 'react';
import { LoginComponent } from './LoginComponent';

export class LoginScreen extends React.Component {
	static navigationOptions = {
		header: null
	};

	render() {
		return (
			<LoginComponent navigation={this.props.navigation}></LoginComponent>
		);
	}
}
