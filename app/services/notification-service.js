import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import { API } from '../core/api-context';
import api from './interceptor/api';

export class NotificationService {
	static askPermission = async () => {
		var finalStatus;
		const { status: existingStatus } = await Permissions.getAsync(
			Permissions.NOTIFICATIONS
		);

		finalStatus = existingStatus;

		if (existingStatus !== 'granted') {
			const { status } = await Permissions.askAsync(
				Permissions.NOTIFICATIONS
			);
			finalStatus = status;
		}
		return finalStatus;
	};

	static saveNotificationToken() {
			Notifications.getExpoPushTokenAsync().then(token => {
				api.post(API.SAVE_NOTIFICATION_TOKEN, {
					token
				}).catch(err => {
					console.warn(
						'Não foi possível salvar o token de notificação.',
						err
					);
				});
			});
	}
}
