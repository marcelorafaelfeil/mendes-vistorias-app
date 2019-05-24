export const API_CONTEXT = 'http://192.168.0.13:8080/api';
export const TEMP_TOKEN = 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI2MiIsImlhdCI6MTU1ODE1NzkyNiwiZXhwIjoxNTU4NzYyNzI2LCJuYW1lIjoiR3VzdGF2byBGZWxpcGUgU8OpcmdpbyBkYSBDb25jZWnDp8OjbyIsImVtYWlsIjoiY2F1ZS5jZXNhckBtZW5kZXN3ZWIuY29tLmJyIiwicm9sZXMiOlt7ImF1dGhvcml0eSI6IlJPTEVfQ09MTEVDVE9SIn1dfQ.GgCY7d8L50hG0cYW6VYau3RUrDBhSWxQDDO0yn0rSYrSh0flW9H1TphXschOVO_x62o_6ddbv4uAM_UpR2ZvxQ'

export const API = {
	GET_MY_PENDENCIES: API_CONTEXT + '/collector/pendency/getMyPendencies',
	GET_PENDENCY: API_CONTEXT + '/collector/pendency/getMyPendencyById/{id}'
};
