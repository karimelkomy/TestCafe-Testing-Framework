import GenericElement from '../../shared/core/GenericElement';
import { getNumberFromText } from '../../../utilities/helpers';

export default class OrderSuccess extends GenericElement {
	constructor() {
		super();
		this.successOrderMessage = '//penny-order-success//h4[@data-test-id="well-done-message"]';
		this.orderIdText = '//penny-order-success//span[@data-test-id="order-id-text"]';
	}

	async validateOrderSubmittedSuccessfully() {
		await this.validateElementVisibility(this.successOrderMessage);
	}

	async getOrderId() {
		const orderText = await this.getText(this.orderIdText);

		return getNumberFromText(orderText);
	}

	async clickOrderId() {
		await this.click(this.orderIdText);
	}

	async submit() {
		await this.validateOrderSubmittedSuccessfully();
		const createdOrderId = await this.getOrderId();
		await this.clickOrderId();

		return createdOrderId;
	}
}
