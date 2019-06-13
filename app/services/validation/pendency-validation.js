export class PendencyValidation {
	messages = [];
	data;

	constructor(data) {
		this.data = data;
	}

	validateExpedient(expedient) {
		const messages = [];
		if (!!expedient) {
			if (!!expedient.from && !!expedient.to) {
				const from = expedient.from.getTime();
				const to = expedient.to.getTime();

				if ( from >= to) {
					messages.push('INPUT_EXPEDIENT_FROM_IS_MAJOR');
				}
			} else if (!expedient.from) {
				messages.push('INPUT_EXPEDIENT_FROM_IS_EMPTY');
			} else {
				messages.push('INPUT_EXPEDIENT_TO_IS_EMPTY');
			}
		} else {
			messages.push('INPUT_EXPEDIENT_IS_EMPTY');
		}

		if (messages.length > 0) {
			this.messages = this.messages.merge(messages);
		}
		return (messages.length > 0);
	}



	validateGeneralData() {
		if (!!this.data) {
			alert('is valid? ', this.validateExpedient(this.data.expedient));
		} else {
			return false;
		}
	}
}
