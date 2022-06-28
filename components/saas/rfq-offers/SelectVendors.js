import { sprintf } from 'sprintf-js';
import GenericElement from '../../shared/core/GenericElement';

export default class SelectVendors extends GenericElement {
	constructor() {
		super();
		this.addVendorButton = '//tr[.//span[@data-test-id="vendor-name-text" and text()="%s"]]//button[@data-test-id="add-button"]';
		this.doneButton = '//button[@data-test-id="done-button"]';
	}

	async clickAddVendorButton({ vendorName }) {
		await this.click(sprintf(this.addVendorButton, vendorName));
	}

	async clickDoneButton() {
		await this.click(this.doneButton);
	}

	async selectVendor({ vendorName }) {
		await this.clickAddVendorButton({ vendorName });
		await this.clickDoneButton();
	}
}
