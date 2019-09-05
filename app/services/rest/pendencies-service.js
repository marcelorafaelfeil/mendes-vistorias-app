import { API } from '../../core/api-context';
import { AsyncStorage } from 'react-native';
import { FormatDashboardData } from '../../screens/collector/dashboard/format-dashboard-data';
import { BindVariable } from '../../utils/bind-variable';
import api from '../interceptor/api';
import { PendencyValidation } from '../validation/pendency-validation';
import { ObservationService } from '../../screens/collector/inspection/screens/observation-screen/services/observation-service';
import { FormUtils } from '../../screens/collector/inspection/screens/general-screen/services/form-utils';
import { MemoryFlags } from '../../utils/memory-flags';
import PhotosService from '../../screens/collector/inspection/screens/inspection-screen/services/photos-service';

export class PendenciesService {
	static selectedPendency;

	static getMyPendencies = () => {
		return api
			.get(API.GET_MY_PENDENCIES, {})
			.then(response => {
				if (!!response && !!response.data) {
					const data = response.data;
					const formatter = new FormatDashboardData(data);
					const latePendencies = formatter.getLatePendencies();
					const deadlinePendencies = formatter.getDeadlineRiskPendencies();
					const newPendencies = formatter.getNewPendencies();

					return {
						latePendencies: latePendencies,
						deadlinePendencies: deadlinePendencies,
						newPendencies: newPendencies
					};
				}
				return {
					latePendencies: [],
					deadlinePendencies: [],
					newPendencies: []
				};
			})
			.catch(err => {
				console.warn('Erro ao buscar pendências: ', err);
			});
	};

	static getFormByInspection = async id => {
		return api
			.get(API.GET_FORM_BY_INSPECTION, {
				params: { id }
			})
			.then(response => {
				return response.data.fields;
			})
			.catch(err => {
				console.warn('Erro ao buscar pendências: ', err);
			});
	};

	static getFormValuesByInspection = async inspectionId => {
		return api
			.get(API.GET_FORM_VALUES_BY_INSPECTION, {
				params: { inspectionId }
			})
			.then(response => {
				return response.data;
			})
			.catch(err => {
				console.warn('Erro ao buscar pendências: ', err);
			});
	};

	static getPendency = id => {
		const url = BindVariable.bind(API.GET_PENDENCY, { id });
		return api
			.get(url, {
				method: 'GET'
			})
			.then(({ data }) => {
				PendenciesService.selectedPendency = data;
				return data;
			})
			.catch(err => {
				console.error('Erro ao buscar dados da inspeção: ', err);
			});
	};

	static savePendency = data => {
		const validation = new PendencyValidation(data);
		validation.validateGeneralData();
	};

	static getFormPendencyForm = () => {
		if (
			!!PendenciesService.selectedPendency &&
			!!PendenciesService.selectedPendency.insurerProduct &&
			!!PendenciesService.selectedPendency.insurerProduct.product &&
			!!PendenciesService.selectedPendency.insurerProduct.product.form &&
			!!PendenciesService.selectedPendency.insurerProduct.product.form
				.fields
		) {
			const fields =
				PendenciesService.selectedPendency.insurerProduct.product.form
					.fields;
			return fields;
		}
		return [];
	};

	static frustrateInspection = (id, justification) => {
		console.info(
			`Frustrar inspeção [id=${id}, justification=${justification}]`
		);
		return api
			.post(
				API.FRUSTRATE_INSPECTION,
				{
					inspection: { id },
					observation: {
						content: justification
					}
				},
				{
					headers: {
						'Content-Type': 'application/json'
					}
				}
			)
			.then(data => {
				return data;
			})
			.catch(err => {
				console.info('ERROR: Erro ao frustrar a inspeção.');
				console.error(err);
			});
	};

	static concludeInspection = async id => {
		console.info(`Concluir inspeção [id=${id}]`);

		const observation = await ObservationService.getInStorage(id);

		return api
			.post(
				API.CONCLUDE_INSPECTION,
				{
					inspection: { id },
					observation: {
						content: observation
					}
				},
				{
					headers: {
						'Content-Type': 'application/json'
					}
				}
			)
			.then(data => {
				return data;
			})
			.catch(err => {
				console.info('ERROR: Erro ao concluir a inspeção.');
				console.error(err);
			});
	};

	static isPendencyValid = async id => {
		const json = await AsyncStorage.getItem(MemoryFlags.form(id));
		const data = JSON.parse(json);
		let isValid = true;
		const photosTemplate = await PhotosService.getPhotosTemplate(id);
		const photos = await PhotosService.loadPhotosOfStorage(id);

		// Verifica se há algum campo obrigatório
		if (!!data || !!photosTemplate) {
			if (!!data) {
				data.forEach((field, index) => {
					field['errors'] = null;
					if (field.isRequired) {
						const key = FormUtils.getValueAsType(field.type);
						// Verifica se o valor é nulo
						if (!field[key]) {
							isValid = false;
							// Adiciona uma chave de erro
							PendenciesService.addErrorInField(
								field,
								'required',
								true
							);
						}
					}
				});
			}
			if (!!photosTemplate) {
				photosTemplate.photosTemplateItems.forEach(template => {
					if (template.required) {
						let found = false;
						for ( var i = 0 ; i < photos.length; i++ ) {
							const photo = photos[i];
							if (!!photo.template && (photo.template.id === template.id)) {
								found = true;
								break;
							}
						}
						if (!found) {
							PendenciesService.addErrorInPhotoTemplate(
								template,
								'required',
								true
							);
							isValid = false;
						}
					}
				});
			}
		} else {
			isValid = false;
		}
		return { isValid, data, photosTemplate };
	};

	static addErrorInField(field, flag, status) {
		if (!field['errors']) {
			field['errors'] = {};
		}
		Object.assign(field['errors'], { [flag]: status });
	}

	static addErrorInPhotoTemplate(template, flag, status) {
		if (!template['errors']) {
			template['errors'] = {};
		}
		Object.assign(template['errors'], { [flag]: status });
	}

	static getFormData = async id => {
		const json = await AsyncStorage.getItem(MemoryFlags.form(id));
		const data = JSON.parse(json);
		return data;
	};

	static createForm = async (id, form) => {
		const json = await AsyncStorage.getItem(MemoryFlags.form(id));
		// Se não houver um formulário salvo
		if (!!!json) {
			// salva um formulário vazio
			AsyncStorage.setItem(MemoryFlags.form(id), JSON.stringify(form));
		}
	};
}
