
export class BindVariable {
	static bind(str, variables) {
		for (var i = 0; i < Object.keys(variables).length; i++) {
			const k = Object.keys(variables)[i];
			str = str.split('{' + k + '}').join(variables[k]);
		}
		return str;
	}
}
