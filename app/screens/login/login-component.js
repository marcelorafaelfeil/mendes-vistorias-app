import React from 'react';
import { Alert, Image, Keyboard, KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';
import { CustomActivityIndicatorComponent } from '../../components/loading/custom-activity-indicator-component';
import { Auth } from '../../services/auth/auth-service';

export class LoginComponent extends React.Component {
	state = {
		email: '',
		password: '',
		loaded: false
	}

	async componentWillMount() {
		if (await Auth.isAuthenticated()) {
			this.props.navigation.navigate('Welcome');
		} else {
			this.setState({loaded: true});
		}
	}

	async _doAuth() {
		Auth.doAuth({email: this.state.email, password: this.state.password}).then((data) => {
			console.log('É 2...', data);
			if (data) {
				this.props.navigation.dispatch(StackActions.reset({
					index: 0,
					key: null,
					actions: [
						NavigationActions.navigate({routeName: 'Dashboard'})
					]
				}));
			} else {
				Alert.alert('E-mail ou senha inválidos.');
			}
		});
	}

	render() {
		if (!this.state.loaded) {
			return <CustomActivityIndicatorComponent />
		}
		return (
			<KeyboardAvoidingView
				style={styles.content}
				behavior="padding"
				enabled
			>
				<SafeAreaView style={styles.flex}>
					<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
						<View style={styles.flex}>
							<View style={styles.contentTitle}>
								<Image
									style={styles.logo}
									resizeMode={'contain'}
									source={require('./logo.png')}
								/>
								{/*<Text style={styles.title}>Mendes Vistoria</Text>*/}
							</View>
							<View style={styles.contentForm}>
								<TextInput
									value={this.state.email}
									style={styles.input}
									autoCapitalize={'none'}
									placeholderTextColor={
										'rgba(255, 255, 255, 0.6)'
									}
									placeholder="usuario@exemplo.com.br"
									textContentType="emailAddress"
									keyboardType="email-address"
									onChangeText={(text) => this.setState({email: text})}
								/>
								<TextInput
									value={this.state.password}
									style={styles.input}
									autoCapitalize={'none'}
									placeholderTextColor={
										'rgba(255, 255, 255, 0.6)'
									}
									placeholder="senha"
									secureTextEntry={true}
									textContentType="password"
									onChangeText={(text) => this.setState({password: text})}
								/>
								<TouchableOpacity
									style={styles.loginButton}
									onPress={() => this._doAuth()}
								>
									<View style={styles.button}>
										<Text style={styles.buttonTextColor}>
											Login
										</Text>
									</View>
								</TouchableOpacity>
								{/* <TouchableOpacity
									style={styles.loginRememberPassword}
								>
									<View>
										<Text style={styles.linkTextColor}>
											Esqueci minha senha
										</Text>
									</View>
								</TouchableOpacity> */}
							</View>
						</View>
					</TouchableWithoutFeedback>
				</SafeAreaView>
			</KeyboardAvoidingView>
		);
	}
}

const styles = StyleSheet.create({
	content: {
		flex: 1,
		backgroundColor: '#25e87a'
	},
	flex: {
		flex: 1
	},
	contentForm: {
		flex: 2,
		padding: 15,
		paddingTop: 0
	},
	contentTitle: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	title: {
		fontSize: 32,
		color: '#FFF'
	},
	logo: {
		width: 230
	},
	input: {
		padding: 15,
		marginTop: 5,
		marginBottom: 5,
		color: '#FFF',
		backgroundColor: '#1baa59'
	},
	button: {
		marginTop: 5,
		padding: 15,
		backgroundColor: '#FFF',
		alignItems: 'center'
	},
	loginButton: {
		marginBottom: 15
	},
	loginRememberPassword: {
		marginTop: 15,
		alignItems: 'center'
	},
	buttonTextColor: {
		color: '#333'
	},
	linkTextColor: {
		color: '#FFF'
	}
});
