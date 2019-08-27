export class MemoryFlags {
	static generalForm = 'general@form@';
	
	static form(id) {
		return `${this.generalForm}${id}`;
	}
}