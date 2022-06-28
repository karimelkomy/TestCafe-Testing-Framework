import GenericElement from '../../../shared/core/GenericElement';
import { getCurrentUrl } from '../../../../utilities/helpers';

export default class BillSubmitFooter extends GenericElement {
	constructor() {
		super();
		this.submitButton = '//button[@data-test-id="submit-button"]';
		this.acceptAndProceedToPaymentButton = '//button[@data-test-id="submit-button" and .="ACCEPT AND PROCEED TO PAYMENT"]';
	}

	async getBillUrl() {
		return getCurrentUrl();
	}

	async clickSubmitButton() {
		await this.click(this.submitButton);
	}

	async clickAcceptAndProceedToPaymentButton() {
		await this.click(this.acceptAndProceedToPaymentButton);
	}

	async submitBill() {
		await this.clickSubmitButton();
	}
}
