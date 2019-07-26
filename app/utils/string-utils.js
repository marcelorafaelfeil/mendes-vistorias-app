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

	static getTenant(email) {
		if (email.indexOf('@') >= 0) {
			const e = email.split('@');
			if (e[1].indexOf('.') >= 0) {
				const tenant = e[1].split('.')[0];
				return tenant;
			}
			return e[1];
		}
		return email;
	}
}