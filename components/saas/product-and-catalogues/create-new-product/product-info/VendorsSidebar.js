import { sprintf } from 'sprintf-js';
import GenericElement from '../../../../shared/core/GenericElement';

export default class VendorsSidebar extends GenericElement {
	constructor() {
		super();
		this.addVendorsButton = '//p-sidebar//div[@role="row"][.//span[text()="%s"]]//button[.="ADD"]';
		this.vendorChip = '//p-sidebar//p-chips//li[contains(text(), "%s")]';
		this.confirmButton = '//penny-product-info//button[@data-test-id="confirm-button"]';
	}

	async clickAddVendorsButton({ vendorName }) {
		await this.click(sprintf(this.addVendorsButton, vendorName));
	}

	async clickConfirmButton() {
		await this.click(this.confirmButton);
	}

	async validateVendorChip({ vendorName }) {
		await this.validateElementVisibility(sprintf(this.vendorChip, vendorName));
	}

	async select({ vendorName }) {
		await this.clickAddVendorsButton({ vendorName });
		await this.validateVendorChip({ vendorName });
		await this.clickConfirmButton();
	}
}
