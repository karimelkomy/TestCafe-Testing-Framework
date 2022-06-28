import GenericElement from '../../../shared/core/GenericElement';

export default class WorkspaceLimits extends GenericElement {
	constructor() {
		super();
		this.saveAndContinueButton = '//button[@data-test-id="save-and-continue-button"]';
	}

	async clickSaveAndContinueButton() {
		await this.click(this.saveAndContinueButton);
	}

	async submit() {
		await this.clickSaveAndContinueButton();
	}
}
