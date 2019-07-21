import { AsyncStorage } from 'react-native';
import api from '../../../../../../services/interceptor/api';
import { API } from '../../../../../../core/api-context';
import { StringUtils } from '../../../../../../utils/string-utils';
import Axios from 'axios';

export class GeneralDataService {
	constructor() {}

	static cancelToken = null;

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

	static syncData(data) {
		// Tenta sincronizar os dados com o sistema online
		GeneralDataService.syncWithSystem(data).then;
	}

	static syncWithSystem(data, inspection) {
		if (GeneralDataService.cancelToken !== null) {
			GeneralDataService.cancelToken.cancel();
		}
		const params = GeneralDataService.serializeData(data, inspection);
		const cancelToken = Axios.CancelToken;
		GeneralDataService.cancelToken = cancelToken.source();

		console.info(
			`Sincronizando informações da inspeção [id=${inspection}]`
		);
		AsyncStorage.setItem(
			`geleral@form@${inspection}`,
			JSON.stringify(data)
		);

		return api
			.put(API.SYNC_WITH_SYSTEM, params, {
				cancelToken: GeneralDataService.cancelToken.token
			})
			.then(data => {})
			.catch(err => {
				console.error('Erro ao sincronizar dados.', err);
			});
	}

	static serializeData(data, inspection) {
		return {
			generalInspectionInformation: {
				expedientFrom: data.expedientFrom,
				expedientTo: data.expedientTo,
				quantityOfEmployees: data.employeesQuantity,
				areaSize: !!data.groundSize
				? StringUtils.toFloat(data.groundSize)
				: 0,
				builtArea: !!data.builtArea
				? StringUtils.toFloat(data.builtArea)
				: 0,
				inLocalSince: data.builtDate,
				buildAge: data.builtAge,
				quantityOfPavement: data.quantityOfPaviments,
				valueOfConstruction: !!data.builtAmount
					? StringUtils.toFloat(data.builtAmount)
					: 0,
				commercialActivity: !!data.comercialLocalActivity
					? data.comercialLocalActivity
					: 'NO',
				condition: data.condition === '' ? null : data.condition,
				whoFollowIR: data.nameIRFollower,
				function: data.function,
				phone: !!data.phone ? data.phone : '',
				cellPhone: !!data.cellPhone ? data.cellPhone : '',
				inspectorCpf: data.inspectorCPF,
				inspectorName: data.inspectorName,
				irDate: data.irDate,
				risk: !data.riskItem
					? null
					: {
							id: data.riskItem
					  },
				localActivity: data.localActivity,
				riskNote: data.riskNote === '' ? null : data.riskNote,
				justification: data.technicalJustification
			},
			inspection: {
				id: inspection
			}
		};
	}
	static unserializeData(response, inspection) {
		const data = response.data;
		return {
			expedientFrom: data.expedientFrom,
			expedientTo: data.expedientTo,
			employeesQuantity: !!data.quantityOfEmployees
				? data.quantityOfEmployees.toString()
				: '',
			groundSize: !!data.areaSize ? data.areaSize.toString() : '',
			builtArea: !!data.builtArea ? data.builtArea.toString() : '',
			builtDate: !!data.inLocalSince ? data.inLocalSince : '',
			builtAge: !!data.buildAge ? data.buildAge.toString() : '',
			quantityOfPaviments: !!data.quantityOfPavement
				? data.quantityOfPavement.toString()
				: '',
			builtAmount: !!data.valueOfConstruction
				? data.valueOfConstruction.toString()
				: '',
			comercialLocalActivity: !!data.commercialActivity
				? data.commercialActivity.toString()
				: '',
			condition:
				data.condition === ''
					? null
					: data.condition === 'OWNER'
					? 0
					: 1,
			nameIRFollower: data.whoFollowIR,
			function: data.function,
			inspectorCPF: data.inspectorCpf,
			inspectorName: data.inspectorName,
			irDate: data.irDate,
			phone: data.phone,
			cellPhone: data.cellPhone,
			riskItem: !!data.risk && !!data.risk.id ? data.risk.id : null,
			localActivity: data.localActivity,
			riskNote:
				data.riskNote === ''
					? null
					: GeneralDataService.unserializeRiskNoteEnum(data.riskNote),
			technicalJustification: data.justification
		};
	}

	static unserializeRiskNoteEnum(risk) {
		let value;
		switch (risk) {
			case 'GREATE':
				value = 1;
				break;
			case 'VERY_GOOD':
				value = 2;
				break;
			case 'GOOD':
				value = 3;
				break;
			case 'REGULAR':
				value = 4;
				break;
			case 'BAD':
				value = 5;
				break;
			case 'TERRIBLE':
				value = 6;
			default:
				value = 4;
				break;
		}
		return value;
	}

	static getData(inspection) {
		return api
			.get(API.SYNC_WITH_SYSTEM, {
				params: { inspection }
			})
			.then(GeneralDataService.unserializeData)
			.catch(err => {
				console.error('Erro ao retornar os dados da inspeção: ', err);
				var data = JSON.parse(
					AsyncStorage.getItem(`geleral@form@${inspection}`)
				);
				return data;
			});
	}
}
