import { API, TEMP_TOKEN } from '../../core/api-context';

export class RisksService {
	static getRisks = () => {
		return fetch(API.GET_RISKS, {
			method: 'GET',
			headers: {
				Authorization: TEMP_TOKEN
			}
		})
			.then(response => response.json())
			.then(response => {
				const data = [];
				if (!!response) {
					response.forEach((d, index) => {
						data.push({
							label: d.code + ' - ' + d.title,
							value: d.id
						});
					});
				}
				return data;
			})
			.catch(err => {
				console.error('err: ', err);
			});
	};
}
