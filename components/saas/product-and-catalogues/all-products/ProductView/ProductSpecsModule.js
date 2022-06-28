import { sprintf } from 'sprintf-js';
import GenericElement from '../../../../shared/core/GenericElement';
import { capitalizeFirstLetter } from '../../../../../utilities/helpers';

export default class ProductSpecsModule extends GenericElement {
	constructor() {
		super();
		this.specificationsLink = '//div[./span[text()="SPECIFICATIONS"]]';
		this.attributeText =
			'//div[@data-test-id="attribute-item"][.//div[@data-test-id="attribute-label" and contains(text(), "%s")]]//div[@data-test-id="attribute-text" and text()=" %s "]';
	}

	async clickSpecificationsLink() {
		await this.click(this.specificationsLink);
	}

	async validateAttribute({ productDetails }) {
		const { attribute, value, uom } = productDetails;

		await this.validateElementVisibility(sprintf(this.attributeText, capitalizeFirstLetter(attribute), `${value} ${uom}`));
	}

	async validateProductSpecsModule({ productDetails }) {
		await this.clickSpecificationsLink();
		await this.validateAttribute({ productDetails });
	}
}
