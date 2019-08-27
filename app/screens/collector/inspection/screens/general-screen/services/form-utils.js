export class FormUtils {
	static getValueAs(type, value) {
		let valueAs = FormUtils.getValueAsType(type);
		let isRange = (valueAs === 'DATE_RANGE' || valueAs === 'TIME_RANGE');

		const objValue = {};
		if (isRange) {
			objValue[valueAs] = value.to;
			objValue[`${valueAs}_2`] = value.from;
		} else {
			objValue[valueAs] = value;
		}
		return objValue;
	}

	static getValueAsType(type) {
		let valueAs = 'valueAs';
		switch (type) {
			case 'LIST':
				valueAs += 'Integer';
				break;
			case 'NUMBER':
				valueAs += 'Integer';
				break;
			case 'METRIC':
				valueAs += 'Float';
				break;
			case 'MONEY':
				valueAs += 'Float';
				break;
			case 'DATE':
				valueAs += 'Date';
				break;
			case 'DATE_TIME':
				valueAs += 'Date'
				break;
			case 'DATE_RANGE':
				valueAs += 'Date';
				break;
			case 'TIME':
				valueAs += 'Integer';
				break;
			case 'TIME_RANGE':
				valueAs += 'Integer';
				break;
			default:
				valueAs += 'String';
		}
		return valueAs;
	}
}