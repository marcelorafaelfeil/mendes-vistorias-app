import axios from 'axios';
import { Auth } from '../auth/auth-service';
import { NavigationActions } from 'react-navigation';

const api = axios.create();

api.interceptors.request.use(async config => {
	const accessToken = await Auth.getToken();
	
	if (!!accessToken) {
		if (config.method !== 'OPTIONS') {
			config.headers.Authorization = `Bearer ${accessToken}`;
		}
	}

	return config;
});

api.interceptors.response.use((response) => {
	return response;
}, (error) => {
	if (error.response.status === 401) {
		Auth.clearToken();
		NavigationActions.navigate(
			NavigationActions.reset({
				index: 0,
				key: null,
				actions: [
					NavigationActions.navigate({routeName: 'Login'})
				]
			})
		)
	}
	return null;
});

export default api;