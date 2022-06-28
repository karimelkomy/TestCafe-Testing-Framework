import GenericElement from '../../../shared/core/GenericElement';

export default class RfqDraftsSuccess extends GenericElement {
	constructor() {
		super();
		this.element = '//penny-marketplace-popup-dialog';
		this.successRfqDraftMessage = `${this.element}//h3[contains(text(), "RFQ successfully sent")]`;
		this.backToRfqsButton = `${this.element}//button[@data-test-id="send-message-button"]`;
	}

	async validateRfqDraftSubmittedSuccessfully() {
		await this.validateElementVisibility(this.successRfqDraftMessage);
	}

	async clickBackToRfqsButton() {
		await this.click(this.backToRfqsButton);
	}

	async submit() {
		await this.validateRfqDraftSubmittedSuccessfully();
		await this.clickBackToRfqsButton();
	}
}
