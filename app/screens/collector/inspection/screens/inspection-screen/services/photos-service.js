import { AsyncStorage } from 'react-native';
import { API } from '../../../../../../core/api-context';
import { BindVariable } from '../../../../../../utils/bind-variable';
import { GetData } from '../../../../../../utils/get-data';
import api from '../../../../../../services/interceptor/api';
import { MemoryFlags } from '../../../../../../utils/memory-flags';

export default class PhotosService {
	static TAG_PHOTOS = 'inspection@photos@';

	/**
	 * @description Carrega as fotos que estão salvas na memória do celular.
	 */
	static loadPhotosOfStorage = async id => {
		const photos = await AsyncStorage.getItem(
			PhotosService.TAG_PHOTOS + id
		);
		if (!!photos) {
			return JSON.parse(photos);
		}
		return [];
	};

	/**
	 * @description Salva a imagem no banco de dados, relacionando com a inspeção selecionada.
	 * @params {photo, id}
	 */
	static savePhoto = (photo, id) => {
		console.info(`Upload de foto para a inspeção [id=${id}]`);
		const url = BindVariable.bind(API.UPDATE_PHOTOS, { id });
		const d = new Date();

		const photoData = new FormData();
		let photoName =
			d.getFullYear() +
			'-' +
			GetData.leadingZero(d.getMonth()) +
			'-' +
			GetData.leadingZero(d.getDate()) +
			'-';
		photoName +=
			GetData.leadingZero(d.getHours()) +
			GetData.leadingZero(d.getMinutes()) +
			GetData.leadingZero(d.getSeconds());
		photoName += GetData.leadingZero(d.getMilliseconds()) + '.jpg';

		photoData.append('photo', {
			uri: photo.uri,
			type: 'image/jpg',
			name: photoName
		});

		if (!!photo.exif) {
			photoData.append('raw', JSON.stringify(photo.exif));
			if (!!photo.exif.GPSLatitude && !!photo.exif.GPSLongitude) {
				const latitude = photo.exif.GPSLatitude;
				const longitude = photo.exif.GPSLongitude;

				photoData.append('latitude', latitude * -1);
				photoData.append('longitude', longitude * -1);
			}
			if (!!photo.exif.DateTimeOriginal) {
				const dateTimeOriginal = GetData.stringToDateTime(
					photo.exif.DateTimeOriginal,
					':'
				);
				photoData.append('tookAt', dateTimeOriginal.toISOString());
			}
		}

		return api
			.post(url, photoData)
			.then(response => {
				console.info('Foto salva com sucesso.');
				return response;
			})
			.catch(err => {
				console.error('Erro ao retornar os dados da inspeção: ', err);
			});
	};

	static removePhoto = (id) => {
		console.info(`Remover foto [id=${id}]`);

		return api.delete(API.REMOVE_PHOTOS, {
			params: { id }
		}).then((data) => {
			console.info('Foto removida com sucesso.');
			return data;
		}).catch(err => {
			console.error('Erro ao remover a foto do banco de dados.', err);
		});
	}

	static savePhotosTemplate = (photosTemplate, inspection) => {
		AsyncStorage.setItem(MemoryFlags.photosTemplate(inspection), JSON.stringify(photosTemplate));
	}

	static getPhotosTemplate = async(inspection) => {
		const json = await AsyncStorage.getItem(MemoryFlags.photosTemplate(inspection));
		const photosTemplate = JSON.parse(json);
		return photosTemplate;
	}
}
