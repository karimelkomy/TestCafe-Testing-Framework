import GenericElement from '../../../shared/core/GenericElement';
import { getCurrentUrl } from '../../../../utilities/helpers';

export default class BillSubmitFooter extends GenericElement {
	constructor() {
		super();
		this.submitButton = '//button[@data-test-id="submit-button"]';
	}

	async getBillUrl() {
		return getCurrentUrl();
	}

	async clickSubmitButton() {
		await this.click(this.submitButton);
	}

	async submitBill() {
		await this.clickSubmitButton();
	}
}
