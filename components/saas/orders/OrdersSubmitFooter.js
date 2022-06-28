import GenericElement from '../../shared/core/GenericElement';

export default class OrdersSubmitFooter extends GenericElement {
	constructor() {
		super();
		this.submitButton = '//button[@data-test-id="submit-order-button"]';
		this.seeLessButton = '//button[@data-test-id="see-all-button"]';
	}

	async clickSubmitButton() {
		await this.click(this.submitButton);
	}

	async submit() {
		await this.clickSubmitButton();
	}
}
