import { sprintf } from 'sprintf-js';
import GenericElement from '../../shared/core/GenericElement';

export default class RfqsList extends GenericElement {
	constructor() {
		super();
		this.firstRfqButton = '//div[@row-index="0"]/div[@aria-colindex="2"]//button';
		this.rfqByIdButton = '//div[@aria-colindex]//button[text()=" %s "]';
		this.createRequestButton = '//penny-upload//button[@data-test-id="create-request-button"]';
	}

	async selectFirstRfq() {
		await this.click(this.firstRfqButton);
	}

	async selectRfqById({ productRequest }) {
		const { requestId } = productRequest;

		await this.click(sprintf(this.rfqByIdButton, requestId));
	}

	async clickCreateRequestButton() {
		await this.click(this.createRequestButton);
	}
}
