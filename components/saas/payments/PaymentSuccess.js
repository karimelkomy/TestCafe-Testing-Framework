import GenericElement from '../../shared/core/GenericElement';
import { getNumberFromText } from '../../../utilities/helpers';

export default class PaymentSuccess extends GenericElement {
	constructor() {
		super();
		this.successPaymentMessage = '//penny-payment-success//h4[@data-test-id="well-done-message"]';
		this.paymentIdText = '//penny-payment-success//h5//span[contains(text(), "#")]';
	}

	async validatePaymentSubmittedSuccessfully() {
		await this.validateElementVisibility(this.successPaymentMessage);
	}

	async getPaymentId() {
		const paymentText = await this.getText(this.paymentIdText);

		return getNumberFromText(paymentText);
	}

	async clickPaymentId() {
		await this.click(this.paymentIdText);
	}

	async submit() {
		await this.validatePaymentSubmittedSuccessfully();
		const createdPaymentId = await this.getPaymentId();
		await this.clickPaymentId();

		return createdPaymentId;
	}
}
