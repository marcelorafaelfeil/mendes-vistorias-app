import { AsyncStorage } from 'react-native';

export default class PhotosService {
	static TAG_PHOTOS = 'inspection@photos@';

	static loadPhotosOfStorage = async id => {
		const photos = await AsyncStorage.getItem(
			PhotosService.TAG_PHOTOS + id
		);
		if (!!photos) {
			return JSON.parse(photos);
		}
		return [];
	};

	static savePhoto = (photos, id) => {
		AsyncStorage.setItem(PhotosService.TAG_PHOTOS + id, JSON.stringify(photos));
	};
}
