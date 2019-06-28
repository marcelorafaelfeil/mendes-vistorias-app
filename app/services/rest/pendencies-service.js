import { API } from '../../core/api-context';
import { FormatDashboardData } from '../../screens/collector/dashboard/format-dashboard-data';
import { BindVariable } from '../../utils/bind-variable';
import api from '../interceptor/api';
import { PendencyValidation } from '../validation/pendency-validation';

export class PendenciesService {
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
				console.warn('Erro ao buscar: ', err);
			});
	};

	static getPendency = id => {
		const url = BindVariable.bind(API.GET_PENDENCY, { id });
		return api.get(url, {
			method: 'GET'
		})
			.then(({data}) => {return data;})
			.catch(err => {
				console.error('err: ', err);
			});
	};

	static savePendency = (data) => {
		const validation = new PendencyValidation(data);
		validation.validateGeneralData();
	}
}
