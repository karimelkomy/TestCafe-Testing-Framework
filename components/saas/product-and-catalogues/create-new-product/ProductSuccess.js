import { sprintf } from 'sprintf-js';
import GenericElement from '../../../shared/core/GenericElement';

export default class ProductSuccess extends GenericElement {
	constructor() {
		super();
		this.wellDoneMessage = '//h4[@data-test-id="well-done-message"]';
		this.productCreatedLink = '//penny-product-success//span[@data-test-id="product-name-text" and contains(text(), "%s")]';
	}

	async validateSuccessMessage() {
		await this.validateElementVisibility(this.wellDoneMessage);
	}

	async clickProductLink({ productName }) {
		await this.click(sprintf(this.productCreatedLink, productName));
	}

	async submitProductSuccess({ productDetails }) {
		const { productName } = productDetails;

		await this.validateSuccessMessage();
		await this.clickProductLink({ productName });
	}
}
