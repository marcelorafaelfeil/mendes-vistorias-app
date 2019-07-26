import { AsyncStorage } from 'react-native';
import { API } from '../../core/api-context';
import NavigationService from '../navigation-service';
import { StringUtils } from '../../utils/string-utils';

export class Auth {
	static TAG = 'auth';
	static TAG_TOKEN = '@token';

	static doAuth(params) {
		const tenant = StringUtils.getTenant(params.email);

		return fetch(API.DO_AUTH, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'X-Person-Tenant': tenant
			},
			body: JSON.stringify(params)
		}).then(r => r.json()).then((data) => {
			if (!!data.access_token) {
				Auth.saveToken(data.access_token);
				return true;
			}
			return false;
		}).catch((err) => {
			console.err(err);
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