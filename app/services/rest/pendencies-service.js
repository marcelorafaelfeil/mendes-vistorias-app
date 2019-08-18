import { API } from '../../core/api-context';
import { FormatDashboardData } from '../../screens/collector/dashboard/format-dashboard-data';
import { BindVariable } from '../../utils/bind-variable';
import api from '../interceptor/api';
import { PendencyValidation } from '../validation/pendency-validation';
import { ObservationService } from '../../screens/collector/inspection/screens/observation-screen/services/observation-service';

export class PendenciesService {
	static selectedPendency;

	static getMyPendencies = () => {
		return api.get(API.GET_MY_PENDENCIES, {
		})
			.then((response) => {
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

	static getFormByInspection(id) {
		return api.get(API.GET_FORM_BY_INSPECTION, {
			params: { id }
		})
			.then((response) => {
				return response.data.fields;
			})
			.catch(err => {
				console.warn('Erro ao buscar pendências: ', err);
			});
	}

	static getPendency = id => {
		const url = BindVariable.bind(API.GET_PENDENCY, { id });
		return api.get(url, {
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

	static savePendency = (data) => {
		const validation = new PendencyValidation(data);
		validation.validateGeneralData();
	}

	static getFormPendencyForm = () => {
		if (
			!!PendenciesService.selectedPendency &&
			!!PendenciesService.selectedPendency.insurerProduct &&
			!!PendenciesService.selectedPendency.insurerProduct.product &&
			!!PendenciesService.selectedPendency.insurerProduct.product.form &&
			!!PendenciesService.selectedPendency.insurerProduct.product.form.fields
		) {
			const fields = PendenciesService.selectedPendency.insurerProduct.product.form.fields;
			return fields;
		}
		return []
	}

	static frustrateInspection = (id, justification) => {
		console.info(`Frustrar inspeção [id=${id}, justification=${justification}]`);
		return api.post(API.FRUSTRATE_INSPECTION, {
			inspection: { id },
			observation: {
				content: justification
			}
		}, {
				headers: {
					'Content-Type': 'application/json'
				}
			}).then(data => {
				return data;
			}).catch(err => {
				console.info('ERROR: Erro ao frustrar a inspeção.');
				console.error(err);
			});
	}

	static concludeInspection = async (id) => {
		console.info(`Concluir inspeção [id=${id}]`);

		const observation = await ObservationService.getInStorage(id);

		return api.post(API.CONCLUDE_INSPECTION, {
			inspection: { id },
			observation: {
				content: observation
			}
		}, {
				headers: {
					'Content-Type': 'application/json'
				}
			}).then(data => {
				return data;
			}).catch(err => {
				console.info('ERROR: Erro ao concluir a inspeção.');
				console.error(err);
			});
	}
}
