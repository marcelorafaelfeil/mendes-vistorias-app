export class GetData {
	static getTime(date) {
		if (!!date) {
			var hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
			var minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();

			return `${hours}:${minutes}`
		} else {
			return '';
		}
	}

	static getAddress(data) {
		var address = '';

		if (!!data) {
			address += data.street;
			if (!!data.number) {
				address += ', ' + data.number;
			}
			if (!!data.city) {
				address += ', ' + data.city.name;
				if (!!data.city.state) {
					address += ' - ' + data.city.state.uf;
				}
			}
		}
		return address;
	}

	static hoursInNumber(date) {
		const hours = date.getHours();
		const minutes = date.getMinutes();
		const convertToMinutes = (hours * 60) + minutes;
		return convertToMinutes;
	}

	static numberInHoursToString(date) {
		const hours = Math.floor(date/60);
		const minutes = date % 60;
		return `${hours}:${minutes}`;
	}

	static numberInHoursToDate(date) {
		const hours = Math.floor(date/60);
		const minutes = date % 60;
		const newDate = new Date();
		newDate.setHours(hours);
		newDate.setMinutes(minutes);
		return newDate;
	}
}
