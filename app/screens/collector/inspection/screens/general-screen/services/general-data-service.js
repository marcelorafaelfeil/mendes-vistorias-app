import { GetData } from '../../../../../../utils/get-data';

export class GeneralDataService {
	constructor() {}

	static DEFAULT_VALUE = {
		expedientFrom: '',
		expedientTo: '',
		employeesQuantity: '',
		groundSize: '',
		builtArea: '',
		builtDate: null,
		builtAge: '',
		quantityOfPaviments: '',
		builtAmount: '',
		comercialLocalActivity: '',
		condition: '',
		nameIRFollower: '',
		function: '',
		phone: '',
		cellPhone: '',
		inspectorCPF: '',
		inspectorName: '',
		irDate: null,
		riskItem: '',
		localActivity: '',
		riskNote: '',
		technicalJustification: ''
	};

	static parse(data) {
		return data;
	}
}
