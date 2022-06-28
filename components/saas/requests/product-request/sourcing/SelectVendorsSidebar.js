import { sprintf } from 'sprintf-js';
import GenericElement from '../../../../shared/core/GenericElement';

export default class SelectVendorsSidebar extends GenericElement {
	constructor() {
		super();
		this.addButton = '//div[@role="row"][.//span[text()="%s"]]//button[.="ADD"]';
		this.doneButton = '//button[@data-test-id="done-button"]';
		this.vendorChip = '//p-chips[contains(.,"%s")]';
	}

	async clickAddButton({ vendorName }) {
		await this.click(sprintf(this.addButton, vendorName));
	}

	async validateVendorChipVisibility({ vendorName }) {
		await this.validateElementVisibility(sprintf(this.vendorChip, vendorName));
	}

	async clickDoneButton() {
		await this.click(this.doneButton);
	}

	async submit({ vendorsDetails }) {
		for (let vendorDetails of vendorsDetails) {
			const { vendorName } = vendorDetails;

			await this.wait(1);
			await this.clickAddButton({ vendorName });
			await this.validateVendorChipVisibility({ vendorName });
		}

		await this.clickDoneButton();
	}
}
