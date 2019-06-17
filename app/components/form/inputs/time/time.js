import { GetData } from '../../../../utils/get-data';

export class Time {
	date = null;

	constructor(date) {
		this.date = date;
	}

	getHoursInNumber() {
		return GetData.hoursInNumber(this.date);
	}
}