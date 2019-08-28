import Axios from 'axios';
import { AsyncStorage } from 'react-native';
import { API } from '../../../../../../core/api-context';
import api from '../../../../../../services/interceptor/api';
import { FormUtils } from './form-utils';
import { MemoryFlags } from '../../../../../../utils/memory-flags';

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
			MemoryFlags.form(inspection),
			JSON.stringify(data)
		);

		//console.log('params: ', params);
		return api
			.put(API.SYNC_WITH_SYSTEM, params, {
				cancelToken: GeneralDataService.cancelToken.token
			})
			.catch(err => {
				console.error('Erro ao sincronizar dados.', err);
			});
	}

	static serializeData(data, inspection) {
		return {
			generalInspectionInformation: GeneralDataService.prepareData(data),
			inspection: {
				id: inspection
			}
		};
	}

	static prepareData(data) {
		const finalData = [];
		for (let i = 0; i < data.length; i++) {
			const d = data[i];
			const type = FormUtils.getValueAsType(d.type);
			const value = d[type];
			const item = {
				field: {
					id: d.id
				},
				id: !!d.value_id ? d.value_id : null
			};
			if (!!value && (!!value.from || !!value.to)) {
				item[type] = value.from;
				item[type+'2'] = value.to;
			} else {
				item[type] = !!value ? value : null;
				if (!!d[type+'2']) {
					item[type + '2'] = d[type + '2'];
				}
			}
			finalData.push(item);
		}
		return finalData;
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
					AsyncStorage.getItem(MemoryFlags.form(inspection))
				);
				return data;
			});
	}

	static mergeDataFormAndValues(form, values) {
		for ( var i = 0; i < form.length; i++) {
			const f = form[i];
			for ( var j = values.length-1; j >= 0; j--) {
				const v = values[j];
				if ( f.id === v.field.id) {
					const key = FormUtils.getValueAsType(f.type);
					form[i][key] = v[key];
					if (!!v[key+'2']) {
						form[i][key+'2'] = v[key+'2'];
					}
					form[i]['value_id'] = v.id;
					values.splice(j, 1);
				}
			}
		}
		return form;
	}
}
