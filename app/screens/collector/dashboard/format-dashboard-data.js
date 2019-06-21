import moment from 'moment';

export class FormatDashboardData {
	_data = [];
	_formattedData = [];
	_latePendencies = [];
	_deadlineRisksPendencies = [];
	_newPendencies = [];

	constructor(d) {
		if (!!d) {
			this._data = d;
			this._formattedData = this._data.map(d => {
				return {
					id: d.id,
					name: d.client.name,
					address: d.client.address,
					time: this.getTimeDiff(new Date(d.endDate), new Date())
				};
			});

			this.doParse();
		}
	}

	setData(d) {
		this._data = d;
	}

	getLatePendencies() {
		return this._latePendencies;
	}

	getDeadlineRiskPendencies() {
		return this._deadlineRisksPendencies;
	}

	getNewPendencies() {
		return this._newPendencies;
	}

	getTimeDiff(dateMajor, dateMinor) {
		// Calcula a quantidade de tempo que a tarefa está atrasada
		const dMinor = moment(dateMinor);
		const dMajor = moment(dateMajor);

		const diffMinutes = dMajor.diff(dMinor, 'minutes');
		const diffHours = dMajor.diff(dMinor, 'hours');
		const diffDays = dMajor.diff(dMinor, 'days');
		var quantity = diffMinutes;
		var minutes = diffMinutes;
		var unit = 'minutos';
		// alert(`${dMajor.format('DD/MM/YYYY')} = ${dMinor.format('DD/MM/YYYY')}`);

		if (diffMinutes < -60 && diffHours >= -24) {
			quantity = diffHours;
			unit = 'horas';
		}
		if (diffHours < -24) {
			quantity = diffDays;
			unit = 'dias'
		}
		return {quantity, minutes, unit};
	}

	doParse() {
		this._formattedData.forEach(d => {
			
			if (d.time.minutes < 0) {
				this._latePendencies.push(d);
			} else if ((d.time.minutes * 60) < 24) {
				this._deadlineRisksPendencies.push(d);
			} else {
				this._newPendencies.push(d);
			}
		});
	}
}
