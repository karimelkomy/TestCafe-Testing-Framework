import GenericElement from '../../../shared/core/GenericElement';

export default class OrderSubmission extends GenericElement {
	constructor() {
		super();
		this.acceptOrderButton = '//button[@data-test-id="accept-order-button"]';
		this.successMessage = '//p-toastitem//div[contains(text(), "Success")]';
	}

	async clickAcceptOrderButton() {
		await this.click(this.acceptOrderButton);
	}

	async validateSuccessMessage() {
		await this.validateElementVisibility(this.successMessage);
	}

	async accept() {
		await this.clickAcceptOrderButton();
		await this.validateSuccessMessage();
	}
}
