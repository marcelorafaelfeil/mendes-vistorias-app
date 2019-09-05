import { AsyncStorage } from 'react-native';
import { MemoryFlags } from '../../utils/memory-flags';

export class PhotosService {
	static photosTemplate;

	static savePhotosTemplate = (photosTemplate, inspection) => {
		AsyncStorage.setItem(MemoryFlags.photosTemplate(inspection), JSON.stringify(photosTemplate));
	}

	static getPhotosTemplate = async(inspection) => {
		const json = await AsyncStorage.getItem(MemoryFlags.photosTemplate(inspection));
		const photosTemplate = JSON.parse(json);
		console.log('Template: ', photosTemplate);
		return photosTemplate;
	}
}