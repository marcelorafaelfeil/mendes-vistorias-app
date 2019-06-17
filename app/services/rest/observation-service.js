import { API } from '../../core/api-context';
import { GetData } from '../../utils/get-data';
import { BindVariable } from '../../utils/bind-variable';

export class ObservationRestService {
	static getObservation = id => {
		const url = BindVariable.bind(API.GET_OBSERVATION, { id });
		return fetch(url, {
			method: 'GET'
		})
			.then(r => r.json())
			.then(response => {
				if (!!response) {
					response.forEach((r, index) => {
						response[index].date = GetData.stringToCompleteData(
							new Date(r.date)
						);
					});
				}
				return response;
			})
			.catch(e => {
				console.error('Erro ao buscar as observações.', e);
			});
	};
}
