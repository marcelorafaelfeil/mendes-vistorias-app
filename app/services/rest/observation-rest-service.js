import { API } from '../../core/api-context';
import { GetData } from '../../utils/get-data';
import { BindVariable } from '../../utils/bind-variable';
import api from '../interceptor/api';

export class ObservationRestService {
	static getObservation = id => {
		const url = BindVariable.bind(API.GET_OBSERVATION, { id });
		return api.get(url, {
			params: {
				inspection: id
			}
		})
			.then(response => {
				var data = [];
				if (!!response && !!response.data) {
					data = response.data;
					data.forEach((r, index) => {
						data[index].createdAt = GetData.stringToCompleteData(
							new Date(r.createdAt)
						);
					});
				}
				return data;
			})
			.catch(e => {
				console.error('Erro ao buscar as observações.', e);
			});
	};
}
