import * as Permissions from 'expo-permissions';

export class LocationService {
	static askPermission = async () => {
		var finalStatus;
		const { status: existingStatus } = await Permissions.getAsync(
			Permissions.LOCATION
		);

		finalStatus = existingStatus;

		if (existingStatus !== 'granted') {
			const { status } = await Permissions.askAsync(
				Permissions.LOCATION
			);
			finalStatus = status;
		}
		return finalStatus;
	}
}