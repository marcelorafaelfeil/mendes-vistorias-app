export class GetData {
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
}
