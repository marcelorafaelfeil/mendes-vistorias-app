export const API_CONTEXT = 'http://192.168.0.13:3000';
export const TEMP_TOKEN = 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI2MiIsImlhdCI6MTU2MDY1OTk3MywiZXhwIjoxNTYxMjY0NzczLCJuYW1lIjoiR3VzdGF2byBGZWxpcGUgU8OpcmdpbyBkYSBDb25jZWnDp8OjbyIsImVtYWlsIjoiY2F1ZS5jZXNhckBtZW5kZXN3ZWIuY29tLmJyIiwicm9sZXMiOlt7ImF1dGhvcml0eSI6IlJPTEVfQ09MTEVDVE9SIn1dfQ.fNUVCYNow5P-wnleSGhX4opR8EWzqd2G7vGlJirsV4kS9vtgoUkktZk79uPZHpmKM7TNcARZtRAr888F4a6GgA'

export const API = {
	DO_AUTH: 'http://mendesweb.com.br:8001/api/auth',
	GET_MY_PENDENCIES: 'http://www.mocky.io/v2/5d09ef333400005f29d83129', // API_CONTEXT + '/getMyPendencies', // 'http://mendesweb.com.br:8001/collector/pendency/getMyPendencies',
	GET_PENDENCY: 'http://www.mocky.io/v2/5d09d5dc3400005d29d83011', // API_CONTEXT + '/getMyPendencyById/{id}',
	GET_RISKS: 'http://www.mocky.io/v2/5d09d5cf3400001229d8300f', // API_CONTEXT + '/getRisks',
	GET_OBSERVATION: 'http://www.mocky.io/v2/5d09d5a03400001229d8300c', // API_CONTEXT + '/getObservations',
	SAVE_NOTIFICATION_TOKEN: 'http://www.mocky.io/v2/5d09d5f73400001129d83012' // API_CONTEXT + '/notificationToken',
};
 