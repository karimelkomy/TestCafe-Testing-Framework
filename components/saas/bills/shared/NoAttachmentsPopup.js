import GenericElement from '../../../shared/core/GenericElement';

export default class NoAttachmentsPopup extends GenericElement {
	constructor() {
		super();
		this.confirmAndSubmitButton = '//button[@data-test-id="confirm-and-submit-button"]';
	}

	async clickConfirmAndSubmitButton() {
		await this.click(this.confirmAndSubmitButton);
	}
}
