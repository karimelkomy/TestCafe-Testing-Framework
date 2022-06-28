import GenericElement from '../../shared/core/GenericElement';

export default class ActionsDropdown extends GenericElement {
	constructor() {
		super();
		this.element = '//div[contains(@class, "display-none")]';
		this.actionsDropdown = `${this.element}//button[@data-test-id="actions-dropdown"]`;
		this.createVendorButton = `${this.element}//button[@data-test-id="create-vendor-button"]`;
	}

	async clickActionsDropdown() {
		await this.click(this.actionsDropdown);
	}

	async clickCreateVendorButton() {
		await this.clickActionsDropdown();
		await this.click(this.createVendorButton);
	}
}
