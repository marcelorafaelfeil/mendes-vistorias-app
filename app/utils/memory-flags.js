export class MemoryFlags {
	static generalForm = 'general@form@';
	static _photosTemplate = 'inspection@photosTemplate@';
	
	static form(id) {
		return `${this.generalForm}${id}`;
	}

	static photosTemplate(inspection) {
		return `${this._photosTemplate}${inspection}`;
	}
}