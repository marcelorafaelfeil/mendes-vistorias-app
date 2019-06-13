export const API_CONTEXT = 'http://192.168.0.13:8080/api';
export const TEMP_TOKEN = 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI2MiIsImlhdCI6MTU1OTUzNDM3OSwiZXhwIjoxNTYwMTM5MTc5LCJuYW1lIjoiR3VzdGF2byBGZWxpcGUgU8OpcmdpbyBkYSBDb25jZWnDp8OjbyIsImVtYWlsIjoiY2F1ZS5jZXNhckBtZW5kZXN3ZWIuY29tLmJyIiwicm9sZXMiOlt7ImF1dGhvcml0eSI6IlJPTEVfQ09MTEVDVE9SIn1dfQ.3S4VSuwtl-wW2dExohsU9zv0-BNX9A4WV77uTEwsyYpP2AfseHo0UR8bRgQIK3s9BiFRm1FE1valxyr26gGZzg'

export const API = {
	GET_MY_PENDENCIES: API_CONTEXT + '/collector/pendency/getMyPendencies',
	GET_PENDENCY: API_CONTEXT + '/collector/pendency/getMyPendencyById/{id}'
};
