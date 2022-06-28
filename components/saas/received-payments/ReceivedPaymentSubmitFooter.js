import GenericElement from '../../shared/core/GenericElement';
import { getCurrentUrl } from '../../../utilities/helpers';

export default class ReceivedPaymentSubmitFooter extends GenericElement {
	constructor() {
		super();
		this.submitPaymentButton = '//button[@data-test-id="submit-payment-button" and contains(@class, "display-none")]';
	}

	async clickSubmitPaymentButton() {
		await this.click(this.submitPaymentButton);
	}

	async submit() {
		await this.clickSubmitPaymentButton();
	}
}
