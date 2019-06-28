export const API_CONTEXT = 'http://mendesweb.com.br:8001/api';// 'http://192.168.0.11:8080/api'; //'http://mendesweb.com.br:8001';

export const API = {
	DO_AUTH: `${API_CONTEXT}/auth`,
	GET_MY_PENDENCIES: `${API_CONTEXT}/collector/pendency/getMyPendencies`, // 'http://mendesweb.com.br:8001/collector/pendency/getMyPendencies',
	GET_PENDENCY: `${API_CONTEXT}/collector/pendency/getMyPendencyById/{id}`, // 'http://www.mocky.io/v2/5d09d5dc3400005d29d83011', // API_CONTEXT + '/getMyPendencyById/{id}',
	GET_RISKS: 'http://www.mocky.io/v2/5d09d5cf3400001229d8300f', // API_CONTEXT + '/getRisks',
	GET_OBSERVATION: 'http://www.mocky.io/v2/5d09d5a03400001229d8300c', // API_CONTEXT + '/getObservations',
	SAVE_NOTIFICATION_TOKEN: `${API_CONTEXT}/app/collector/notification/saveToken`, // 'http://www.mocky.io/v2/5d09d5f73400001129d83012' // API_CONTEXT + '/notificationToken',
};
