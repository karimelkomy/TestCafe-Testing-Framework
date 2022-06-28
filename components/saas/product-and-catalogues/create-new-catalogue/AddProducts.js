import GenericElement from '../../../shared/core/GenericElement';

export default class AddProducts extends GenericElement {
	constructor() {
		super();
		this.skipThisStepButton = '//penny-catalog-detail//button[@data-test-id="skip-this-step-button"]';
	}

	async clickSkipThisStepButton() {
		await this.click(this.skipThisStepButton);
	}

	async submitAddProducts() {
		// TODO: add scenario to add products in this step
		await this.clickSkipThisStepButton();
	}
}
