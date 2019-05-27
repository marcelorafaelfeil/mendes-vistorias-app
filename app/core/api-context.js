export const API_CONTEXT = 'http://192.168.0.13:8080/api';
export const TEMP_TOKEN = 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI2MiIsImlhdCI6MTU1ODc4OTgwOCwiZXhwIjoxNTU5Mzk0NjA4LCJuYW1lIjoiR3VzdGF2byBGZWxpcGUgU8OpcmdpbyBkYSBDb25jZWnDp8OjbyIsImVtYWlsIjoiY2F1ZS5jZXNhckBtZW5kZXN3ZWIuY29tLmJyIiwicm9sZXMiOlt7ImF1dGhvcml0eSI6IlJPTEVfQ09MTEVDVE9SIn1dfQ.D6yUVvmvHU3h4CkFeXyfPlCiJWt5VSIo2kAclCL1u7ufGSy7Wbj6GCZqeolAHWwyBFRfc9c4Maz12TTL0Dp6SA'

export const API = {
	GET_MY_PENDENCIES: API_CONTEXT + '/collector/pendency/getMyPendencies',
	GET_PENDENCY: API_CONTEXT + '/collector/pendency/getMyPendencyById/{id}'
};
