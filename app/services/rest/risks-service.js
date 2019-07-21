import { API } from '../../core/api-context';
import api from '../interceptor/api';

export class RisksService {
	static getRisks = () => {
		return api.get(API.GET_RISKS, {
		})
			.then(response => {
				const data = [];
				if (!!response && !!response.data) {
					const risks = response.data;
					risks.forEach((d, index) => {
						data.push({
							label: d.code + ' - ' + d.title,
							value: d.id
						});
					});
				}
				return data;
			})
			.catch(err => {
				console.error('Erro ao buscar riscos: ', err);
			});
	};
}
