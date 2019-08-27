import { GetData } from '../../../../utils/get-data';

export class TimeFormatter {
	date;
	constructor(date) {
		this.date = date;
	}

	getHoursInNumber() {
		return GetData.hoursInNumber(this.date);
	}
}