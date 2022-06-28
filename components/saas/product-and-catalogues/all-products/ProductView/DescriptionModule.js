import { sprintf } from 'sprintf-js';
import GenericElement from '../../../../shared/core/GenericElement';

export default class DescriptionModule extends GenericElement {
	constructor() {
		super();
		this.descriptionLink = '//div[./span[text()="DESCRIPTION"]]';
		this.descriptionText = '//div[@data-test-id="description-box"]//div[@data-test-id="product-description-text" and text()=" %s "]';
	}

	async clickDescriptionLink() {
		await this.click(this.descriptionLink);
	}

	async validateDescription({ productDetails }) {
		const { description } = productDetails;

		await this.validateElementVisibility(sprintf(this.descriptionText, description));
	}

	async validateDescriptionModule({ productDetails }) {
		await this.validateDescription({ productDetails });
	}
}
