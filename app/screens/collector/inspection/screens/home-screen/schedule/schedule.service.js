import api from '../../../../../../services/interceptor/api';
import { API } from '../../../../../../core/api-context';

export class ScheduleService {
	static validateData = fields => {
		const errors = [];
		// Verifica se foi informado algum valor para o campo d data
		if (!!fields && !!!fields.scheduleValue) {
			errors.push({
				message: 'É necessário informar a data e hora do agendamento.'
			});
		}

		return errors;
	};

	
	static saveSchedule = async (schedule, id) => {
		console.info(`Salvar agendamento [schedule=${schedule}, id=${id}]`);
		console.log('schedule: ', schedule);
		return api
			.post(
				API.SAVE_SCHEDULE,
				{
					inspection: { id },
					schedule
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
}
