import React from 'react';
import {
	Text,
	View,
	Alert,
	StyleSheet,
	Image,
	Keyboard,
	TextInput,
	SafeAreaView,
	TouchableOpacity,
	TouchableWithoutFeedback,
	KeyboardAvoidingView
} from 'react-native';

export class LoginComponent extends React.Component {
	_doAuth() {
		// fetch();
		this.props.navigation.navigate('DashboardScreen');
		// Alert.alert('Login ou senha incorretos'); 
	}

	render() {
		return (
			<KeyboardAvoidingView style={styles.content} behavior='padding' enabled>
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
									style={styles.input}
									autoCapitalize={'none'}
									placeholderTextColor={
										'rgba(255, 255, 255, 0.6)'
									}
									placeholder='usuario@exemplo.com.br'
									textContentType='emailAddress'
									keyboardType='email-address'
								/>
								<TextInput
									style={styles.input}
									autoCapitalize={'none'}
									placeholderTextColor={
										'rgba(255, 255, 255, 0.6)'
									}
									placeholder='senha'
									secureTextEntry={true}
									textContentType='password'
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
								<TouchableOpacity
									style={styles.loginRememberPassword}
								>
									<View>
										<Text style={styles.linkTextColor}>
											Esqueci minha senha
										</Text>
									</View>
								</TouchableOpacity>
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
		backgroundColor: 'rgba(0, 0, 0, 0.25)'
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
