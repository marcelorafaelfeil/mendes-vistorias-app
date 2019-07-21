export class StringUtils {
	static getPhone(phone) {
		if (!!phone && phone.length >= 11) {
			return phone.substring(2);
		}
		return phone;
	}

	static getPhoneDDD(phone) {
		if (!!phone && phone.length >= 11) {
			return phone.substring(0, 2);
		}
		return 0;
	}

	static toFloat(value) {
		if (!!value) {
			let v = value;
			if (value.indexOf('R$') >= 0) {
				v = v.split('R$').join('');
			}
			if (v.indexOf('.') >= 0) {
				v = v.split('.').join('');
			} 
			if (v.indexOf(',') >= 0) {
				v = v.split(',').join('.');
			}
			return parseFloat(v);
		}
		return value;
	}
}