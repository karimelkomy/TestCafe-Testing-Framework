import { sprintf } from 'sprintf-js';
import GenericElement from '../../shared/core/GenericElement';

export default class RequestsList extends GenericElement {
	constructor() {
		super();
		this.requestButton = '//div[@row-index="0"]//button[contains(., "%s")]';
	}

	async selectRequest({ requestId }) {
		await this.click(sprintf(this.requestButton, requestId));
	}

	async openRequest({ productRequest }) {
		const { requestId } = productRequest;

		await this.selectRequest({ requestId });
	}
}
