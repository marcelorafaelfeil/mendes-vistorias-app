import { AsyncStorage } from 'react-native';
import { API } from '../../core/api-context';
import NavigationService from '../navigation-service';

export class Auth {
	static TAG = 'auth';
	static TAG_TOKEN = '@token';

	static doAuth(params) {
		return fetch(API.DO_AUTH, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(params)
		}).then(r => r.json()).then((data) => {
			if (!!data.access_token) {
				Auth.saveToken(data.access_token);
				return true;
			}
			return false;
		})
	}

	static saveToken(token) {
		AsyncStorage.setItem(Auth.TAG_TOKEN, token);
	}

	static getToken() {
		return AsyncStorage.getItem(Auth.TAG_TOKEN);
	}

	static isAuthenticated() {
		return AsyncStorage.getItem(Auth.TAG_TOKEN).then(data => {
			return !!data;
		});
	}

	static clearToken() {
		AsyncStorage.removeItem(Auth.TAG_TOKEN);
	}

	static logout() {
		Auth.clearToken();
		NavigationService.resetTo('Login');
	}
}