export class Config {
	static ENVIRONMENT = 'dev';
	static INITIAL_AUTHENTICATED_SCREEN = 'Inspection'; // Dashboard | Inspection
	static LOGIN_SCREEN = 'Login';
	static INSPECTION_INICIAL_SCREEN = 'Geral'; // Início | Geral | Inspeção | Observações | Enviar
	static DATA_LOAD_SCREEN = 'AuthLoading';
	static IS_AUTH = Config.ENVIRONMENT === 'dev' ? true : false;

	getEnvironments() {

	}

	static getIsAuth() {
		return Config.IS_AUTH;
	}
}
