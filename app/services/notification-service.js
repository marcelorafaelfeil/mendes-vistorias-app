import Axios from 'axios';
import { Notifications, Permissions } from 'expo';
import { API } from '../core/api-context';

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
			Axios.post(API.SAVE_NOTIFICATION_TOKEN, {
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