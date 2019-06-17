import { AsyncStorage } from 'react-native';


export class ObservationService {
	static TAG_OBSERVATION = 'inspection@observation@';

	static saveInStorage(id, text) {
		const tag = ObservationService.TAG_OBSERVATION + id;
		AsyncStorage.setItem(tag, JSON.stringify({
			text,
			date: new Date()
		}));
	}

	static getInStorage(id) {
		const tag = ObservationService.TAG_OBSERVATION + id;
		return AsyncStorage.getItem(tag).then(response => {
			if (!!response) {
				const data = JSON.parse(response);
				return data.text;
			}
			return '';
		});
	}
}