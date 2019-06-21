import { API, TEMP_TOKEN } from '../../core/api-context';
import { FormatDashboardData } from '../../screens/collector/dashboard/format-dashboard-data';
import { BindVariable } from '../../utils/bind-variable';
import { PendencyValidation } from '../validation/pendency-validation';
import api from '../interceptor/api';

export class PendenciesService {
	static getMyPendencies = () => {
		return api.get(API.GET_MY_PENDENCIES, {
		})
			.then(({data}) => {
				const formatter = new FormatDashboardData(data);
				const latePendencies = formatter.getLatePendencies();
				const deadlinePendencies = formatter.getDeadlineRiskPendencies();
				const newPendencies = formatter.getNewPendencies();

				return {
					latePendencies: latePendencies,
					deadlinePendencies: deadlinePendencies,
					newPendencies: newPendencies
				};
			})
			.catch(err => {
				console.warn('Erro ao buscar: ', err);
			});
	};

	static getPendency = id => {
		const url = BindVariable.bind(API.GET_PENDENCY, { id });
		return fetch(url, {
			headers: {
				Authorization: TEMP_TOKEN
			},
			method: 'GET'
		})
			.then(response => response.json())
			.catch(err => {
				console.error('err: ', err);
			});
	};

	static savePendency = (data) => {
		const validation = new PendencyValidation(data);
		validation.validateGeneralData();
	}
}
