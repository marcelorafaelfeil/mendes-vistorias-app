import { API, TEMP_TOKEN } from '../../core/api-context';
import { FormatDashboardData } from '../../screens/collector/dashboard/format-dashboard-data';
import { BindVariable } from '../../utils/bind-variable';

export class PendenciesService {
	static getMyPendencies = () => {
		return fetch(API.GET_MY_PENDENCIES, {
			method: 'GET',
			headers: {
				Authorization: TEMP_TOKEN
			}
		})
			.then(response => response.json())
			.then(response => {
				const formatter = new FormatDashboardData(response);
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
				console.error('err: ', err);
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
}
