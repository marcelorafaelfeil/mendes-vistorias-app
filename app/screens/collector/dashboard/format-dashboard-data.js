import moment from 'moment';

export class FormatDashboardData {
	_data = [];
	_formattedData = [];
	_latePendencies = [];
	_deadlineRisksPendencies = [];
	_newPendencies = [];
	_schedulePendencies = [];

	constructor(d) {
		if (!!d) {
			this._data = d;
			this._formattedData = this._data.map(d => {
				return {
					id: d.id,
					name: d.client.name,
					address: d.client.address,
					schedules: d.schedules,
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

	getSchedulePendencies() {
		return this._schedulePendencies;
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

		if (diffDays < -1 || diffDays > 1) {
			quantity = diffDays;
			unit = 'dias';
		} else if (diffHours < -1 || diffHours > 1) {
			quantity = diffHours;
			unit = 'horas';
		} else if (diffMinutes < -1 || diffMinutes > 1) {
			quantity = diffMinutes;
			unit = 'minutos';
		}
		/*if (diffMinutes < -60 && diffHours >= -24) {
			quantity = diffHours;
			unit = 'horas';
		}
		 if (diffHours >= 24 || diffHours <= -24) {
			quantity = diffDays;
			unit = 'dias'
		}
		if (quantity < 0) {
			quantity = quantity*(-1);
		} */
		return {quantity, minutes, unit};
	}

	doParse() {
		this._formattedData.forEach(d => {
			if (!!!d.schedules || d.schedules.length === 0) {
				if (d.time.minutes < 0) {
					this._latePendencies.push(d);
				} else if ((d.time.minutes * 60) < 24) {
					this._deadlineRisksPendencies.push(d);
				} else {
					this._newPendencies.push(d);
				}
			} else {
				this._schedulePendencies.push(d);
			}
		});
	}
}
