export class Config {
	static ENVIRONMENT = 'dev';
	static INITIAL_AUTHENTICATED_SCREEN = 'Inspection'; // Inspection | Dashboard
	static LOGIN_SCREEN = 'Login';
	static INSPECTION_INICIAL_SCREEN = 'Geral'; // Início | Geral | Inspeção | Riscos | Recomendações
	static IS_AUTH = Config.ENVIRONMENT === 'dev' ? true : false;

	getEnvironments() {

	}

	static getIsAuth() {
		return Config.IS_AUTH;
	}
}
